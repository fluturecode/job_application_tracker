import JobForm from '@/components/JobForm';
import JobList from '@/components/JobList';

export default function Home() {
  return (
    <main className='min-h-screen bg-zinc-900 text-white'>
      <div className='max-w-3xl mx-auto px-4 py-8'>
        <div className='bg-zinc-800/50 rounded-lg shadow-xl p-6'>
          <JobForm />
          <div className='mt-8'>
            <JobList />
          </div>
        </div>
      </div>
    </main>
  );
}
