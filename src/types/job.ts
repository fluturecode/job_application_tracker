export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  status: 'applied' | 'interviewing' | 'offered' | 'rejected';
  dateApplied: Date;
  notes?: string;
}

export type JobInput = Omit<Job, 'id'>;
