
'use client';

import React from 'react';
import type { MicroformatsAnalysis } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

interface MicroformatsAccordionContentProps {
  data: MicroformatsAnalysis;
}

const MicroformatsAccordionContent: React.FC<MicroformatsAccordionContentProps> = ({ data }) => {
  const { formatsFound, statusText, statusColorClass } = data;

  if (!formatsFound || formatsFound.length === 0) {
    return <p className={`text-sm ${statusColorClass || 'text-muted-foreground'}`}>{statusText || 'No microformats detected or data unavailable.'}</p>;
  }

  return (
    <div className="space-y-3 text-sm">
       {statusText && <p className={`${statusColorClass || 'text-muted-foreground'} mb-2`}>{statusText}</p>}
      <div className="flex flex-wrap gap-2">
        {formatsFound.map((format, index) => (
          <Badge key={index} variant="secondary" className="py-1 px-2.5 text-xs">
            {format.type}
            <span className="ml-1.5 bg-primary text-primary-foreground rounded-full px-1.5 text-[10px] font-mono">
              {format.count}
            </span>
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default MicroformatsAccordionContent;
