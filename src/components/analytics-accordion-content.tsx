
'use client';

import React from 'react';
import type { AnalyticsAnalysis } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

interface AnalyticsAccordionContentProps {
  data: AnalyticsAnalysis;
}

const AnalyticsAccordionContent: React.FC<AnalyticsAccordionContentProps> = ({ data }) => {
  const { detectedTools, statusText, statusColorClass } = data;

  if (!detectedTools || detectedTools.length === 0) {
    return <p className={`text-sm ${statusColorClass || 'text-muted-foreground'}`}>{statusText || 'No analytics tools detected or data unavailable.'}</p>;
  }

  return (
    <div className="space-y-3 text-sm">
      {statusText && <p className={`${statusColorClass || 'text-muted-foreground'} mb-2`}>{statusText}</p>}
      <div className="flex flex-wrap gap-2">
        {detectedTools.map((tool, index) => (
          <Badge key={index} variant="secondary" className="py-1 px-2.5 text-xs">
            {tool.name}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsAccordionContent;
