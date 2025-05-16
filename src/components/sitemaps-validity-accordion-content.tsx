
'use client';

import React from 'react';
import type { SitemapValidityAnalysis } from '@/lib/types';
import { CheckCircle2, XCircle, AlertTriangle, Info } from 'lucide-react'; // Added Info for 'check' type

interface SitemapsValidityAccordionContentProps {
  data: SitemapValidityAnalysis;
}

const SitemapsValidityAccordionContent: React.FC<SitemapsValidityAccordionContentProps> = ({ data }) => {
  const { sitemapUrl, summary, checks } = data;

  const getIconForCheckType = (type: 'check' | 'issue' | 'positive') => {
    switch (type) {
      case 'positive':
        return <CheckCircle2 className="h-4 w-4 text-accent mr-2 shrink-0" />;
      case 'issue':
        return <XCircle className="h-4 w-4 text-destructive mr-2 shrink-0" />;
      case 'check':
      default:
        return <Info className="h-4 w-4 text-muted-foreground mr-2 shrink-0" />;
    }
  };
  
  const getTextColorForCheckType = (type: 'check' | 'issue' | 'positive') => {
     switch (type) {
      case 'positive':
        return "text-accent";
      case 'issue':
        return "text-destructive";
      case 'check':
      default:
        return "text-muted-foreground";
    }
  }

  return (
    <div className="space-y-3 text-sm">
      {sitemapUrl && (
        <p>
          <strong>Sitemap being validated:</strong>{' '}
          <a href={sitemapUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline break-all">
            {sitemapUrl}
          </a>
        </p>
      )}
      {summary && <p className="text-muted-foreground mb-3">{summary}</p>}

      {checks && checks.length > 0 ? (
        <div className="space-y-2">
          <h4 className="font-semibold text-foreground mb-1">Validity Checks & Issues:</h4>
          <ul className="space-y-1.5">
            {checks.map((item, index) => (
              <li key={index} className={`flex items-start ${getTextColorForCheckType(item.type)}`}>
                {getIconForCheckType(item.type)}
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-muted-foreground">No sitemap validity details available.</p>
      )}
    </div>
  );
};

export default SitemapsValidityAccordionContent;
