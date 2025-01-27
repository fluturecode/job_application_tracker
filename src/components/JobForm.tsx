'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CreateJobSchema,
  type CreateJobInput,
  JobStatusEnum,
  JobTypeEnum,
} from '@/types/job';
import { useJobStore } from '@/store/useJobStore';

export default function JobForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
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

  const formClasses = {
    label: 'block text-white text-base mb-1',
    input:
      'w-full p-2 rounded bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-blue-500',
    error: 'mt-1 text-sm text-red-400',
  };

  return (
    <div className='space-y-4'>
      <h1 className='text-xl text-white'>Job Application Tracker</h1>
      <h2 className='text-lg text-white mb-4'>Add New Job Application</h2>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div>
          <label className={formClasses.label}>Job Title</label>
          <input
            {...register('title')}
            placeholder='Enter job title'
            className={formClasses.input}
          />
          {errors.title && (
            <p className={formClasses.error}>{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className={formClasses.label}>Company</label>
          <input
            {...register('company')}
            placeholder='Enter company name'
            className={formClasses.input}
          />
          {errors.company && (
            <p className={formClasses.error}>{errors.company.message}</p>
          )}
        </div>

        <div>
          <label className={formClasses.label}>Location</label>
          <input
            {...register('location')}
            placeholder='Enter job location'
            className={formClasses.input}
          />
          {errors.location && (
            <p className={formClasses.error}>{errors.location.message}</p>
          )}
        </div>

        <div>
          <label className={formClasses.label}>Job Type</label>
          <select
            {...register('jobType')}
            className={formClasses.input}
            style={{ backgroundColor: '#18181b' }}
          >
            {Object.values(JobTypeEnum.enum).map((type) => (
              <option key={type} value={type} className='bg-zinc-900'>
                {type
                  .split('_')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={formClasses.label}>Status</label>
          <select
            {...register('status')}
            className={formClasses.input}
            style={{ backgroundColor: '#18181b' }}
          >
            {Object.values(JobStatusEnum.enum).map((status) => (
              <option key={status} value={status} className='bg-zinc-900'>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={formClasses.label}>Date Applied</label>
          <input
            type='date'
            {...register('dateApplied')}
            className={formClasses.input}
            style={{ backgroundColor: '#18181b' }}
          />
          {errors.dateApplied && (
            <p className={formClasses.error}>{errors.dateApplied.message}</p>
          )}
        </div>

        <div>
          <label className={formClasses.label}>Notes</label>
          <textarea
            {...register('notes')}
            rows={4}
            placeholder='Add any additional notes'
            className={`${formClasses.input} resize-none`}
            style={{ backgroundColor: '#18181b' }}
          />
          {errors.notes && (
            <p className={formClasses.error}>{errors.notes.message}</p>
          )}
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
