import Image from 'next/image'
import {Button} from '../../components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "../../components/ui/dropdown-menu"
import PlaceHolderImage from './assets/PlaceHolderImage'
import type { Job } from './placeHolderData'

export default function SavedJob({jobTitle, company, location, savedDate, companyImage}: Job) {
    return (
        <div className='flex gap-2 p-2'>
            <div className='p-2'>
                {companyImage ? <Image src={companyImage} alt={`${company} business logo.`} /> : <PlaceHolderImage height={25} width={25}/>}
            </div>

            <div className='flex flex-col'>
                <h3 className='font-bold'>{jobTitle}</h3>
                <h4 className='text-sm'>{company}</h4>
                <h4 className='text-sm'>{location}</h4>
                <h4 className='text-sm font-extralight'>{savedDate}</h4>
            </div>

            <div className='ms-auto flex content-center items-start gap-2 p-2'>
                <Button>Apply Now</Button>
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