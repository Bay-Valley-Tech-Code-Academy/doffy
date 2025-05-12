'use client';

import { EllipsisVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useState } from 'react';

export default function JobDropdown() {
  const [saved, setSaved] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
          <EllipsisVertical />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onClick={() => setSaved(!saved)}>
          {saved ? 'Saved ✔' : 'Save Job'}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log('Not Interested')}>
          Not Interested
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
