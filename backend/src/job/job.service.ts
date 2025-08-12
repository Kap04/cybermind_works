import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Between } from 'typeorm';
import { Job } from './job.entity';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
  ) {}

  async findAll(query: any): Promise<{ jobs: Job[]; total: number }> {
    const { title, location, jobType, salaryMin, salaryMax, page = 1, limit = 10 } = query;
    const where: any = {};
    if (title) where.jobTitle = Like(`%${title}%`);
    if (location) where.location = Like(`%${location}%`);
    if (jobType) where.jobType = jobType;
    if (salaryMin && salaryMax) where.salaryMin = Between(salaryMin, salaryMax);
    const [jobs, total] = await this.jobRepository.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return { jobs, total };
  }

  async findOne(id: string): Promise<Job> {
    const job = await this.jobRepository.findOne({ where: { id } });
    if (!job) throw new NotFoundException('Job not found');
    return job;
  }

  async create(data: Partial<Job>): Promise<Job> {
    const job = this.jobRepository.create({ ...data, createdAt: new Date().toISOString() });
    return this.jobRepository.save(job);
  }

  async update(id: string, data: Partial<Job>): Promise<Job> {
    await this.jobRepository.update(id, data);
    return this.findOne(id);
  }
}
