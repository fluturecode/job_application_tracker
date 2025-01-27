import { create } from 'zustand';
import { Job, CreateJobInput } from '@/types/job';

interface JobStore {
  jobs: Job[];
  addJob: (job: CreateJobInput) => void;
  updateJob: (job: Job) => void;
  deleteJob: (id: string) => void;
}

type State = {
  jobs: Job[];
};

export const useJobStore = create<JobStore>((set) => ({
  jobs: [],
  addJob: (jobInput: CreateJobInput) =>
    set((state: State) => ({
      jobs: [...state.jobs, { ...jobInput, id: crypto.randomUUID() }],
    })),
  updateJob: (updatedJob: Job) =>
    set((state: State) => ({
      jobs: state.jobs.map((job) =>
        job.id === updatedJob.id ? updatedJob : job
      ),
    })),
  deleteJob: (id: string) =>
    set((state: State) => ({
      jobs: state.jobs.filter((job) => job.id !== id),
    })),
}));
