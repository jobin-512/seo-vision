
'use client';

import React from 'react';
import type { EncodingAnalysis } from '@/lib/types';

interface EncodingAccordionContentProps {
  data: EncodingAnalysis;
}

const EncodingAccordionContent: React.FC<EncodingAccordionContentProps> = ({ data }) => {
  const { encoding, statusText, statusColorClass } = data;

  return (
    <div className="text-sm">
      {encoding ? (
        <p><strong className="text-foreground">Detected Encoding:</strong> <span className={statusColorClass || 'text-muted-foreground'}>{encoding}</span></p>
      ) : statusText ? (
        <p className={statusColorClass || 'text-muted-foreground'}>{statusText}</p>
      ) : (
        <p className="text-muted-foreground">Encoding information unavailable.</p>
      )}
       {statusText && encoding && <p className={`mt-1 text-xs ${statusColorClass || 'text-muted-foreground'}`}>{statusText}</p>}
    </div>
  );
};

export default EncodingAccordionContent;
