
'use client';

import React from 'react';
import type { DmarcAnalysis } from '@/lib/types';

interface DmarcAccordionContentProps {
  data: DmarcAnalysis;
}

const DmarcAccordionContent: React.FC<DmarcAccordionContentProps> = ({ data }) => {
  const { details, statusText, statusColorClass } = data;

  return (
    <div className="text-sm">
      {details ? (
        <p className={statusColorClass || 'text-muted-foreground'}>{details}</p>
      ) : statusText ? (
         <p className={statusColorClass || 'text-muted-foreground'}>{statusText}</p>
      ) : (
        <p className="text-muted-foreground">No DMARC information available.</p>
      )}
    </div>
  );
};

export default DmarcAccordionContent;
