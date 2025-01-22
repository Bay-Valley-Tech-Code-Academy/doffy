import Link from 'next/link';
import JobTabs from './components/job-tabs';

export default function SavedJobsPage() {

  return (
    <main className='flex justify-center h-full'>
      <div className="flex w-full sm:w-3/4 md:1/2 h-full flex-col items-center justify-center gap-3 px-4 py-16">
        <div className="container flex flex-col gap-3">
          <h2 className="self-start text-4xl sm:text-5xl font-extrabold">
            Bookmarked Jobs
          </h2>
          <JobTabs />
        </div>
      </div>
    </main>
  );
}
