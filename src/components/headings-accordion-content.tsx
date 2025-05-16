
'use client';

import React from 'react';
import type { HeadingsAnalysis, HeadingItem } from '@/lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';

interface HeadingsAccordionContentProps {
  data: HeadingsAnalysis;
}

const HeadingsAccordionContent: React.FC<HeadingsAccordionContentProps> = ({ data }) => {
  const { h1Count, h2Count, h3Count, h4Count, h5Count, h6Count, headings } = data;

  const headingCounts = [
    { tag: 'H1', count: h1Count },
    { tag: 'H2', count: h2Count },
    { tag: 'H3', count: h3Count },
    { tag: 'H4', count: h4Count },
    { tag: 'H5', count: h5Count },
    { tag: 'H6', count: h6Count },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
        {headingCounts.map(({ tag, count }) => (
          <div key={tag} className="p-2 border rounded-md text-center bg-muted/50">
            <div className="text-xs font-semibold text-muted-foreground">{tag}</div>
            <div className="text-lg font-bold text-foreground">{count}</div>
          </div>
        ))}
      </div>

      {headings && headings.length > 0 && (
        <div>
          <h4 className="font-semibold text-sm mb-2 text-foreground">Example Headings:</h4>
          <div className="max-h-60 overflow-y-auto border rounded-md p-1">
            <Table className="text-xs">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[60px]">Tag</TableHead>
                  <TableHead>Text</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {headings.slice(0, 15).map((heading, index) => ( // Limit to 15 examples
                  <TableRow key={index}>
                    <TableCell><Badge variant="secondary" className="font-mono">{heading.tag}</Badge></TableCell>
                    <TableCell className="break-all">{heading.text}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {headings.length > 15 && <p className="text-xs text-muted-foreground text-center p-2">Showing first 15 headings...</p>}
          </div>
        </div>
      )}
       {(!headings || headings.length === 0) && <p className="text-sm text-muted-foreground">No example headings available.</p>}
    </div>
  );
};

export default HeadingsAccordionContent;
