import Image from 'next/image';
import { Button } from '../../../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';
import { Building2 } from 'lucide-react';
import type { Job } from '../placeHolderData';

export default function SavedJob({
  jobTitle,
  company,
  location,
  savedDate,
  companyImage,
}: Job) {
  const RenderCompanyImage = (): JSX.Element => {
    return companyImage ? (
      <Image src={companyImage} alt={`${company} business logo.`} />
    ) : (
      <Building2 height={25} width={25} />
    );
  };

  return (
    <div className="flex w-full gap-2 p-2">
      <div className="p-2">
        <RenderCompanyImage />
      </div>

      <div className="flex flex-col">
        <h3 className="text-base font-bold sm:text-xl">{jobTitle}</h3>
        <h4 className="text-sm sm:text-base">{company}</h4>
        <h4 className="text-sm sm:text-base">{location}</h4>
        <h4 className="text-sm font-extralight sm:text-sm">{savedDate}</h4>
      </div>

      <div className="ms-auto flex content-center items-start gap-1 p-2 sm:gap-2">
        <Button className="p-1 sm:p-2">Apply Now</Button>
        <Button className="text-extrabold text-xl text-white">S</Button>
        <DropdownMenu>
          <DropdownMenuTrigger className="h-auto text-lg font-bold">
            ...
          </DropdownMenuTrigger>
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
  );
}
