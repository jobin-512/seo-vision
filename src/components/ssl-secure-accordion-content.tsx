
'use client';

import React from 'react';
import type { SslSecureAnalysis, SslCheckItem } from '@/lib/types';
import { CheckCircle2, XCircle } from 'lucide-react';

interface SslSecureAccordionContentProps {
  data: SslSecureAnalysis;
}

const SslSecureAccordionContent: React.FC<SslSecureAccordionContentProps> = ({ data }) => {
  const { details, checks, statusText, statusColorClass } = data;

  return (
    <div className="space-y-3 text-sm">
      {details && <p className={`mb-2 ${statusColorClass || 'text-muted-foreground'}`}>{details}</p>}
      
      {checks && checks.length > 0 ? (
        <ul className="space-y-1.5">
          {checks.map((check, index) => (
            <li key={index} className={`flex items-start ${check.isPositive ? 'text-accent' : 'text-destructive'}`}>
              {check.isPositive ? (
                <CheckCircle2 className="h-4 w-4 mr-2 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="h-4 w-4 mr-2 shrink-0 mt-0.5" />
              )}
              <span>{check.text}</span>
            </li>
          ))}
        </ul>
      ) : !details && statusText ? (
         <p className={statusColorClass || 'text-muted-foreground'}>{statusText}</p>
      ) : (
        <p className="text-muted-foreground">No SSL check details available.</p>
      )}
    </div>
  );
};

export default SslSecureAccordionContent;
