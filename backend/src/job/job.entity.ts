import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  jobTitle!: string;

  @Column()
  companyName!: string;

  @Column()
  location!: string;

  @Column()
  jobType!: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';

  @Column('int', { nullable: true })
  salaryMin?: number;

  @Column('int', { nullable: true })
  salaryMax?: number;

  @Column('text')
  jobDescription!: string;

  @Column('text', { nullable: true })
  requirements?: string;

  @Column('text', { nullable: true })
  responsibilities?: string;

  @Column({ nullable: true })
  applicationDeadline?: string;

  @Column({ nullable: true })
  logoUrl?: string;

  @Column()
  createdAt!: string;
}
