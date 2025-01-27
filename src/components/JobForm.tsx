'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { JobSchema, Job } from '../types/job';
import { useJobStore } from '../store/useJobStore';

export default function JobForm() {
  const addJob = useJobStore((state) => state.addJob);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Job>({
    resolver: zodResolver(JobSchema),
  });

  const onSubmit = (data: Job) => {
    addJob({ ...data, id: Date.now().toString() });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mb-8'>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <input
          {...register('company')}
          placeholder='Company'
          className='input input-bordered w-full'
        />
        {errors.company && (
          <span className='text-red-500 col-span-full'>
            {errors.company.message}
          </span>
        )}

        <input
          {...register('position')}
          placeholder='Position'
          className='input input-bordered w-full'
        />
        {errors.position && (
          <span className='text-red-500 col-span-full'>
            {errors.position.message}
          </span>
        )}

        <input
          {...register('dateApplied')}
          type='date'
          className='input input-bordered w-full'
        />

        <select
          {...register('status')}
          className='select select-bordered w-full'
        >
          <option value='applied'>Applied</option>
          <option value='interviewing'>Interviewing</option>
          <option value='offered'>Offered</option>
          <option value='rejected'>Rejected</option>
        </select>

        <select
          {...register('roleType')}
          className='select select-bordered w-full sm:col-span-2'
        >
          <option value='sales engineer'>Sales Engineer</option>
          <option value='software developer'>Software Developer</option>
        </select>

        <textarea
          {...register('notes')}
          placeholder='Notes'
          className='textarea textarea-bordered w-full sm:col-span-2'
        />
      </div>
      <button type='submit' className='btn btn-primary mt-4 w-full sm:w-auto'>
        Add Job
      </button>
    </form>
  );
}
