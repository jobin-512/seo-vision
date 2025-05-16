
'use client';

import React from 'react';
import type { OnlineReviews } from '@/lib/types';

interface OnlineReviewsAccordionContentProps {
  data: OnlineReviews;
}

const OnlineReviewsAccordionContent: React.FC<OnlineReviewsAccordionContentProps> = ({ data }) => {
  const { details, statusText, statusColorClass } = data;

  return (
    <div className="text-sm">
      {details ? (
        <p className={statusColorClass || 'text-muted-foreground'}>{details}</p>
      ) : statusText ? (
        <p className={statusColorClass || 'text-muted-foreground'}>{statusText}</p>
      ) : (
        <p className="text-muted-foreground">Online reviews information unavailable.</p>
      )}
    </div>
  );
};

export default OnlineReviewsAccordionContent;
