
'use client';

import React from 'react';
import type { RobotsTagsAnalysis } from '@/lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';

interface RobotsTagsAccordionContentProps {
  data: RobotsTagsAnalysis;
}

const RobotsTagsAccordionContent: React.FC<RobotsTagsAccordionContentProps> = ({ data }) => {
  const { details, foundTags } = data;

  return (
    <div className="space-y-3 text-sm">
      {details && <p className="text-muted-foreground mb-3">{details}</p>}
      
      {foundTags && foundTags.length > 0 ? (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tag</TableHead>
                <TableHead className="w-[100px]">Source</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {foundTags.map((tagItem, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium break-all">
                    <code>{tagItem.tag}</code>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{tagItem.source || 'N/A'}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className="text-muted-foreground">No specific robots tags found or data unavailable.</p>
      )}
       {!details && (!foundTags || foundTags.length === 0) && (
         <p className="text-muted-foreground">No robots tags information available.</p>
       )}
    </div>
  );
};

export default RobotsTagsAccordionContent;
