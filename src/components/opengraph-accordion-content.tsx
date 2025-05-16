
'use client';

import React from 'react';
import type { OpenGraphAnalysis, OpenGraphTag } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from 'next/image';

interface OpenGraphAccordionContentProps {
  data: OpenGraphAnalysis;
}

const OpenGraphAccordionContent: React.FC<OpenGraphAccordionContentProps> = ({ data }) => {
  const { previewData, tags } = data;

  return (
    <div className="space-y-4 text-sm">
      {previewData && (
        <Card className="overflow-hidden shadow-md bg-muted/30">
          {previewData.imageUrl && (
            <div className="relative aspect-video w-full">
              <Image 
                src={previewData.imageUrl.startsWith('http') ? previewData.imageUrl : `https://placehold.co/600x315.png?text=Invalid+OG+Image`} 
                alt={previewData.title || 'Open Graph Image Preview'} 
                layout="fill" 
                objectFit="cover"
                data-ai-hint="social media share"
              />
            </div>
          )}
          <CardContent className="p-3">
            {previewData.url && <p className="text-xs text-muted-foreground uppercase truncate mb-0.5">{previewData.url}</p>}
            {previewData.title && <h4 className="font-semibold text-foreground mb-1 truncate">{previewData.title}</h4>}
            {previewData.description && <p className="text-xs text-muted-foreground line-clamp-2">{previewData.description}</p>}
          </CardContent>
        </Card>
      )}

      {tags && tags.length > 0 && (
        <div>
          <h4 className="font-semibold text-foreground mb-2">Open Graph Tags:</h4>
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Tag</TableHead>
                  <TableHead>Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tags.map((tag, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium text-muted-foreground">{tag.tag}</TableCell>
                    <TableCell className="break-all">{tag.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
      
      {!previewData && (!tags || tags.length === 0) && (
        <p className="text-muted-foreground">No Open Graph data found.</p>
      )}
    </div>
  );
};

export default OpenGraphAccordionContent;
