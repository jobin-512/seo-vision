
'use client';

import React from 'react';
import type { UnderscoresInUrlsAnalysis } from '@/lib/types';

interface UnderscoresInUrlsAccordionContentProps {
  data: UnderscoresInUrlsAnalysis;
}

const UnderscoresInUrlsAccordionContent: React.FC<UnderscoresInUrlsAccordionContentProps> = ({ data }) => {
  const { details } = data;

  return (
    <div className="text-sm">
      {details ? (
        <p className="text-muted-foreground">{details}</p>
      ) : (
        <p className="text-muted-foreground">No information on underscores in URLs available.</p>
      )}
    </div>
  );
};

export default UnderscoresInUrlsAccordionContent;
