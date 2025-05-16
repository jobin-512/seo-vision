
'use client';

import React from 'react';
import type { DomainAvailabilityAnalysis } from '@/lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle2, XCircle } from 'lucide-react';

interface DomainAvailabilityAccordionContentProps {
  data: DomainAvailabilityAnalysis;
}

const DomainAvailabilityAccordionContent: React.FC<DomainAvailabilityAccordionContentProps> = ({ data }) => {
  const { domains, statusText, statusColorClass } = data;

  if (!domains || domains.length === 0) {
    return <p className={`text-sm ${statusColorClass || 'text-muted-foreground'}`}>{statusText || 'Domain availability data unavailable.'}</p>;
  }

  return (
    <div className="space-y-3 text-sm">
      {statusText && <p className={`${statusColorClass || 'text-muted-foreground'} mb-2`}>{statusText}</p>}
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Domain</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right w-[50px]">Available</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {domains.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.domain}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell className="text-right">
                  {item.isAvailable ? (
                    <CheckCircle2 className="h-5 w-5 text-accent inline-block" />
                  ) : (
                    <XCircle className="h-5 w-5 text-destructive inline-block" />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DomainAvailabilityAccordionContent;
