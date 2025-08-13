
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JobModule } from 'src/job/job.module';
import { DatabaseService } from './database.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JobModule,
  ],
  providers: [DatabaseService],
})
export class AppModule {}
