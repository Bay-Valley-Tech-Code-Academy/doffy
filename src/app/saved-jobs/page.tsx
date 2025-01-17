"use client"
import Link from 'next/link';
import SavedJob from './SavedJob'
import ButtonWithBadge from './ButtonWithBadge';
import { useState } from 'react';
import { Job, savedJobsArr, appliedJobsArr, interviewJobsArr, archivedJobsArr } from './placeHolderData';

export default function SavedJobsPage() {
  const [ jobListings, setJobListings ] = useState<Array<Job>>(savedJobsArr);

  function assignCurrentTab(tab: string): void {
      let jobsList: Array<Job>;
      if (tab == 'Saved') {
        jobsList = savedJobsArr;
      } else if (tab == 'Applied') {
        jobsList = appliedJobsArr
      } else if (tab == "Interviews") {
        jobsList = interviewJobsArr
      } else {
        jobsList = archivedJobsArr
      }
      setJobListings(jobsList)
  }

  return (
    <main className='flex h-full justify-center'>
      <div className="container flex flex-col justify-center items-center gap-3 px-4 py-16">
        <h2 className='text-4xl font-extrabold self-start'>My Jobs</h2>

        <div className='container flex gap-2 border-b-black border border-transparent p-1'>
          <ButtonWithBadge badgeText={savedJobsArr.length} onClick={() => assignCurrentTab('Saved')}>Saved</ButtonWithBadge>
          <ButtonWithBadge badgeText={appliedJobsArr.length} onClick={() => assignCurrentTab('Applied')}>Applied</ButtonWithBadge>
          <ButtonWithBadge badgeText={interviewJobsArr.length} onClick={() => assignCurrentTab('Interviews')}>Interviews</ButtonWithBadge>
          <ButtonWithBadge badgeText={archivedJobsArr.length} onClick={() => assignCurrentTab('Archived')}>Archived</ButtonWithBadge>
        </div>

        <div className='container h-auto overflow-auto'>
            {jobListings.map(job => <SavedJob key={job.jobTitle} jobTitle={job.jobTitle} company={job.company} location={job.location} savedDate={job.savedDate} companyImage={job.companyImage}/>)}
        </div>
      </div>
    </main>
  );
}
