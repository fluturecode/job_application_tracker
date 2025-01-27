import { z } from 'zod';

export const JobSchema = z.object({
  id: z.string().optional(),
  company: z.string().min(1, 'Company is required'),
  position: z.string().min(1, 'Position is required'),
  dateApplied: z.string(),
  status: z.enum(['applied', 'interviewing', 'offered', 'rejected']),
  notes: z.string().optional(),
  roleType: z.enum(['sales engineer', 'software developer']),
});

export type Job = z.infer<typeof JobSchema>;
