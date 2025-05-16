
'use client';

import React from 'react';
import type { TechnologiesAnalysis } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

interface TechnologiesAccordionContentProps {
  data: TechnologiesAnalysis;
}

const TechnologiesAccordionContent: React.FC<TechnologiesAccordionContentProps> = ({ data }) => {
  const { detectedTechnologies, statusText, statusColorClass } = data;

  if (!detectedTechnologies || detectedTechnologies.length === 0) {
    return <p className={`text-sm ${statusColorClass || 'text-muted-foreground'}`}>{statusText || 'No technologies detected or data unavailable.'}</p>;
  }

  return (
    <div className="space-y-3 text-sm">
       {statusText && <p className={`${statusColorClass || 'text-muted-foreground'} mb-2`}>{statusText}</p>}
      <div className="flex flex-wrap gap-2">
        {detectedTechnologies.map((tech, index) => (
          <Badge key={index} variant="secondary" className="py-1 px-2.5 text-xs">
            {tech.name}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default TechnologiesAccordionContent;
