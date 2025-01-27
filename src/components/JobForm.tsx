'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateJobSchema, type CreateJobInput } from '@/types/job';
import { useJobStore } from '@/store/useJobStore';

export default function JobForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: {},
  } = useForm<CreateJobInput>({
    resolver: zodResolver(CreateJobSchema),
    defaultValues: {
      title: '',
      company: '',
      location: '',
      status: 'applied',
      jobType: 'software_developer',
      dateApplied: new Date(),
      notes: '',
    },
  });

  const addJob = useJobStore((state) => state.addJob);

  const onSubmit = (data: CreateJobInput) => {
    addJob(data);
    reset();
  };

  return (
    <div className='space-y-2'>
      <h1 className='text-xl text-white'>Job Application Tracker</h1>
      <h2 className='text-lg text-white mb-4'>Add New Job Application</h2>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
        <div>
          <label className='block text-white mb-1'>Job Title</label>
          <input
            {...register('title')}
            placeholder='Enter job title'
            className='w-full p-2 rounded bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-400'
          />
        </div>

        <div>
          <label className='block text-white mb-1'>Company</label>
          <input
            {...register('company')}
            placeholder='Enter company name'
            className='w-full p-2 rounded bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-400'
          />
        </div>

        <div>
          <label className='block text-white mb-1'>Location</label>
          <input
            {...register('location')}
            placeholder='Enter job location'
            className='w-full p-2 rounded bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-400'
          />
        </div>

        <div>
          <label className='block text-white mb-1'>Job Type</label>
          <select
            {...register('jobType')}
            className='w-full p-2 rounded bg-zinc-900 border border-zinc-700 text-white'
          >
            <option value='software_developer'>Software Developer</option>
            <option value='sales_engineer'>Sales Engineer</option>
            <option value='other'>Other</option>
          </select>
        </div>

        <div>
          <label className='block text-white mb-1'>Status</label>
          <select
            {...register('status')}
            className='w-full p-2 rounded bg-zinc-900 border border-zinc-700 text-white'
          >
            <option value='applied'>Applied</option>
            <option value='interviewing'>Interviewing</option>
            <option value='offered'>Offered</option>
            <option value='rejected'>Rejected</option>
          </select>
        </div>

        <div>
          <label className='block text-white mb-1'>Date Applied</label>
          <input
            type='date'
            {...register('dateApplied')}
            placeholder='mm/dd/yyyy'
            className='w-full p-2 rounded bg-zinc-900 border border-zinc-700 text-white'
          />
        </div>

        <div>
          <label className='block text-white mb-1'>Notes</label>
          <textarea
            {...register('notes')}
            rows={4}
            placeholder='Add any additional notes'
            className='w-full p-2 rounded bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-400 resize-none'
          />
        </div>

        <button
          type='submit'
          className='w-full bg-zinc-800 text-white py-2 px-4 rounded hover:bg-zinc-700 transition-colors'
        >
          Add Job
        </button>
      </form>
    </div>
  );
}
