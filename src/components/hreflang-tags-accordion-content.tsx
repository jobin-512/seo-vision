
'use client';

import React from 'react';
import type { HreflangTagsAnalysis } from '@/lib/types';

interface HreflangTagsAccordionContentProps {
  data: HreflangTagsAnalysis;
}

const HreflangTagsAccordionContent: React.FC<HreflangTagsAccordionContentProps> = ({ data }) => {
  const { details } = data;

  return (
    <div className="text-sm">
      {details ? (
        <p className="text-muted-foreground">{details}</p>
      ) : (
        <p className="text-muted-foreground">No Hreflang tag details available.</p>
      )}
    </div>
  );
};

export default HreflangTagsAccordionContent;
