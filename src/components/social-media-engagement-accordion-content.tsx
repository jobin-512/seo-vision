
'use client';

import React from 'react';
import type { SocialMediaEngagement, SocialEngagementItem } from '@/lib/types';
import { ThumbsUp, MessageCircle, Share2, Info } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface SocialMediaEngagementAccordionContentProps {
  data: SocialMediaEngagement;
}

const EngagementIcon: React.FC<{ iconName?: string }> = ({ iconName }) => {
  const iconProps = { className: "h-4 w-4 text-muted-foreground" };
  if (iconName === 'ThumbsUp') return <ThumbsUp {...iconProps} />;
  if (iconName === 'MessageCircle') return <MessageCircle {...iconProps} />;
  if (iconName === 'Share2') return <Share2 {...iconProps} />;
  return <Info {...iconProps} />; // Default icon
};

const SocialMediaEngagementAccordionContent: React.FC<SocialMediaEngagementAccordionContentProps> = ({ data }) => {
  const { summary, engagements, statusText, statusColorClass } = data;

  return (
    <div className="space-y-3 text-sm">
      {summary && <p className={`mb-3 ${statusColorClass || 'text-muted-foreground'}`}>{summary}</p>}
      
      {engagements && engagements.length > 0 ? (
        <div className="border rounded-md">
          <Table>
            {/* Optional Header 
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]"></TableHead>
                <TableHead>Metric</TableHead>
                <TableHead className="text-right">Count</TableHead>
              </TableRow>
            </TableHeader>
            */}
            <TableBody>
              {engagements.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="w-[40px] pl-3 pr-2">
                    <EngagementIcon iconName={item.iconName} />
                  </TableCell>
                  <TableCell className="font-medium text-foreground py-2.5">{item.metricName}</TableCell>
                  <TableCell className="text-right font-semibold text-foreground py-2.5 pr-3">{item.value.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : !summary && statusText ? (
        <p className={statusColorClass || 'text-muted-foreground'}>{statusText}</p>
      ) : (
        <p className="text-muted-foreground">No social media engagement data available.</p>
      )}
       {!summary && !engagements && !statusText && <p className="text-muted-foreground">Social media engagement information unavailable.</p>}
    </div>
  );
};

export default SocialMediaEngagementAccordionContent;
