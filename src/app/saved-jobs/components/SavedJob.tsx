import Image from 'next/image'
import {Button} from '../../../components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "../../../components/ui/dropdown-menu"
import PlaceHolderImage from '../assets/PlaceHolderImage'
import type { Job } from '../placeHolderData'

export default function SavedJob({jobTitle, company, location, savedDate, companyImage}: Omit<Job, "savedLocation">) {
    return (
        <div className='flex gap-2 p-2 w-full'>
            <div className='p-2'>
                {companyImage ? <Image src={companyImage} alt={`${company} business logo.`} /> : <PlaceHolderImage height={25} width={25}/>}
            </div>

            <div className='flex flex-col'>
                <h3 className='text-base sm:text-xl font-bold'>{jobTitle}</h3>
                <h4 className='text-sm sm:text-base'>{company}</h4>
                <h4 className='text-sm sm:text-base'>{location}</h4>
                <h4 className='text-sm sm:text-sm font-extralight'>{savedDate}</h4>
            </div>

            <div className='ms-auto flex content-center items-start gap-1 sm:gap-2 p-2'>
                <Button className='p-1 sm:p-2'>Apply Now</Button>
                <Button className='text-extrabold text-xl text-white'>S</Button>
                <DropdownMenu>
                <DropdownMenuTrigger className='text-lg font-bold h-auto'>...</DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Move To...</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Saved</DropdownMenuItem>
                        <DropdownMenuItem>Applied</DropdownMenuItem>
                        <DropdownMenuItem>Interviews</DropdownMenuItem>
                        <DropdownMenuItem>Archived</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}
