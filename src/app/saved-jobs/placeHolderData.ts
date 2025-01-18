export type Job = {
    jobTitle: string;
    company: string;
    location: string;
    savedDate: string;
    savedLocation: string;
    companyImage?: string;
}

export const jobsArr: Array<Job> = [
    {
        jobTitle: "React Dev",
        company: "Some Company",
        location: "Modesto, CA",
        savedDate: "Saved Today",
        savedLocation: "Saved"
    },
    {
        jobTitle: "Web Dev",
        company: "WebDevelopment Inc",
        location: "Riverbank, CA",
        savedDate: "Saved Yesterday",
        savedLocation: "Saved"
    },
    {
        jobTitle: "NextJS Web Designed",
        company: "NextJS Studio",
        location: "Modesto, CA",
        savedDate: "Saved Yesterday",
        savedLocation: "Applied"
    },
    {
        jobTitle: "React Props Designed",
        company: "React Studio",
        location: "Modesto, CA",
        savedDate: "Saved Yesterday",
        savedLocation: "Applied"
    },
    {
        jobTitle: "React State Handler",
        company: "React Studio",
        location: "Modesto, CA",
        savedDate: "Saved Yesterday",
        savedLocation: "Applied"
    },
    {
        jobTitle: "React Effects Designed",
        company: "React Studio",
        location: "Modesto, CA",
        savedDate: "Saved Yesterday",
        savedLocation: "Applied"
    },
    {
        jobTitle: "TypeScript Developer",
        company: "TypeScript Studio",
        location: "Modesto, CA",
        savedDate: "Saved Yesterday",
        savedLocation: "Applied"
    },
    {
        jobTitle: "HTML Web Developer",
        company: "HTML Development Studios",
        location: "Riverbank, CA",
        savedDate: "Saved Last Week",
        savedLocation: "Archived"
    }
]

export const jobsAmounts = {
    savedJobs: jobsArr.filter(job => job.savedLocation === "Saved").length,
    appliedJobs: jobsArr.filter(job => job.savedLocation === "Applied").length,
    interviewsJobs: jobsArr.filter(job => job.savedLocation === "Interviews").length,
    archivedJobs: jobsArr.filter(job => job.savedLocation === "Archived").length,
}
