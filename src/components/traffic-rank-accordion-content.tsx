
'use client';

import React from 'react';
import type { TrafficRank } from '@/lib/types';

interface TrafficRankAccordionContentProps {
  data: TrafficRank;
}

const TrafficRankAccordionContent: React.FC<TrafficRankAccordionContentProps> = ({ data }) => {
  const { globalRankText, tldRankText, statusText, statusColorClass } = data;

  return (
    <div className="space-y-1 text-sm">
      {globalRankText && (
        <p>
          <strong className="text-foreground">Global Rank:</strong>{' '}
          <span className="text-muted-foreground">{globalRankText}</span>
        </p>
      )}
      {tldRankText && (
        <p>
          <strong className="text-foreground">TLD Rank:</strong>{' '}
          <span className="text-muted-foreground">{tldRankText}</span>
        </p>
      )}
      {statusText && <p className={`mt-1 text-xs ${statusColorClass || 'text-muted-foreground'}`}>{statusText}</p>}
      {!globalRankText && !tldRankText && !statusText && <p className="text-muted-foreground">Traffic rank data unavailable.</p>}
    </div>
  );
};

export default TrafficRankAccordionContent;
