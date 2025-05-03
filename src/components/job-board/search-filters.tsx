'use client';
import type { ChangeEvent } from 'react';
import { Search, Filter, Briefcase, MapPin, Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface SearchFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function SearchFilters({ searchQuery, onSearchChange }: SearchFiltersProps) {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className="border-b bg-white p-4 shadow-sm">
      <div className="container mx-auto space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search jobs, companies, or keywords"
              className="pl-10"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            <span>Job Type</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>Location</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Date Posted</span>
          </div>
        </div>
      </div>
    </div>
  );
} 