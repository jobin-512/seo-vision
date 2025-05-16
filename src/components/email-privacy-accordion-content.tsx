
'use client';

import React from 'react';
import type { EmailPrivacyAnalysis } from '@/lib/types';

interface EmailPrivacyAccordionContentProps {
  data: EmailPrivacyAnalysis;
}

const EmailPrivacyAccordionContent: React.FC<EmailPrivacyAccordionContentProps> = ({ data }) => {
  const { details, statusText, statusColorClass } = data;

  return (
    <div className="text-sm">
      {details ? (
        <p className={statusColorClass || 'text-muted-foreground'}>{details}</p>
      ) : statusText ? (
        <p className={statusColorClass || 'text-muted-foreground'}>{statusText}</p>
      ): (
        <p className="text-muted-foreground">No email privacy information available.</p>
      )}
    </div>
  );
};

export default EmailPrivacyAccordionContent;
