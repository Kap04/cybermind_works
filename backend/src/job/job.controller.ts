import { Controller, Get, Post, Put, Param, Body, Query } from '@nestjs/common';
import { JobService } from './job.service';
import { Job } from './job.entity';
import { CreateJobDto, UpdateJobDto } from './job.dto';

@Controller('api/jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get()
  async findAll(@Query() query: any) {
    return this.jobService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.jobService.findOne(id);
  }


  @Post()
  async create(@Body() data: CreateJobDto) {
    return this.jobService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateJobDto) {
    return this.jobService.update(id, data);
  }
}
