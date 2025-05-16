
'use client';

import React from 'react';
import type { TwitterCardAnalysis, TwitterTag } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from 'next/image';

interface TwitterCardAccordionContentProps {
  data: TwitterCardAnalysis;
}

const TwitterCardAccordionContent: React.FC<TwitterCardAccordionContentProps> = ({ data }) => {
  const { previewData, tags } = data;

  return (
    <div className="space-y-4 text-sm">
      {previewData && (
        <Card className="overflow-hidden shadow-md bg-muted/30 max-w-md mx-auto">
          {previewData.imageUrl && (
            <div className="relative aspect-[1.91/1] w-full"> {/* Twitter card aspect ratio approx 1.91:1 */}
              <Image 
                src={previewData.imageUrl.startsWith('http') ? previewData.imageUrl : `https://placehold.co/600x315.png`} 
                alt={previewData.title || 'Twitter Card Image Preview'} 
                layout="fill" 
                objectFit="cover"
                data-ai-hint="twitter card"
              />
            </div>
          )}
          <CardContent className="p-3">
            {previewData.domain && <p className="text-xs text-muted-foreground truncate mb-0.5">{previewData.domain}</p>}
            {previewData.title && <h4 className="font-semibold text-foreground mb-1 truncate">{previewData.title}</h4>}
            {previewData.description && <p className="text-xs text-muted-foreground line-clamp-2 mb-1">{previewData.description}</p>}
            {previewData.site && <p className="text-xs text-blue-500 truncate">{previewData.site}</p>}
          </CardContent>
        </Card>
      )}

      {tags && tags.length > 0 && (
        <div>
          <h4 className="font-semibold text-foreground mb-2">Twitter Card Tags:</h4>
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
        <p className="text-muted-foreground">No Twitter Card data found.</p>
      )}
    </div>
  );
};

export default TwitterCardAccordionContent;
