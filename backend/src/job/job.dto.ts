import { IsString, IsOptional, IsEnum, IsInt, Min, MaxLength, IsDateString } from 'class-validator';

export class CreateJobDto {
  @IsString()
  jobTitle!: string;

  @IsString()
  @IsOptional()
  companyName?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsEnum(['Full-time', 'Part-time', 'Contract', 'Internship'])
  jobType!: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';

  @IsInt()
  @IsOptional()
  @Min(0)
  salaryMin?: number;

  @IsInt()
  @IsOptional()
  @Min(0)
  salaryMax?: number;

  @IsString()
  @MaxLength(1000)
  jobDescription!: string;

  @IsString()
  @IsOptional()
  requirements?: string;

  @IsString()
  @IsOptional()
  responsibilities?: string;

  @IsDateString()
  @IsOptional()
  applicationDeadline?: string;

  @IsString()
  @IsOptional()
  logoUrl?: string;
}

export class UpdateJobDto extends CreateJobDto {}
