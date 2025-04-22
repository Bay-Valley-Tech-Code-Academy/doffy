'use client';

import { useEffect, useState } from 'react';
import {Card, CardTitle, CardHeader, CardContent } from '../ui/card';
import JobDropdown from '~/components/client/job-dropdown';
import { jobCards } from './sampleData';
import type { Job } from '~/lib/types/job.interface';

export default function JobBoard() {
    const [selectedJob, setSelectedJob] = useState<Job | null>(null)

    useEffect(() => {
      setSelectedJob(jobCards[0] ?? null);
    }, []);
    
    return (
        <div className="container flex h-screen flex-row gap-4 px-4 py-8">
          {/* Left column: Job Listings */}
          <div className="w-1/3 overflow-y-auto border-2 border-gray-200 p-4">
            {jobCards.map((job) => (
              <Card
                key={job.id}
                onClick={() => setSelectedJob(job)}
                className="my-5 cursor-pointer rounded-lg border border-gray-200 p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {job.title}
                  </CardTitle>
                  <JobDropdown />
                </CardHeader>
                <CardContent className="space-y-1 text-sm text-gray-700">
                  <p className="font-medium text-gray-900">{job.company}</p>
                  <p className="text-gray-600">{job.location}</p>
                  <p className="font-medium text-orange-600">{job.pay}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="rounded-lg bg-blue-100 px-1 py-1 text-xs font-medium text-blue-600"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
  
          {/* Right column: Job Details */}
          <div className="h-full w-2/3 border-2 border-gray-200 p-4">
            {selectedJob ? (
              <>
                <h1 className="text-xl font-bold">{selectedJob.title}</h1>
                <h2 className="text-lg text-gray-800">{selectedJob.company}</h2>
                <p className="text-gray-600">{selectedJob.location}</p>
                <p className="font-medium text-orange-600">{selectedJob.pay}</p>
                <p className="text-sm text-gray-500">Posted via {selectedJob.origin}</p>
                <a
                  href={selectedJob.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm text-blue-600 underline hover:cursor-pointer"
                >
                  View Listing
                </a>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedJob.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="rounded-lg bg-green-100 px-2 py-1 text-sm font-medium text-green-600"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-gray-700">{selectedJob.description}</p>
              </>
            ) : (
              <h5 className="text-gray-500">Select a job to see details</h5>
            )}
          </div>
        </div>
    );
  }