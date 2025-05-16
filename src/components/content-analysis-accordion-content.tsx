
'use client';

import React from 'react';
import type { ContentAnalysis } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

interface ContentAnalysisAccordionContentProps {
  data: ContentAnalysis;
}

const ContentAnalysisAccordionContent: React.FC<ContentAnalysisAccordionContentProps> = ({ data }) => {
  const { keywords } = data;

  if (!keywords || keywords.length === 0) {
    return <p className="text-sm text-muted-foreground">No keywords to display.</p>;
  }

  return (
    <div>
      <h4 className="font-semibold text-sm mb-3 text-foreground">Keywords & Keyphrases:</h4>
      <div className="flex flex-wrap gap-2">
        {keywords.map((item, index) => (
          <Badge key={index} variant="secondary" className="py-1 px-2 text-xs">
            {item.keyword} <span className="ml-1.5 bg-primary text-primary-foreground rounded-full px-1.5 text-[10px] font-mono">{item.count}</span>
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default ContentAnalysisAccordionContent;
