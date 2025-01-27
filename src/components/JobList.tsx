'use client';

import { useState } from 'react';
import { useJobStore } from '@/store/useJobStore';
import JobItem from '@/components/JobItem';
import { Job } from '@/types/job';

export default function JobList() {
  const [filter, setFilter] = useState('');
  const { jobs, deleteJob, updateJob } = useJobStore();

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(filter.toLowerCase()) ||
      job.company.toLowerCase().includes(filter.toLowerCase()) ||
      job.jobType.toLowerCase().includes(filter.toLowerCase())
  );

  const handleEdit = (job: Job) => {
    updateJob(job);
  };

  return (
    <div className='space-y-6 p-4'>
      <div className='mb-6'>
        <input
          type='text'
          placeholder='Search jobs...'
          className='w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors'
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
        />
      </div>

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {filteredJobs.map((job) => (
          <JobItem
            key={job.id}
            job={job}
            onDelete={deleteJob}
            onEdit={handleEdit}
          />
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className='text-center py-10'>
          <p className='text-gray-500 text-lg'>
            No jobs found. Start by adding a new job application!
          </p>
        </div>
      )}
    </div>
  );
}
