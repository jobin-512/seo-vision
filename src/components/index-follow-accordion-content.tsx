
'use client';

import React from 'react';
import type { IndexFollowAnalysis } from '@/lib/types';

interface IndexFollowAccordionContentProps {
  data: IndexFollowAnalysis;
}

const IndexFollowAccordionContent: React.FC<IndexFollowAccordionContentProps> = ({ data }) => {
  const { details } = data;

  return (
    <div className="text-sm">
      {details ? (
        <p className="text-muted-foreground">{details}</p>
      ) : (
        <p className="text-muted-foreground">No index/follow status details available.</p>
      )}
    </div>
  );
};

export default IndexFollowAccordionContent;
