
'use client';

import React from 'react';
import type { TrafficEstimations } from '@/lib/types';
import { BarChartHorizontal } from 'lucide-react'; // Or another relevant icon

interface TrafficEstimationsAccordionContentProps {
  data: TrafficEstimations;
}

const TrafficEstimationsAccordionContent: React.FC<TrafficEstimationsAccordionContentProps> = ({ data }) => {
  const { estimationText, details, statusText, statusColorClass } = data;

  // Mock progress bars based on qualitative estimation text
  const getProgressBars = () => {
    const baseClasses = "h-2.5 rounded-full";
    let bars = [
      { width: 'w-1/5', color: 'bg-muted' },
      { width: 'w-1/5', color: 'bg-muted' },
      { width: 'w-1/5', color: 'bg-muted' },
      { width: 'w-1/5', color: 'bg-muted' },
      { width: 'w-1/5', color: 'bg-muted' },
    ];

    if (estimationText) {
      const lowerEst = estimationText.toLowerCase();
      if (lowerEst.includes("very low")) bars[0].color = statusColorClass && statusColorClass.includes('destructive') ? 'bg-destructive' : 'bg-yellow-500';
      else if (lowerEst.includes("low")) {
        bars[0].color = statusColorClass && statusColorClass.includes('warning') ? 'bg-yellow-500' : 'bg-primary/60';
        bars[1].color = statusColorClass && statusColorClass.includes('warning') ? 'bg-yellow-500' : 'bg-primary/60';
      } else if (lowerEst.includes("moderate") || lowerEst.includes("medium")) {
        bars[0].color = 'bg-primary'; bars[1].color = 'bg-primary'; bars[2].color = 'bg-primary';
      } else if (lowerEst.includes("high")) {
        bars[0].color = 'bg-accent'; bars[1].color = 'bg-accent'; bars[2].color = 'bg-accent'; bars[3].color = 'bg-accent';
      } else if (lowerEst.includes("very high")) {
        bars = bars.map(b => ({ ...b, color: 'bg-accent' }));
      }
    }

    return (
      <div className="flex space-x-1 my-2">
        {bars.map((bar, index) => (
          <div key={index} className={`${baseClasses} ${bar.width} ${bar.color}`}></div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-2 text-sm">
      {estimationText && (
        <p>
          <strong className="text-foreground">Estimation:</strong>{' '}
          <span className={statusColorClass || 'text-muted-foreground'}>{estimationText}</span>
        </p>
      )}
      {estimationText && getProgressBars()}
      {details && <p className="text-muted-foreground italic">{details}</p>}
      {!estimationText && !details && statusText && <p className={statusColorClass || 'text-muted-foreground'}>{statusText}</p>}
      {!estimationText && !details && !statusText && <p className="text-muted-foreground">Traffic estimation data unavailable.</p>}
    </div>
  );
};

export default TrafficEstimationsAccordionContent;
