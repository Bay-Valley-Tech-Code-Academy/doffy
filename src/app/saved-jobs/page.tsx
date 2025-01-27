import Link from 'next/link';
import JobTabs from './components/job-tabs';

export default function SavedJobsPage() {

  // Currently, I am unable to find a way to specify how to take the remainder of the screen up height wise without changing the main layout file.
  return (
    <main className='flex justify-center h-[calc(100dvh-60px)]'>
      <div className="container w-full sm:w-3/4 md:w-3/5 h-full items-center justify-center gap-3 px-2 py-10">
          <h2 className="self-start text-4xl sm:text-5xl font-extrabold">
            Bookmarked Jobs
          </h2>
          <JobTabs />
      </div>
    </main>
  );
}
