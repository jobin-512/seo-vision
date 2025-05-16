
'use client';

import React from 'react';
import type { MixedContentAnalysis } from '@/lib/types';

interface MixedContentAccordionContentProps {
  data: MixedContentAnalysis;
}

const MixedContentAccordionContent: React.FC<MixedContentAccordionContentProps> = ({ data }) => {
  const { details, statusText, statusColorClass } = data;

  return (
    <div className="text-sm">
      {details ? (
        <p className={statusColorClass || 'text-muted-foreground'}>{details}</p>
      ) : statusText ? (
         <p className={statusColorClass || 'text-muted-foreground'}>{statusText}</p>
      ) :(
        <p className="text-muted-foreground">No mixed content information available.</p>
      )}
    </div>
  );
};

export default MixedContentAccordionContent;
