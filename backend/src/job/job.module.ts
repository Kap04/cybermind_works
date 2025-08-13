

import { Module } from '@nestjs/common';
import { JobService } from 'src/job/job.service';
import { JobController } from 'src/job/job.controller';
import { DatabaseService } from '../database/database.service';

@Module({
  providers: [JobService, DatabaseService],
  controllers: [JobController],
})
export class JobModule {}
