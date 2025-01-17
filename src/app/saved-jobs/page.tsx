"use client"
import Link from 'next/link';
import { ScrollArea } from "../../components/ui/scroll-area"
import SavedJob from './SavedJob'
import ButtonWithBadge from './ButtonWithBadge';
import { useState } from 'react';

import type { Job } from './placeHolderData'
import { savedJobsArr, appliedJobsArr, interviewJobsArr, archivedJobsArr } from './placeHolderData';

export default function SavedJobsPage() {
  const [ currentTab, setCurrentTab ] = useState<string>('Saved')
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
      setCurrentTab(tab)
  }

  return (
    <main>
      <div className='flex flex-col h-full justify-center items-center gap-3 px-4 py-16'>
        <div className="container flex flex-col gap-3">
          <h2 className='text-4xl font-extrabold self-start'>My Jobs</h2>
          <div className='flex gap-3 border-b-inherit border-b-4 border border-transparent p-1'>
            <ButtonWithBadge isTextBold={currentTab == "Saved"} 
              badgeText={savedJobsArr.length} onClick={() => assignCurrentTab('Saved')}>
                Saved
            </ButtonWithBadge>
            <ButtonWithBadge isTextBold={currentTab == "Applied"}
              badgeText={appliedJobsArr.length} onClick={() => assignCurrentTab('Applied')}>
                Applied
            </ButtonWithBadge>
            <ButtonWithBadge isTextBold={currentTab == "Interviews"}
              badgeText={interviewJobsArr.length} onClick={() => assignCurrentTab('Interviews')}>
                Interviews
            </ButtonWithBadge>
            <ButtonWithBadge isTextBold={currentTab == "Archived"}
              badgeText={archivedJobsArr.length} onClick={() => assignCurrentTab('Archived')}>
                Archived
            </ButtonWithBadge>
          </div>
        </div>
        <ScrollArea className='container h-96 w-full'>
            {jobListings.map(job => <SavedJob key={job.jobTitle} jobTitle={job.jobTitle} company={job.company} location={job.location} savedDate={job.savedDate} companyImage={job.companyImage}/>)}
        </ScrollArea>
      </div>
    </main>
  );
}
