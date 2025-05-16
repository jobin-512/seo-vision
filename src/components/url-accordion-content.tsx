
'use client';

import React from 'react';
import type { UrlAnalysis } from '@/lib/types';

interface UrlAccordionContentProps {
  data: UrlAnalysis;
}

const UrlAccordionContent: React.FC<UrlAccordionContentProps> = ({ data }) => {
  const { url, length, statusText, statusColorClass } = data;

  return (
    <div className="space-y-1 text-sm">
      {url && (
        <p>
          <strong className="text-foreground">URL:</strong>{' '}
          <a href={url.startsWith('http') ? url : `http://${url}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline break-all">
            {url}
          </a>
        </p>
      )}
      {length !== undefined && <p><strong className="text-foreground">Length:</strong> {length} character(s)</p>}
      {statusText && <p className={`${statusColorClass || 'text-muted-foreground'}`}>{statusText}</p>}
      {!url && !statusText && <p className="text-muted-foreground">URL information unavailable.</p>}
    </div>
  );
};

export default UrlAccordionContent;
