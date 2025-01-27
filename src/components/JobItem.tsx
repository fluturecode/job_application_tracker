'use client';

import { Job } from '../types/job';
import { format } from 'date-fns';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

interface JobItemProps {
  job: Job;
  onDelete: (id: string) => void;
  onEdit: (job: Job) => void;
}

const statusColors = {
  applied: 'bg-yellow-100 text-yellow-800',
  interviewing: 'bg-blue-100 text-blue-800',
  offered: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

export default function JobItem({ job, onDelete, onEdit }: JobItemProps) {
  return (
    <div className='bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow'>
      <div className='flex justify-between items-start'>
        <div>
          <h3 className='text-lg font-semibold text-gray-900'>{job.title}</h3>
          <p className='text-gray-600'>{job.company}</p>
        </div>
        <span
          className={clsx(
            'px-2 py-1 rounded-full text-sm font-medium',
            statusColors[job.status]
          )}
        >
          {job.status}
        </span>
      </div>

      <div className='mt-4 space-y-2'>
        <p className='text-sm text-gray-500'>Location: {job.location}</p>
        <p className='text-sm text-gray-500'>Type: {job.jobType}</p>
        <p className='text-sm text-gray-500'>
          Applied: {format(new Date(job.dateApplied), 'MMM dd, yyyy')}
        </p>
      </div>

      {job.notes && (
        <p className='mt-4 text-sm text-gray-600'>Notes: {job.notes}</p>
      )}

      <div className='mt-4 flex justify-end space-x-2'>
        <button
          onClick={() => onEdit(job)}
          className='p-2 text-gray-600 hover:text-indigo-600'
        >
          <PencilIcon className='h-5 w-5' />
        </button>
        <button
          onClick={() => onDelete(job.id)}
          className='p-2 text-gray-600 hover:text-red-600'
        >
          <TrashIcon className='h-5 w-5' />
        </button>
      </div>
    </div>
  );
}
