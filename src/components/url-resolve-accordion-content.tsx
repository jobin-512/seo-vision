
'use client';

import React from 'react';
import type { UrlResolveAnalysis } from '@/lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface UrlResolveAccordionContentProps {
  data: UrlResolveAnalysis;
}

const UrlResolveAccordionContent: React.FC<UrlResolveAccordionContentProps> = ({ data }) => {
  const { resolutions, details } = data;

  return (
    <div className="space-y-3">
      {details && <p className="text-sm text-muted-foreground mb-3">{details}</p>}

      {resolutions && resolutions.length > 0 ? (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Original URL</TableHead>
                <TableHead>Resolved URL</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resolutions.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="break-all">
                     <a href={item.originalUrl.startsWith('http') ? item.originalUrl : `http://${item.originalUrl}`} target="_blank" rel="noopener noreferrer" className="hover:underline text-primary">
                        {item.originalUrl}
                    </a>
                  </TableCell>
                  <TableCell className="break-all">
                    <a href={item.resolvedUrl.startsWith('http') ? item.resolvedUrl : `http://${item.resolvedUrl}`} target="_blank" rel="noopener noreferrer" className="hover:underline text-primary">
                        {item.resolvedUrl}
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No URL resolution data available.</p>
      )}
    </div>
  );
};

export default UrlResolveAccordionContent;
