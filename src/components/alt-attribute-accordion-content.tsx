
'use client';

import React from 'react';
import type { AltAttributeAnalysis } from '@/lib/types';

interface AltAttributeAccordionContentProps {
  data: AltAttributeAnalysis;
}

const AltAttributeAccordionContent: React.FC<AltAttributeAccordionContentProps> = ({ data }) => {
  const { totalImages, imagesMissingAlts, details } = data;

  return (
    <div className="space-y-2 text-sm">
      <p><strong className="text-foreground">Total Images Found:</strong> {totalImages}</p>
      <p><strong className="text-foreground">Images Missing Alt Text:</strong> 
        <span className={imagesMissingAlts > 0 ? 'text-destructive font-semibold' : 'text-accent font-semibold'}>
          {' '}{imagesMissingAlts}
        </span>
      </p>
      {details && <p className="text-muted-foreground italic">{details}</p>}
    </div>
  );
};

export default AltAttributeAccordionContent;

