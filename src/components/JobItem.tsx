import React from 'react';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
}

interface JobItemProps {
  job: Job;
}

const JobItem: React.FC<JobItemProps> = ({ job }) => {
  return (
    <div className='job-item'>
      <h3>{job.title}</h3>
      <p>{job.company}</p>
      <p>{job.location}</p>
    </div>
  );
};

export default JobItem;
