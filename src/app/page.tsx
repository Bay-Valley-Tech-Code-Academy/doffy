'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import JobDropdown from '~/components/client/job-dropdown';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

// here were defining the shape of our Job object
interface JobCard {
  id: number;
  title: string;
  company: string;
  location: string;
  tags: {
    id: number;
    name: string;
  }[];
  salary: string; // TODO: change to number later
  description: string;
}

const jobCards: JobCard[] = [
  {
    id: 1,
    title: 'Software Engineer',
    company: 'Company A',
    location: 'San Francisco, CA',
    tags: [
      { id: 1, name: 'Full-time' },
      { id: 2, name: 'Remote' },
    ],
    salary: '$120k - $140k',
    description: 'Work on building scalable web applications...',
  },
  {
    id: 2,
    title: 'Frontend Developer',
    company: 'Company B',
    location: 'New York, NY',
    tags: [
      { id: 1, name: 'Contract' },
      { id: 2, name: 'Hybrid' },
    ],
    salary: '$90k - $110k',
    description: 'Design and develop modern UI components...',
  },
  {
    id: 3,
    title: 'Backend Engineer',
    company: 'Company C',
    location: 'Seattle, WA',
    tags: [
      { id: 1, name: 'Full-time' },
      { id: 2, name: 'Onsite' },
    ],
    salary: '$110k - $130k',
    description: 'Optimize APIs and database performance...',
  },
];

export default function HomePage() {
  const [selectedJob, setSelectedJob] = useState<JobCard | null>(null);

  useEffect(() => {
    setSelectedJob(jobCards.length > 0 ? (jobCards[0] ?? null) : null);
  }, []);
  return (
    <main>
      <div className="container flex h-screen flex-row gap-4 px-4 py-8">
        {/* Left column: Job Listings */}
        <div className="w-1/3 overflow-y-auto border-2 border-gray-200 p-4">
          {jobCards.map((jobCard) => (
            <Card
              key={jobCard.id}
              onClick={() => setSelectedJob(jobCard)}
              className="my-5 cursor-pointer rounded-lg border border-gray-200 p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold text-gray-900">
                  {jobCard.title}
                </CardTitle>
                <JobDropdown />
              </CardHeader>
              <CardContent className="space-y-1 text-sm text-gray-700">
                <p className="font-medium text-gray-900">{jobCard.company}</p>
                <p className="text-gray-600">{jobCard.location}</p>
                <p className="font-medium text-orange-600">{jobCard.salary}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {jobCard.tags.map((tag) => (
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
              <p className="font-medium text-orange-600">{selectedJob.salary}</p>
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
    </main>
  );
}
