import {Button} from '../../components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "../../components/ui/dropdown-menu"

export default function SavedJob({}) {
    return (
        <div>
            <img />
            <h3>Job title</h3>
            <h4>Company</h4>
            <h4>Location</h4>
            <h4>Saved Date</h4>
            <Button>Apply Now</Button>
            <Button>Saved</Button>
            <DropdownMenu>
            <DropdownMenuTrigger>Open</DropdownMenuTrigger>
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
    )
}