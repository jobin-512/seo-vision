
'use client';

import React from 'react';
import type { DomainRegistrationAnalysis } from '@/lib/types';

interface DomainRegistrationAccordionContentProps {
  data: DomainRegistrationAnalysis;
}

const DomainRegistrationAccordionContent: React.FC<DomainRegistrationAccordionContentProps> = ({ data }) => {
  const { createdDate, expiryDate, statusText, statusColorClass } = data;

  return (
    <div className="text-sm space-y-1">
      {createdDate && <p><strong className="text-foreground">Created:</strong> {createdDate}</p>}
      {expiryDate && <p><strong className="text-foreground">Expires:</strong> {expiryDate}</p>}
      {statusText && <p className={`${statusColorClass || 'text-muted-foreground'} mt-1`}>{statusText}</p>}
      {!createdDate && !expiryDate && !statusText && <p className="text-muted-foreground">Domain registration information unavailable.</p>}
    </div>
  );
};

export default DomainRegistrationAccordionContent;
