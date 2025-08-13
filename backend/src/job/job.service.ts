
import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Job } from './job.entity';


@Injectable()
export class JobService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(query: any): Promise<{ jobs: Job[]; total: number }> {
    const { title, location, jobType, salaryMin, salaryMax, page = 1, limit = 10 } = query;
    let whereClauses = ['1=1'];
    const values: any[] = [];
    if (title) {
      whereClauses.push(`jobTitle ILIKE $${values.length + 1}`);
      values.push(`%${title}%`);
    }
    if (location) {
      whereClauses.push(`location ILIKE $${values.length + 1}`);
      values.push(`%${location}%`);
    }
    if (jobType) {
      whereClauses.push(`jobType = $${values.length + 1}`);
      values.push(jobType);
    }
    if (salaryMin && salaryMax) {
      whereClauses.push(`salaryMin BETWEEN $${values.length + 1} AND $${values.length + 2}`);
      values.push(salaryMin, salaryMax);
    }
    const offset = (page - 1) * limit;
    const jobs = await this.databaseService.query(
      [`SELECT * FROM job WHERE ${whereClauses.join(' AND ')} ORDER BY createdAt DESC LIMIT $${values.length + 1} OFFSET $${values.length + 2}`] as any,
      ...values,
      limit,
      offset
    );
    const totalResult = await this.databaseService.query([`SELECT COUNT(*) FROM job WHERE ${whereClauses.join(' AND ')}`] as any, ...values);
    const total = parseInt(totalResult[0]?.count || '0', 10);
    return { jobs: jobs as Job[], total };
  }

  async findOne(id: string): Promise<Job> {
    const result = await this.databaseService.query([`SELECT * FROM job WHERE id = $1`] as any, id);
    const job = result[0];
    if (!job) throw new NotFoundException('Job not found');
    return job as Job;
  }

  async create(data: Partial<Job>): Promise<Job> {
    const createdAt = new Date().toISOString();
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
  }

  async update(id: string, data: Partial<Job>): Promise<Job> {
    const keys = Object.keys(data);
    const values = Object.values(data);
    if (keys.length === 0) return this.findOne(id);
    const setClause = keys.map((key, idx) => `${key} = $${idx + 2}`).join(', ');
    await this.databaseService.query([
      `UPDATE job SET ${setClause} WHERE id = $1`
    ] as any,
      id,
      ...values
    );
    return this.findOne(id);
  }
}
