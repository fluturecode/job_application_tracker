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
    <div className='space-y-4'>
      <h1 className='text-xl text-white'>Job Application Tracker</h1>
      <h2 className='text-lg text-white mb-4'>Add New Job Application</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <table className='w-full'>
          <tbody>
            <tr>
              <td className='text-white pr-4 py-2 w-24'>Job Title</td>
              <td className='py-2'>
                <input
                  {...register('title')}
                  placeholder='Enter job title'
                  className='w-full p-2 rounded bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-400'
                />
              </td>
            </tr>
            <tr>
              <td className='text-white pr-4 py-2'>Company</td>
              <td className='py-2'>
                <input
                  {...register('company')}
                  placeholder='Enter company name'
                  className='w-full p-2 rounded bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-400'
                />
              </td>
            </tr>
            <tr>
              <td className='text-white pr-4 py-2'>Location</td>
              <td className='py-2'>
                <input
                  {...register('location')}
                  placeholder='Enter job location'
                  className='w-full p-2 rounded bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-400'
                />
              </td>
            </tr>
            <tr>
              <td className='text-white pr-4 py-2'>Job Type</td>
              <td className='py-2'>
                <select
                  {...register('jobType')}
                  className='w-full p-2 rounded bg-zinc-900 border border-zinc-700 text-white'
                >
                  <option value='software_developer'>Software Developer</option>
                  <option value='sales_engineer'>Sales Engineer</option>
                  <option value='other'>Other</option>
                </select>
              </td>
            </tr>
            <tr>
              <td className='text-white pr-4 py-2'>Status</td>
              <td className='py-2'>
                <select
                  {...register('status')}
                  className='w-full p-2 rounded bg-zinc-900 border border-zinc-700 text-white'
                >
                  <option value='applied'>Applied</option>
                  <option value='interviewing'>Interviewing</option>
                  <option value='offered'>Offered</option>
                  <option value='rejected'>Rejected</option>
                </select>
              </td>
            </tr>
            <tr>
              <td className='text-white pr-4 py-2'>Date Applied</td>
              <td className='py-2'>
                <input
                  type='date'
                  {...register('dateApplied')}
                  className='w-full p-2 rounded bg-zinc-900 border border-zinc-700 text-white'
                />
              </td>
            </tr>
            <tr>
              <td className='text-white pr-4 py-2'>Notes</td>
              <td className='py-2'>
                <textarea
                  {...register('notes')}
                  rows={4}
                  placeholder='Add any additional notes'
                  className='w-full p-2 rounded bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-400 resize-none'
                />
              </td>
            </tr>
          </tbody>
        </table>

        <button
          type='submit'
          className='w-full bg-zinc-800 text-white py-2 px-4 rounded hover:bg-zinc-700 transition-colors mt-4'
        >
          Add Job
        </button>
      </form>
    </div>
  );
}
