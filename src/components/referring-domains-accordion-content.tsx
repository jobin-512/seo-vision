
'use client';

import React from 'react';
import type { ReferringDomains } from '@/lib/types';
import { Progress } from '@/components/ui/progress';

interface ReferringDomainsAccordionContentProps {
  data: ReferringDomains;
}

const ReferringDomainsAccordionContent: React.FC<ReferringDomainsAccordionContentProps> = ({ data }) => {
  const { count, statusText, statusColorClass } = data;
  // Example: Visualize count on a scale, e.g., up to 500 for full bar.
  const progressValue = count !== undefined ? Math.min((count / 500) * 100, 100) : 0;

  return (
    <div className="space-y-2 text-sm">
      {statusText && <p className={`font-medium mb-1 ${statusColorClass || 'text-muted-foreground'}`}>{statusText}</p>}
      {count !== undefined ? (
        <div className="flex items-center space-x-3">
            <strong className="text-foreground">Referring Domains: {count.toLocaleString()}</strong>
            {count > 0 && <Progress value={progressValue} className="w-1/2 h-2.5" />}
        </div>
      ) : (
        <p className="text-muted-foreground">Referring domains count unavailable.</p>
      )}
    </div>
  );
};

export default ReferringDomainsAccordionContent;
