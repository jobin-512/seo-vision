
'use client';

import React from 'react';
import type { TapTargetsAnalysis } from '@/lib/types';

interface TapTargetsAccordionContentProps {
  data: TapTargetsAnalysis;
}

const TapTargetsAccordionContent: React.FC<TapTargetsAccordionContentProps> = ({ data }) => {
  const { details } = data;

  return (
    <div className="text-sm">
      {details ? (
        <p className="text-muted-foreground">{details}</p>
      ) : (
        <p className="text-muted-foreground">No tap target information available.</p>
      )}
    </div>
  );
};

export default TapTargetsAccordionContent;
