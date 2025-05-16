
'use client';

import React from 'react';
import type { ContrastAnalysis, ContrastItem } from '@/lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ContrastAccordionContentProps {
  data: ContrastAnalysis;
}

const ContrastAccordionContent: React.FC<ContrastAccordionContentProps> = ({ data }) => {
  const { details, items, statusText, statusColorClass } = data;

  return (
    <div className="space-y-3 text-sm">
      {details && <p className={`mb-2 ${statusColorClass || 'text-muted-foreground'}`}>{details}</p>}
      
      {items && items.length > 0 ? (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Element</TableHead>
                <TableHead className="w-[100px]">Ratio</TableHead>
                <TableHead className="w-[100px]">Expected</TableHead>
                <TableHead className="w-[80px] text-center">Preview</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <code className="text-xs p-1 bg-muted rounded-sm break-all">{item.elementHtml}</code>
                  </TableCell>
                  <TableCell className="font-medium">{item.ratio}</TableCell>
                  <TableCell>{item.expectedRatio}</TableCell>
                  <TableCell className="text-center">
                    <div className="inline-block px-2 py-1 border rounded bg-background text-foreground">
                      {item.previewText || 'Aa'}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : !details && statusText ? (
        <p className={statusColorClass || 'text-muted-foreground'}>{statusText}</p>
      ) : items && items.length === 0 && details ? (
        <p className="text-muted-foreground">No contrast issues found based on the details provided.</p>
      ) : (
        <p className="text-muted-foreground">No contrast issues found or data unavailable.</p>
      )}
       {!items && !details && !statusText && <p className="text-muted-foreground">Contrast information unavailable.</p>}
    </div>
  );
};

export default ContrastAccordionContent;
