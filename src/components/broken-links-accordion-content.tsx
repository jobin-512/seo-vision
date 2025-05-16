
'use client';

import React from 'react';
import type { BrokenLinksAnalysis } from '@/lib/types';

interface BrokenLinksAccordionContentProps {
  data: BrokenLinksAnalysis;
}

const BrokenLinksAccordionContent: React.FC<BrokenLinksAccordionContentProps> = ({ data }) => {
  const { details } = data; // In future, could add brokenLinksList here

  return (
    <div className="text-sm">
      {details ? (
        <p className="text-muted-foreground">{details}</p>
      ) : (
        <p className="text-muted-foreground">No broken links information available.</p>
      )}
      {/* Placeholder for future list of broken links
      {data.brokenLinksList && data.brokenLinksList.length > 0 && (
        <ul className="list-disc pl-5 mt-2 space-y-1">
          {data.brokenLinksList.map((link, index) => (
            <li key={index} className="text-destructive break-all">{link}</li>
          ))}
        </ul>
      )}
      */}
    </div>
  );
};

export default BrokenLinksAccordionContent;
