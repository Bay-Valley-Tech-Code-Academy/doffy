"use client"
import Link from 'next/link';
import { ScrollArea } from "../../components/ui/scroll-area"
import SavedJob from './SavedJob'
import ButtonWithBadge from './ButtonWithBadge';
import { useState } from 'react';

import type { Job } from './placeHolderData'
import { jobsArr, jobsAmounts } from './placeHolderData';

export default function SavedJobsPage() {
  const [ currentTab, setCurrentTab ] = useState<string>('Saved')
  const filteredArray: Array<Job> = jobsArr.filter(job => job.savedLocation == currentTab);

  return (
    <main>
      <div className='flex flex-col h-full justify-center items-center gap-3 px-4 py-16'>
        <div className="container flex flex-col gap-3">
          <h2 className='text-4xl font-extrabold self-start'>My Jobs</h2>
          <div className='flex gap-3 border-b-inherit border-b-4 border border-transparent p-1'>
            <ButtonWithBadge isTextBold={currentTab == "Saved"} 
              badgeText={jobsAmounts.savedJobs} onClick={() => setCurrentTab('Saved')}>
                Saved
            </ButtonWithBadge>
            <ButtonWithBadge isTextBold={currentTab == "Applied"}
              badgeText={jobsAmounts.appliedJobs} onClick={() => setCurrentTab('Applied')}>
                Applied
            </ButtonWithBadge>
            <ButtonWithBadge isTextBold={currentTab == "Interviews"}
              badgeText={jobsAmounts.interviewsJobs} onClick={() => setCurrentTab('Interviews')}>
                Interviews
            </ButtonWithBadge>
            <ButtonWithBadge isTextBold={currentTab == "Archived"}
              badgeText={jobsAmounts.archivedJobs} onClick={() => setCurrentTab('Archived')}>
                Archived
            </ButtonWithBadge>
          </div>
        </div>
        <ScrollArea className='container h-96 w-full'>
            {filteredArray.map(job => <SavedJob key={job.jobTitle} jobTitle={job.jobTitle} company={job.company} location={job.location} savedDate={job.savedDate} companyImage={job.companyImage}/>)}
        </ScrollArea>
      </div>
    </main>
  );
}
