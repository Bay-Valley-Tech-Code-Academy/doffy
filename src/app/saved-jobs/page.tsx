import Link from 'next/link';
import { Button } from '../../components/ui/button'
import SavedJob from './SavedJob'

export default function SavedJobsPage() {
  return (
    <main>
      <div className="w-screen flex flex-col justify-center items-center gap-12 px-4 py-16">
        <h2>My Jobs</h2>
        <div>
          <Button>Saved</Button>
          <Button>Applied</Button>
          <Button>Interviews</Button>
          <Button>Archived</Button>
        </div>

        <div className='container'>
            <SavedJob />
        </div>
      </div>
    </main>
  );
}
