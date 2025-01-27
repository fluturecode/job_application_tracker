import JobForm from '@/components/JobForm';
import JobList from '@/components/JobList';

export default function Home() {
  return (
    <main className='min-h-screen bg-zinc-900 text-white p-8'>
      <div className='max-w-4xl mx-auto space-y-8'>
        <div className='space-y-12'>
          <JobForm />
          <JobList />
        </div>
      </div>
    </main>
  );
}
