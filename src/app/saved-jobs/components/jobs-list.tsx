import type { Job } from '../placeHolderData';
import { jobsArr } from '../placeHolderData';
import { ScrollArea } from '../../../components/ui/scroll-area';
import SavedJob from '../components/saved-job';
import Link from 'next/link';

interface JobsListProps {
    filter: string;
}

export default function JobsList({filter}: JobsListProps) {
    const filteredArray: Array<Job> = jobsArr.filter((job) => job.savedLocation === filter);

    return (
        filteredArray.length > 0 ? (
        <ScrollArea className="container h-full w-full">
        {filteredArray.map((job): JSX.Element => (
            <SavedJob
            key={job.jobTitle}
            jobTitle={job.jobTitle}
            company={job.company}
            location={job.location}
            savedDate={job.savedDate}
            companyImage={job.companyImage}
            />
        ))}
        </ScrollArea>
        ) : (
            <Link href={'/'} className="mt-3">
            Find More Jobs
            </Link>
        )
    )
}
