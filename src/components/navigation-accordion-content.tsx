
'use client';

import React from 'react';
import type { NavigationAnalysis, NavigationCheckItem } from '@/lib/types';
import { CheckCircle2, XCircle, Info } from 'lucide-react';

interface NavigationAccordionContentProps {
  data: NavigationAnalysis;
}

const NavigationAccordionContent: React.FC<NavigationAccordionContentProps> = ({ data }) => {
  const { summaryText, checks, notRelevantChecks, statusText, statusColorClass } = data;

  const renderCheckItem = (text: string, isRelevantCheck: boolean, isPassed?: boolean) => {
    let icon = <Info className="h-4 w-4 text-muted-foreground mr-2 shrink-0 mt-0.5" />;
    let textColor = 'text-muted-foreground';

    if (isRelevantCheck) {
      if (isPassed === true) {
        icon = <CheckCircle2 className="h-4 w-4 text-accent mr-2 shrink-0 mt-0.5" />;
        textColor = 'text-accent';
      } else if (isPassed === false) {
        icon = <XCircle className="h-4 w-4 text-destructive mr-2 shrink-0 mt-0.5" />;
        textColor = 'text-destructive';
      }
    }

    return (
      <li className={`flex items-start ${textColor}`}>
        {icon}
        <span>{text}</span>
      </li>
    );
  };

  return (
    <div className="space-y-3 text-sm">
      {summaryText && <p className={`mb-2 ${statusColorClass || 'text-muted-foreground'}`}>{summaryText}</p>}
      
      {checks && checks.length > 0 && (
        <div>
          <h4 className="font-semibold text-foreground mb-1">Checks:</h4>
          <ul className="space-y-1">
            {checks.map((check, index) => (
              <React.Fragment key={`check-${index}`}>
                {renderCheckItem(check.text, true, check.passed)}
              </React.Fragment>
            ))}
          </ul>
        </div>
      )}

      {notRelevantChecks && notRelevantChecks.length > 0 && (
        <div className="mt-3">
          <h4 className="font-semibold text-foreground mb-1">Not Relevant for this Page:</h4>
          <ul className="space-y-1">
            {notRelevantChecks.map((text, index) => (
               <React.Fragment key={`not-relevant-${index}`}>
                {renderCheckItem(text, false)}
               </React.Fragment>
            ))}
          </ul>
        </div>
      )}

      {!summaryText && (!checks || checks.length === 0) && (!notRelevantChecks || notRelevantChecks.length === 0) && statusText && (
        <p className={statusColorClass || 'text-muted-foreground'}>{statusText}</p>
      )}
      
      {!summaryText && (!checks || checks.length === 0) && (!notRelevantChecks || notRelevantChecks.length === 0) && !statusText && (
         <p className="text-muted-foreground">Navigation analysis data unavailable.</p>
      )}
    </div>
  );
};

export default NavigationAccordionContent;
