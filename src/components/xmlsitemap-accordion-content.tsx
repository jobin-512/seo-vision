
'use client';

import React from 'react';
import type { XmlSitemapAnalysis } from '@/lib/types';

interface XmlSitemapAccordionContentProps {
  data: XmlSitemapAnalysis;
}

const XmlSitemapAccordionContent: React.FC<XmlSitemapAccordionContentProps> = ({ data }) => {
  const { sitemapUrl, details } = data;

  return (
    <div className="space-y-2 text-sm">
      {sitemapUrl ? (
        <p>
          <strong>XML Sitemap found at:</strong>{' '}
          <a href={sitemapUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline break-all">
            {sitemapUrl}
          </a>
        </p>
      ) : (
        <p className="text-muted-foreground">No XML sitemap URL provided or found.</p>
      )}
      {details && <p className="text-muted-foreground italic">{details}</p>}
       {!sitemapUrl && !details && <p className="text-muted-foreground">No XML sitemap information available.</p>}
    </div>
  );
};

export default XmlSitemapAccordionContent;
