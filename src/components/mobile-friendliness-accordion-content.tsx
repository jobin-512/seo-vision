
'use client';

import React from 'react';
import type { MobileFriendlinessAnalysis } from '@/lib/types';
import { Progress } from '@/components/ui/progress';

interface MobileFriendlinessAccordionContentProps {
  data: MobileFriendlinessAnalysis;
}

const MobileFriendlinessAccordionContent: React.FC<MobileFriendlinessAccordionContentProps> = ({ data }) => {
  const { ratingText, progressValue = 0, details, statusColorClass } = data;

  let progressBarColor = 'bg-primary'; // Default
  if (statusColorClass === 'text-accent') progressBarColor = 'bg-accent';
  else if (statusColorClass === 'text-warning') progressBarColor = 'bg-yellow-500'; // Using a direct color for warning
  else if (statusColorClass === 'text-destructive') progressBarColor = 'bg-destructive';


  return (
    <div className="space-y-3 text-sm">
      {ratingText && <p><strong className="text-foreground">Rating:</strong> <span className={statusColorClass}>{ratingText}</span></p>}
      
      <div className="flex items-center space-x-2">
        <Progress value={progressValue} className="w-full h-3" />
        {/* The segmented bar in the image is hard to replicate perfectly with current Progress component
            This will show a solid bar based on progressValue */}
      </div>

      {details && <p className="text-muted-foreground">{details}</p>}
      {!ratingText && !details && (
         <p className="text-muted-foreground">No mobile friendliness information available.</p>
      )}
    </div>
  );
};

export default MobileFriendlinessAccordionContent;
