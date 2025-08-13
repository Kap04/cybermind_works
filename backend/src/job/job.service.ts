
import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Job } from './job.entity';


@Injectable()
export class JobService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(query: any): Promise<{ jobs: Job[]; total: number }> {
    const { title, location, jobType, salaryMin, salaryMax, page = 1, limit = 10 } = query;
    // Build SQL using tagged template literals for Neon
    let sql = 'SELECT * FROM job WHERE 1=1';
    const params: any[] = [];
    if (title) {
      sql += ` AND jobTitle ILIKE $${params.length + 1}`;
      params.push(`%${title}%`);
    }
    if (location) {
      sql += ` AND location ILIKE $${params.length + 1}`;
      params.push(`%${location}%`);
    }
    if (jobType) {
      sql += ` AND jobType = $${params.length + 1}`;
      params.push(jobType);
    }
    if (salaryMin && salaryMax) {
      sql += ` AND salaryMin BETWEEN $${params.length + 1} AND $${params.length + 2}`;
      params.push(salaryMin, salaryMax);
    }
    sql += ` ORDER BY createdAt DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, (page - 1) * limit);
    let jobs = [];
    let total = 0;
    try {
      jobs = await this.databaseService.query([sql] as any, ...params);
      const totalResult = await this.databaseService.query([
        'SELECT COUNT(*) FROM job WHERE 1=1' +
        (title ? ` AND jobTitle ILIKE $1` : '') +
        (location ? ` AND location ILIKE $${title ? 2 : 1}` : '') +
        (jobType ? ` AND jobType = $${title && location ? 3 : title || location ? 2 : 1}` : '') +
        (salaryMin && salaryMax ? ` AND salaryMin BETWEEN $${title && location && jobType ? 4 : title && location || title && jobType || location && jobType ? 3 : title || location || jobType ? 2 : 1} AND $${title && location && jobType ? 5 : title && location || title && jobType || location && jobType ? 4 : title || location || jobType ? 3 : 2}` : '')
      ] as any, ...[title && `%${title}%`, location && `%${location}%`, jobType, salaryMin, salaryMax].filter(Boolean));
      total = parseInt(totalResult[0]?.count || '0', 10);
    } catch (error) {
      console.error('JobService.findAll error:', error);
      throw error;
    }
    return { jobs: jobs as Job[], total };
  }

  async findOne(id: string): Promise<Job> {
    try {
      const result = await this.databaseService.query([`SELECT * FROM job WHERE id = $1`] as any, id);
      const job = result[0];
      if (!job) throw new NotFoundException('Job not found');
      return job as Job;
    } catch (error) {
      console.error('JobService.findOne error:', error);
      throw error;
    }
  }

  async create(data: Partial<Job>): Promise<Job> {
    const createdAt = new Date().toISOString();
    try {
      const result = await this.databaseService.query([
        `INSERT INTO job (jobTitle, companyName, location, jobType, salaryMin, salaryMax, jobDescription, requirements, responsibilities, applicationDeadline, logoUrl, createdAt)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`
      ] as any,
        data.jobTitle,
        data.companyName,
        data.location,
        data.jobType,
        data.salaryMin,
        data.salaryMax,
        data.jobDescription,
        data.requirements,
        data.responsibilities,
        data.applicationDeadline,
        data.logoUrl,
        createdAt
      );
      return result[0] as Job;
    } catch (error) {
      console.error('JobService.create error:', error);
      throw error;
    }
  }

  async update(id: string, data: Partial<Job>): Promise<Job> {
    const keys = Object.keys(data);
    const values = Object.values(data);
    if (keys.length === 0) return this.findOne(id);
    const setClause = keys.map((key, idx) => `${key} = $${idx + 2}`).join(', ');
    try {
      await this.databaseService.query([
        `UPDATE job SET ${setClause} WHERE id = $1`
      ] as any,
        id,
        ...values
      );
      return this.findOne(id);
    } catch (error) {
      console.error('JobService.update error:', error);
      throw error;
    }
  }
}
