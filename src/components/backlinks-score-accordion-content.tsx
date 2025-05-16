
'use client';

import React from 'react';
import type { BacklinksScore } from '@/lib/types';
import { Progress } from '@/components/ui/progress';

interface BacklinksScoreAccordionContentProps {
  data: BacklinksScore;
}

const BacklinksScoreAccordionContent: React.FC<BacklinksScoreAccordionContentProps> = ({ data }) => {
  const { score, details, statusText, statusColorClass } = data;
  const progressValue = score ?? 0;

  let progressBarColor = 'bg-primary'; // Default
  if (statusColorClass === 'text-accent') progressBarColor = 'bg-accent';
  else if (statusColorClass === 'text-warning') progressBarColor = 'bg-yellow-500';
  else if (statusColorClass === 'text-destructive') progressBarColor = 'bg-destructive';


  return (
    <div className="space-y-3 text-sm">
      {statusText && <p><strong className="text-foreground">Status:</strong> <span className={statusColorClass || 'text-muted-foreground'}>{statusText}</span></p>}
      {score !== undefined && (
        <div className="flex items-center space-x-2">
          <strong className="text-foreground">Score: {score}/100</strong>
           <Progress value={progressValue} className="w-1/2 h-2.5" />
        </div>
      )}
      {details && <p className="text-muted-foreground italic">{details}</p>}
      {!statusText && score === undefined && !details && <p className="text-muted-foreground">Backlinks score information unavailable.</p>}
    </div>
  );
};

export default BacklinksScoreAccordionContent;
