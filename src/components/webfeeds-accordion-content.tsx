
'use client';

import React from 'react';
import type { WebFeedsAnalysis } from '@/lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';

interface WebFeedsAccordionContentProps {
  data: WebFeedsAnalysis;
}

const WebFeedsAccordionContent: React.FC<WebFeedsAccordionContentProps> = ({ data }) => {
  const { feeds, details } = data;

  return (
    <div className="space-y-3">
      {details && <p className="text-sm text-muted-foreground mb-3">{details}</p>}
      
      {feeds && feeds.length > 0 ? (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>URL</TableHead>
                <TableHead className="w-[100px]">Format</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feeds.map((feed, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium break-all">
                    <a href={feed.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {feed.url}
                    </a>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{feed.format || 'N/A'}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No web feeds found or data unavailable.</p>
      )}
    </div>
  );
};

export default WebFeedsAccordionContent;
