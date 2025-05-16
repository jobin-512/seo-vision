
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AlignLeft, CheckCircle2, AlertTriangle, XCircle, Info, ChevronDown } from 'lucide-react';

// Define types for filter options if they become dynamic
// type FilterOption = { value: string; label: string };

const ReportFilters: React.FC = () => {
  // Mock options for dropdowns
  const impactOptions = [
    { value: 'high', label: 'High Impact' },
    { value: 'medium', label: 'Medium Impact' },
    { value: 'low', label: 'Low Impact' },
  ];

  const effortOptions = [
    { value: 'low', label: 'Low Effort' },
    { value: 'medium', label: 'Medium Effort' },
    { value: 'high', label: 'High Effort' },
  ];

  return (
    <div className="bg-card p-3 rounded-lg shadow flex items-center justify-between space-x-2 mb-6 report-filters-bar">
      <div className="flex items-center space-x-1">
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <AlignLeft className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="sm" className="text-sm text-accent hover:bg-accent/10 hover:text-accent">
          <CheckCircle2 className="mr-1.5 h-4 w-4" /> Passed
        </Button>
        <Button variant="ghost" size="sm" className="text-sm text-warning hover:bg-warning/10 hover:text-warning">
          <AlertTriangle className="mr-1.5 h-4 w-4" /> To Improve
        </Button>
        <Button variant="ghost" size="sm" className="text-sm text-destructive hover:bg-destructive/10 hover:text-destructive">
          <XCircle className="mr-1.5 h-4 w-4" /> Errors
        </Button>
        <Button variant="ghost" size="sm" className="text-sm text-muted-foreground hover:bg-muted/80">
          <Info className="mr-1.5 h-4 w-4" /> Informational
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Select defaultValue="high">
          <SelectTrigger className="w-[150px] h-9 text-sm">
            <SelectValue placeholder="Impact" />
          </SelectTrigger>
          <SelectContent>
            {impactOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select defaultValue="low">
          <SelectTrigger className="w-[150px] h-9 text-sm">
            <SelectValue placeholder="Effort" />
          </SelectTrigger>
          <SelectContent>
            {effortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ReportFilters;
