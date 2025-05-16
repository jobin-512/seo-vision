
'use client';

import React from 'react';
import type { DiscoveredPagesAnalysis } from '@/lib/types';
import { Progress } from '@/components/ui/progress';

interface DiscoveredPagesAccordionContentProps {
  data: DiscoveredPagesAnalysis;
}

const DiscoveredPagesAccordionContent: React.FC<DiscoveredPagesAccordionContentProps> = ({ data }) => {
  const { count, details } = data;
  // Simple progress visualization: assume max 1000 pages for 100% bar, cap at 100%
  const progressValue = count ? Math.min((count / 1000) * 100, 100) : 0;

  return (
    <div className="space-y-2 text-sm">
      {count !== undefined && (
        <div className="flex items-center space-x-3">
          <strong className="text-foreground">Pages Found: {count}</strong>
          {count > 0 && (
             <Progress value={progressValue} className="w-1/2 h-2.5" />
          )}
        </div>
      )}
      {details && <p className="text-muted-foreground">{details}</p>}
      {count === undefined && !details && (
        <p className="text-muted-foreground">No discovered pages information available.</p>
      )}
    </div>
  );
};

export default DiscoveredPagesAccordionContent;
