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
    <div className='max-w-2xl mx-auto p-6'>
      <h1 className='text-3xl font-bold text-white mb-2'>
        Job Application Tracker
      </h1>
      <h2 className='text-xl font-medium text-white mb-6'>
        Add New Job Application
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <table className='w-full border-separate border-spacing-y-3'>
          <tbody>
            <tr>
              <td className='text-white font-medium text-lg w-32 align-top'>
                Job Title
              </td>
              <td>
                <input
                  {...register('title')}
                  placeholder='Enter job title'
                  className='w-full p-3 rounded bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-400'
                />
              </td>
            </tr>
            <tr>
              <td className='text-white font-medium text-lg w-32 align-top'>
                Company
              </td>
              <td>
                <input
                  {...register('company')}
                  placeholder='Enter company name'
                  className='w-full p-3 rounded bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-400'
                />
              </td>
            </tr>
            <tr>
              <td className='text-white font-medium text-lg w-32 align-top'>
                Location
              </td>
              <td>
                <input
                  {...register('location')}
                  placeholder='Enter job location'
                  className='w-full p-3 rounded bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-400'
                />
              </td>
            </tr>
            <tr>
              <td className='text-white font-medium text-lg w-32 align-top'>
                Job Type
              </td>
              <td>
                <select
                  {...register('jobType')}
                  className='w-full p-3 rounded bg-zinc-900 border border-zinc-700 text-white'
                >
                  <option value='software_developer'>Software Developer</option>
                  <option value='sales_engineer'>Sales Engineer</option>
                  <option value='other'>Other</option>
                </select>
              </td>
            </tr>
            <tr>
              <td className='text-white font-medium text-lg w-32 align-top'>
                Status
              </td>
              <td>
                <select
                  {...register('status')}
                  className='w-full p-3 rounded bg-zinc-900 border border-zinc-700 text-white'
                >
                  <option value='applied'>Applied</option>
                  <option value='interviewing'>Interviewing</option>
                  <option value='offered'>Offered</option>
                  <option value='rejected'>Rejected</option>
                </select>
              </td>
            </tr>
            <tr>
              <td className='text-white font-medium text-lg w-32 align-top'>
                Date Applied
              </td>
              <td>
                <input
                  type='date'
                  {...register('dateApplied')}
                  className='w-full p-3 rounded bg-zinc-900 border border-zinc-700 text-white'
                />
              </td>
            </tr>
            <tr>
              <td className='text-white font-medium text-lg w-32 align-top'>
                Notes
              </td>
              <td>
                <textarea
                  {...register('notes')}
                  rows={4}
                  placeholder='Add any additional notes'
                  className='w-full p-3 rounded bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-400 resize-none'
                />
              </td>
            </tr>
          </tbody>
        </table>

        <button
          type='submit'
          className='w-full bg-zinc-800 text-white py-3 px-4 rounded font-medium text-lg hover:bg-zinc-700 transition-colors mt-6'
        >
          Add Job
        </button>
      </form>
    </div>
  );
}
