'use client';

import { useEffect, useState } from 'react';
import { Card, CardTitle, CardHeader, CardContent } from '../ui/card';
import JobDropdown from '~/components/client/job-dropdown';
import { jobCards } from './sampleData';
import type { Job } from '~/lib/types/job.interface';
import { Building2, MapPin, Clock, DollarSign, CheckCircle, BookmarkPlus, Share2, Flag } from 'lucide-react';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';

export default function JobBoard() {
    const [selectedJob, setSelectedJob] = useState<Job | null>(null)

    useEffect(() => {
      setSelectedJob(jobCards[0] ?? null);
    }, []);
    
    return (
        <div className="container flex h-screen flex-row gap-8 px-6 py-8">
          {/* Left column: Job Listings */}
          <ScrollArea className="w-1/3 border-r border-[#FF5331] pr-6">
            <div className="space-y-4">
              {jobCards.map((job) => (
                <Card
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className={`cursor-pointer rounded-xl border border-[#FF5331] p-5 transition-all hover:border-[#FF5331] hover:shadow-lg ${
                    selectedJob?.id === job.id ? 'border-[#FF5331] bg-[#FFF5F3]' : ''
                  }`}
                >
                  <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
                    <div className="space-y-1.5">
                      <CardTitle className="text-lg font-semibold text-gray-900 hover:text-[#FF5331]">
                        {job.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Building2 className="h-4 w-4" />
                        <span className="font-medium">{job.company}</span>
                      </div>
                    </div>
                    <JobDropdown />
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#FF5331]">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="text-green-600">{job.pay}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>Posted via {job.origin}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {job.tags.map((tag) => (
                        <span
                          key={tag.id}
                          className={`rounded-full bg-[#FFF5F3] px-3 py-1 text-xs font-medium text-[#FF5331] ${
                    selectedJob?.id === job.id ? 'border border-[#FF5331]' : ''}`}
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
  
          {/* Right column: Job Details */}
          <ScrollArea className="h-full w-2/3 pl-6">
            {selectedJob ? (
              <div className="space-y-8">
                <div className="space-y-3">
                  <h1 className="text-3xl font-bold text-gray-900">{selectedJob.title}</h1>
                  <div className="flex items-center gap-2 text-xl text-gray-600">
                    <Building2 className="h-6 w-6" />
                    <span className="font-medium">{selectedJob.company}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-5 w-5" />
                    <span className="text-lg">{selectedJob.location}</span>
                  </div>
                  <div className="flex items-center gap-2 font-semibold text-[#FF5331]">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <span className="text-lg text-green-600">{selectedJob.pay}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>Posted via {selectedJob.origin}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {selectedJob.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className={`rounded-full bg-[#FFF5F3] px-4 py-1.5 text-sm font-medium text-[#FF5331] border border-[#FF5331]`}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-gray-900">Job Description</h2>
                  <p className="text-gray-700 leading-relaxed">{selectedJob.description}</p>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <Button className="h-10 bg-[#FF5331] px-6 hover:bg-[#E64A2A]">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Apply Now
                    </Button>
                    <Button variant="outline" size="icon" className="h-10 w-10 border-[#FF5331] text-[#FF5331] hover:bg-[#FFF5F3]">
                      <BookmarkPlus className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-10 w-10 border-[#FF5331] text-[#FF5331] hover:bg-[#FFF5F3]">
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                    <a
                      href={selectedJob.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-[#FF5331] hover:underline"
                    >
                      View original job posting →
                    </a>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="h-8 px-2 text-gray-500 hover:bg-gray-100">
                        <Flag className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center">
                <h5 className="text-lg text-gray-500">Select a job to see details</h5>
              </div>
            )}
          </ScrollArea>
        </div>
    );
}