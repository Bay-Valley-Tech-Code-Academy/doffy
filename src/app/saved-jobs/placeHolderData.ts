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
        jobTitle: "HTML Developer",
        company: "HTML Development Studios",
        location: "Riverbank, CA",
        savedDate: "Saved Last Week",
        savedLocation: "Archived"
    },
    {
        jobTitle: "HTML Dev #1",
        company: "HTML Development Studios",
        location: "Riverbank, CA",
        savedDate: "Saved Last Week",
        savedLocation: "Archived"
    },
    {
        jobTitle: "HTML Dev #2",
        company: "HTML Development Studios",
        location: "Riverbank, CA",
        savedDate: "Saved Last Week",
        savedLocation: "Archived"
    },
    {
        jobTitle: "HTML Dev #3",
        company: "HTML Development Studios",
        location: "Riverbank, CA",
        savedDate: "Saved Last Week",
        savedLocation: "Archived"
    },
    {
        jobTitle: "HTML Dev #4",
        company: "HTML Development Studios",
        location: "Riverbank, CA",
        savedDate: "Saved Last Week",
        savedLocation: "Archived"
    },
    {
        jobTitle: "HTML Dev #5",
        company: "HTML Development Studios",
        location: "Riverbank, CA",
        savedDate: "Saved Last Week",
        savedLocation: "Archived"
    },
    {
        jobTitle: "HTML Dev #6",
        company: "HTML Development Studios",
        location: "Riverbank, CA",
        savedDate: "Saved Last Week",
        savedLocation: "Archived"
    },
    {
        jobTitle: "HTML Dev #7",
        company: "HTML Development Studios",
        location: "Riverbank, CA",
        savedDate: "Saved Last Week",
        savedLocation: "Archived"
    },
]

type JobsAmounts = {
    [key: string]: number;
}

export const jobsAmounts: JobsAmounts = {
    Saved: jobsArr.filter(job => job.savedLocation === "Saved").length,
    Applied: jobsArr.filter(job => job.savedLocation === "Applied").length,
    Interviews: jobsArr.filter(job => job.savedLocation === "Interviews").length,
    Archived: jobsArr.filter(job => job.savedLocation === "Archived").length,
}
