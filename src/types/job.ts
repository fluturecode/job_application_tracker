import { z } from 'zod';

export const JobStatusEnum = z.enum([
  'applied',
  'interviewing',
  'offered',
  'rejected',
]);

export const JobTypeEnum = z.enum([
  'software_developer',
  'sales_engineer',
  'other',
]);

export const JobSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Job title is required'),
  company: z.string().min(1, 'Company name is required'),
  location: z.string(),
  status: JobStatusEnum,
  jobType: z.union([
    JobTypeEnum,
    z.string().min(1, "Custom job type is required when selecting 'other'"),
  ]),
  dateApplied: z.date(),
  notes: z.string().optional(),
  salary: z.number().optional(),
  url: z.string().url().optional(),
});

export const CreateJobSchema = JobSchema.omit({ id: true });

// TypeScript types inferred from Zod schemas
export type Job = z.infer<typeof JobSchema>;
export type CreateJobInput = z.infer<typeof CreateJobSchema>;
export type JobStatus = z.infer<typeof JobStatusEnum>;
export type JobType = z.infer<typeof JobTypeEnum> | string;
