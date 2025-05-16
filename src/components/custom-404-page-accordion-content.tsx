
'use client';

import React from 'react';
import type { Custom404PageAnalysis } from '@/lib/types';

interface Custom404PageAccordionContentProps {
  data: Custom404PageAnalysis;
}

const Custom404PageAccordionContent: React.FC<Custom404PageAccordionContentProps> = ({ data }) => {
  const { details, httpStatusCode, statusText, statusColorClass } = data;

  return (
    <div className="text-sm space-y-1">
      {details && <p className={statusColorClass || 'text-muted-foreground'}>{details}</p>}
      {httpStatusCode !== undefined && (
        <p className="text-xs text-muted-foreground">
          Server responded with HTTP status code: <strong className={statusColorClass || 'text-foreground'}>{httpStatusCode}</strong>
        </p>
      )}
      {!details && !statusText && <p className="text-muted-foreground">Custom 404 page information unavailable.</p>}
      {!details && statusText && <p className={statusColorClass || 'text-muted-foreground'}>{statusText}</p>}
    </div>
  );
};

export default Custom404PageAccordionContent;
