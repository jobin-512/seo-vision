
'use client';

import React from 'react';
import type { UrlParametersAnalysis } from '@/lib/types';

interface UrlParametersAccordionContentProps {
  data: UrlParametersAnalysis;
}

const UrlParametersAccordionContent: React.FC<UrlParametersAccordionContentProps> = ({ data }) => {
  const { details } = data;

  return (
    <div className="text-sm">
      {details ? (
        <p className="text-muted-foreground">{details}</p>
      ) : (
        <p className="text-muted-foreground">No URL parameters analysis available.</p>
      )}
    </div>
  );
};

export default UrlParametersAccordionContent;
