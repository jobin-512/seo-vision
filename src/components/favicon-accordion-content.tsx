
'use client';

import React from 'react';
import type { FaviconAnalysis } from '@/lib/types';

interface FaviconAccordionContentProps {
  data: FaviconAnalysis;
}

const FaviconAccordionContent: React.FC<FaviconAccordionContentProps> = ({ data }) => {
  const { details, statusText, statusColorClass } = data;

  return (
    <div className="text-sm">
      {details ? (
        <p className={statusColorClass || 'text-muted-foreground'}>{details}</p>
      ) : statusText ? (
        <p className={statusColorClass || 'text-muted-foreground'}>{statusText}</p>
      ) : (
        <p className="text-muted-foreground">Favicon information unavailable.</p>
      )}
    </div>
  );
};

export default FaviconAccordionContent;
