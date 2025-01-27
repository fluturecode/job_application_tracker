'use client';

import { useState } from 'react';
import { useJobStore } from '../store/useJobStore';
import JobItem from './JobItem';
import { Job } from '../types/job';

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
    // Implement edit functionality
    updateJob(job.id, job);
  };

  return (
    <div className='space-y-4'>
      <div className='mb-4'>
        <input
          type='text'
          placeholder='Search jobs...'
          className='w-full p-2 border rounded-md'
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
        />
      </div>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
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
        <p className='text-center text-gray-500'>
          No jobs found. Start by adding a new job application!
        </p>
      )}
    </div>
  );
}
