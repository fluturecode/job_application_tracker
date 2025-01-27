'use client';

import JobForm from '@/components/JobForm';
import JobList from '@/components/JobList';

export default function Home() {
  return (
    <main className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-8'>Job Application Tracker</h1>
      <div className='space-y-8'>
        <JobForm />
        <JobList />
      </div>
    </main>
  );
}
