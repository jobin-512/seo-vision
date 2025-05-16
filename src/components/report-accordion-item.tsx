
'use client';

import React from 'react';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import GooglePreviewCard from './google-preview-card';
import type { OnPageItem } from '@/lib/types';
import { Circle } from 'lucide-react';
import HeadingsAccordionContent from './headings-accordion-content';
import ContentAnalysisAccordionContent from './content-analysis-accordion-content';
import AltAttributeAccordionContent from './alt-attribute-accordion-content';
import InPageLinksAccordionContent from './inpage-links-accordion-content';
// Import new Indexing content components
import WebFeedsAccordionContent from './webfeeds-accordion-content';
import UrlResolveAccordionContent from './url-resolve-accordion-content';
import RobotsTxtAccordionContent from './robotstxt-accordion-content';
import XmlSitemapAccordionContent from './xmlsitemap-accordion-content';
import SitemapsValidityAccordionContent from './sitemaps-validity-accordion-content';
import UrlParametersAccordionContent from './url-parameters-accordion-content';


const ReportAccordionItem: React.FC<OnPageItem> = ({
  id,
  icon: IconComponent,
  title,
  statusText,
  statusColorClass,
  badgeVariant = "outline",
  content, 
  details,
  googleDesktopPreview,
  googleMobilePreview,
  headingsAnalysis,
  contentAnalysisData,
  altAttributeAnalysis,
  inPageLinksAnalysis,
  // Indexing data props
  webFeedsData,
  urlResolveData,
  robotsTxtData,
  xmlSitemapData,
  sitemapValidityData,
  urlParametersData,
}) => {
  let effectiveBadgeVariant = badgeVariant;
  if (statusColorClass.includes('text-accent')) {
    effectiveBadgeVariant = 'default'; 
  } else if (statusColorClass.includes('text-warning')) {
    effectiveBadgeVariant = 'default'; 
  } else if (statusColorClass.includes('text-destructive')) {
    effectiveBadgeVariant = 'destructive';
  }

  const renderContent = () => {
    switch (id) {
      // On-Page Sections
      case 'titleTag':
      case 'metaDescription':
        return (
          <>
            {typeof content === 'string' ? <p className="mb-2">{content}</p> : content}
            {details && <p className="text-xs text-muted-foreground mb-2">{details}</p>}
          </>
        );
      case 'googlePreview':
        return (
          <>
            {googleDesktopPreview && (
              <div className="mb-4">
                <h4 className="font-semibold text-xs uppercase text-muted-foreground mb-2">Desktop Version</h4>
                <GooglePreviewCard type="Desktop" {...googleDesktopPreview} />
              </div>
            )}
            {googleMobilePreview && (
              <div>
                <h4 className="font-semibold text-xs uppercase text-muted-foreground mb-2">Mobile Version</h4>
                <GooglePreviewCard type="Mobile" {...googleMobilePreview} />
              </div>
            )}
          </>
        );
      case 'headings':
        return headingsAnalysis ? <HeadingsAccordionContent data={headingsAnalysis} /> : <p>No heading data available.</p>;
      case 'contentAnalysis':
        return contentAnalysisData ? <ContentAnalysisAccordionContent data={contentAnalysisData} /> : <p>No content analysis data available.</p>;
      case 'altAttributes':
        return altAttributeAnalysis ? <AltAttributeAccordionContent data={altAttributeAnalysis} /> : <p>No alt attribute data available.</p>;
      case 'inPageLinks':
        return inPageLinksAnalysis ? <InPageLinksAccordionContent data={inPageLinksAnalysis} /> : <p>No in-page link data available.</p>;
      
      // Indexing Sections
      case 'webFeeds':
        return webFeedsData ? <WebFeedsAccordionContent data={webFeedsData} /> : <p>No web feeds data available.</p>;
      case 'urlResolve':
        return urlResolveData ? <UrlResolveAccordionContent data={urlResolveData} /> : <p>No URL resolve data available.</p>;
      case 'robotsTxt':
        return robotsTxtData ? <RobotsTxtAccordionContent data={robotsTxtData} /> : <p>No robots.txt data available.</p>;
      case 'xmlSitemap':
        return xmlSitemapData ? <XmlSitemapAccordionContent data={xmlSitemapData} /> : <p>No XML sitemap data available.</p>;
      case 'sitemapValidity':
        return sitemapValidityData ? <SitemapsValidityAccordionContent data={sitemapValidityData} /> : <p>No sitemap validity data available.</p>;
      case 'urlParameters':
        return urlParametersData ? <UrlParametersAccordionContent data={urlParametersData} /> : <p>No URL parameters data available.</p>;
      default:
        return typeof content === 'string' ? <p>{content}</p> : <p>No specific content view for this item.</p>;
    }
  };

  return (
    <AccordionItem value={title} className="border-b border-border last:border-b-0">
      <AccordionTrigger className="py-3 px-2 hover:bg-muted/50 rounded-t-md text-sm font-medium">
        <div className="flex items-center space-x-3 flex-1">
          <IconComponent className={`h-5 w-5 ${statusColorClass}`} />
          <span>{title}</span>
          <div className="flex items-center space-x-1 ml-auto mr-2">
            {Array(3).fill(0).map((_, i) => (
              <Circle key={i} className={`h-1.5 w-1.5 ${ i === 0 ? statusColorClass : 'text-gray-300 dark:text-gray-600'} fill-current`} />
            ))}
          </div>
          <Badge 
            variant={effectiveBadgeVariant} 
            className={`text-xs px-2 py-0.5 ${statusColorClass === 'text-warning' && effectiveBadgeVariant === 'default' ? 'bg-warning/20 text-yellow-700 border-warning' : ''} ${statusColorClass.includes('text-muted') ? 'bg-muted text-muted-foreground' : ''}`}
          >
            {statusText}
          </Badge>
        </div>
      </AccordionTrigger>
      <AccordionContent className="py-4 px-3 text-sm bg-background rounded-b-md">
        {renderContent()}
      </AccordionContent>
    </AccordionItem>
  );
};

export default ReportAccordionItem;

