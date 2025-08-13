import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Job } from './job.entity';


@Injectable()
export class JobService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(query: any): Promise<{ jobs: Job[]; total: number }> {
    console.log('Received query params:', query);
    const { title, location, jobType, salaryMin, salaryMax, page = 1, limit = 10 } = query;
    // Build SQL using positional parameters for Neon sql.query
    let sql = 'SELECT * FROM job WHERE 1=1';
    const params: any[] = [];
    if (title && title.trim() !== '') {
      sql += ` AND jobtitle ILIKE $${params.length + 1}`;
      params.push(`%${title}%`);
    }
    if (location && location.trim() !== '') {
      sql += ` AND location ILIKE $${params.length + 1}`;
      params.push(`%${location}%`);
    }
    if (jobType && jobType.trim() !== '') {
      sql += ` AND jobtype = $${params.length + 1}`;
      params.push(jobType);
    }
    console.log('Salary filter values:', { salaryMin, salaryMax });
    // Only apply salary filter if the values are not the default range
    if (typeof salaryMin === 'number' && typeof salaryMax === 'number' && (salaryMin > 0 || salaryMax < 200000)) {
      console.log('Applying salary filter:', { salaryMin, salaryMax });
      sql += ` AND salarymin >= $${params.length + 1} AND salarymax <= $${params.length + 2}`;
      params.push(salaryMin, salaryMax);
    } else {
      console.log('Skipping salary filter:', { salaryMin, salaryMax });
    }
    sql += ` ORDER BY createdat DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, (page - 1) * limit);
    let jobs: Job[] = [];
    let total = 0;
    try {
      const countResult = await this.databaseService.query('SELECT COUNT(*) FROM job');
      total = parseInt(Array.isArray(countResult) ? countResult[0].count : countResult.rows[0].count);
      console.log('Total jobs in database:', total);
      
      console.log('Executing SQL query:', sql);
      console.log('Query parameters:', params);
      const jobsResult = await this.databaseService.query(sql, params);
      console.log('Database response:', jobsResult);
      const rows = Array.isArray(jobsResult) ? jobsResult : jobsResult.rows;
      jobs = rows ? rows.map((row: any) => ({
        id: row.id,
        jobTitle: row.jobtitle,
        companyName: row.companyname,
        location: row.location,
        jobType: row.jobtype,
        salaryMin: row.salarymin,
        salaryMax: row.salarymax,
        jobDescription: row.jobdescription,
        requirements: row.requirements,
        responsibilities: row.responsibilities,
        applicationDeadline: row.applicationdeadline,
        logoUrl: row.logourl,
        createdAt: row.createdat
      })) : [];
      
      return { jobs, total };
    } catch (error) {
      console.error('JobService.findAll error:', error);
      throw error;
    }
  }

  async findOne(id: string): Promise<Job> {
    try {
      const result = await this.databaseService.query('SELECT * FROM job WHERE id = $1', [id]);
      const job = result.rows[0];
      if (!job) throw new NotFoundException('Job not found');
      if (!job) return job as Job;
      // Map DB fields to camelCase
      return {
        id: job.id,
        jobTitle: job.jobtitle,
        companyName: job.companyname,
        location: job.location,
        jobType: job.jobtype,
        salaryMin: job.salarymin,
        salaryMax: job.salarymax,
        jobDescription: job.jobdescription,
        requirements: job.requirements,
        responsibilities: job.responsibilities,
        applicationDeadline: job.applicationdeadline,
        logoUrl: job.logourl,
        createdAt: job.createdat
      } as Job;
    } catch (error) {
      console.error('JobService.findOne error:', error);
      throw error;
    }
  }

  async create(data: Partial<Job>): Promise<Job> {
    const createdAt = new Date().toISOString();
    try {
      // First check the table structure
      await this.checkTableStructure();
      
      console.log('Creating job with data:', data);
      const query = `
        INSERT INTO job (
          jobtitle, 
          companyname, 
          location, 
          jobtype, 
          salarymin, 
          salarymax, 
          jobdescription, 
          requirements, 
          responsibilities, 
          applicationdeadline, 
          logourl, 
          createdat
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) 
        RETURNING *`;
      
      const params = [
        data.jobTitle,
        data.companyName,
        data.location,
        data.jobType,
        data.salaryMin,
        data.salaryMax,
        data.jobDescription,
        data.requirements ?? '',
        data.responsibilities ?? '',
        data.applicationDeadline ?? '',
        data.logoUrl ?? '',
        createdAt
      ];

      console.log('Executing SQL:', query);
      console.log('Parameters:', params);
      
      const result = await this.databaseService.query(query, params);
      if (!result || !result.rows || !result.rows[0]) {
        throw new Error('Failed to create job: No result returned from database');
      }
      return result.rows[0] as Job;
    } catch (error) {
      console.error('JobService.create error:', error);
      throw error;
    }
  }

  async checkTableStructure(): Promise<void> {
    try {
      const result = await this.databaseService.query(`
        SELECT column_name, data_type, character_maximum_length
        FROM information_schema.columns
        WHERE table_name = 'job'
        ORDER BY ordinal_position;
      `);
      console.log('Job table structure:', JSON.stringify(result.rows, null, 2));
    } catch (error) {
      console.error('Failed to check table structure:', error);
    }
  }

  async update(id: string, data: Partial<Job>): Promise<Job> {
    const keys = Object.keys(data);
    const values = Object.values(data);
    if (keys.length === 0) return this.findOne(id);
    const setClause = keys.map((key, idx) => `${key} = $${idx + 2}`).join(', ');
    try {
      await this.databaseService.query(
        `UPDATE job SET ${setClause} WHERE id = $1`,
        [id, ...values]
      );
      return this.findOne(id);
    } catch (error) {
      console.error('JobService.update error:', error);
      throw error;
    }
  }
}
