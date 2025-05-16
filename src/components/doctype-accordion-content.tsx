
'use client';

import React from 'react';
import type { DoctypeAnalysis } from '@/lib/types';

interface DoctypeAccordionContentProps {
  data: DoctypeAnalysis;
}

const DoctypeAccordionContent: React.FC<DoctypeAccordionContentProps> = ({ data }) => {
  const { doctype, statusText, statusColorClass } = data;

  return (
    <div className="text-sm">
      {doctype ? (
        <p><strong className="text-foreground">Detected Doctype:</strong> <span className={statusColorClass || 'text-muted-foreground'}>{doctype}</span></p>
      ) : statusText ? (
        <p className={statusColorClass || 'text-muted-foreground'}>{statusText}</p>
      ) : (
        <p className="text-muted-foreground">Doctype information unavailable.</p>
      )}
    </div>
  );
};

export default DoctypeAccordionContent;
