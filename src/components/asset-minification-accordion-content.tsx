
'use client';

import React from 'react';
import type { AssetMinificationAnalysis } from '@/lib/types';

interface AssetMinificationAccordionContentProps {
  data: AssetMinificationAnalysis;
}

const AssetMinificationAccordionContent: React.FC<AssetMinificationAccordionContentProps> = ({ data }) => {
  const { details, statusText, statusColorClass } = data;

  return (
    <div className="text-sm">
      {details ? (
        <p className={statusColorClass || 'text-muted-foreground'}>{details}</p>
      ) : statusText ? (
         <p className={statusColorClass || 'text-muted-foreground'}>{statusText}</p>
      ) : (
        <p className="text-muted-foreground">No asset minification information available.</p>
      )}
    </div>
  );
};

export default AssetMinificationAccordionContent;
