'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CreateJobSchema,
  type CreateJobInput,
  JobStatusEnum,
  JobTypeEnum,
} from '../types/job';
import { useJobStore } from '../store/useJobStore';

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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='space-y-4 bg-white p-6 rounded-lg shadow'
    >
      <div>
        <label className='block text-sm font-medium text-gray-700'>
          Job Title
        </label>
        <input
          {...register('title')}
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
        />
        {errors.title && (
          <p className='text-red-500 text-sm mt-1'>{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700'>
          Company
        </label>
        <input
          {...register('company')}
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
        />
        {errors.company && (
          <p className='text-red-500 text-sm mt-1'>{errors.company.message}</p>
        )}
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700'>
          Job Type
        </label>
        <select
          {...register('jobType')}
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
        >
          <option value='software_developer'>Software Developer</option>
          <option value='sales_engineer'>Sales Engineer</option>
          <option value='other'>Other</option>
        </select>
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700'>
          Status
        </label>
        <select
          {...register('status')}
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
        >
          {Object.values(JobStatusEnum.enum).map((status) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <button
        type='submit'
        className='w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors'
      >
        Add Job
      </button>
    </form>
  );
}
