'use client';

import { useState } from 'react';
import { EllipsisVertical } from 'lucide-react';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export default function JobDropdown() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    const newSavedState = !saved;
    setSaved(newSavedState);

    if (newSavedState) {
      toast('Job Saved', {
        description: 'You have successfully saved this job listing.',
        action: {
          label: 'Undo',
          onClick: () => setSaved(false),
        },
      });
    }
  };

  const handleNotInterested = () => {
    toast('Marked as Not Interested', {
      description: 'You will no longer see this job listing.',
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
          <EllipsisVertical />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onClick={handleSave}>
          {saved ? 'Saved ✔' : 'Save Job'}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleNotInterested}>
          Not Interested
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}