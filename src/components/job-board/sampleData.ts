import type { Job } from "~/lib/types/job.interface";

export const jobCards: Job[] = [
    {
      id: 1,
      title: 'Software Engineer',
      company: 'Company A',
      location: 'San Francisco, CA',
      origin: 'LinkedIn',
      pay: '$120k - $140k',
      description: 'Work on building scalable web applications...',
      url: 'https://companyA.com/careers/software-engineer',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: [
        { id: 1, name: 'Full-time' },
        { id: 2, name: 'Remote' },
      ],
    },
    {
      id: 2,
      title: 'Frontend Developer',
      company: 'Company B',
      location: 'New York, NY',
      origin: 'Indeed',
      pay: '$90k - $110k',
      description: 'Design and develop modern UI components...',
      url: 'https://companyB.com/jobs/frontend-developer',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: [
        { id: 3, name: 'Contract' },
        { id: 4, name: 'Hybrid' },
      ],
    },
    {
      id: 3,
      title: 'Backend Engineer',
      company: 'Company C',
      location: 'Seattle, WA',
      origin: 'Company Website',
      pay: '$110k - $130k',
      description: 'Optimize APIs and database performance...',
      url: 'https://companyC.com/careers/backend-engineer',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: [
        { id: 5, name: 'Full-time' },
        { id: 6, name: 'Onsite' },
      ],
    },
  ];