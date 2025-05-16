
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

// On-Page Content Components
import HeadingsAccordionContent from './headings-accordion-content';
import ContentAnalysisAccordionContent from './content-analysis-accordion-content';
import AltAttributeAccordionContent from './alt-attribute-accordion-content';
import InPageLinksAccordionContent from './inpage-links-accordion-content';

// Indexing Content Components
import WebFeedsAccordionContent from './webfeeds-accordion-content';
import UrlResolveAccordionContent from './url-resolve-accordion-content';
import RobotsTxtAccordionContent from './robotstxt-accordion-content';
import XmlSitemapAccordionContent from './xmlsitemap-accordion-content';
import SitemapsValidityAccordionContent from './sitemaps-validity-accordion-content';
import UrlParametersAccordionContent from './url-parameters-accordion-content';

// Technical SEO Content Components
import RobotsTagsAccordionContent from './robots-tags-accordion-content';
import IndexFollowAccordionContent from './index-follow-accordion-content';
import HreflangTagsAccordionContent from './hreflang-tags-accordion-content';
import BrokenLinksAccordionContent from './broken-links-accordion-content';
import UnderscoresInUrlsAccordionContent from './underscores-in-urls-accordion-content';
import DiscoveredPagesAccordionContent from './discovered-pages-accordion-content';

// Mobile Content Components
import MobileFriendlinessAccordionContent from './mobile-friendliness-accordion-content';
import MobileRenderingAccordionContent from './mobile-rendering-accordion-content';
import TapTargetsAccordionContent from './tap-targets-accordion-content';

// Structured Data Content Components
import SchemaOrgAccordionContent from './schemaorg-accordion-content';
import OpenGraphAccordionContent from './opengraph-accordion-content';
import TwitterCardAccordionContent from './twitter-card-accordion-content'; // New

// Microformats Content Component
import MicroformatsAccordionContent from './microformats-accordion-content'; // New

// Security Content Components
import EmailPrivacyAccordionContent from './email-privacy-accordion-content'; // New
import DmarcAccordionContent from './dmarc-accordion-content'; // New
import SslSecureAccordionContent from './ssl-secure-accordion-content'; // New
import MixedContentAccordionContent from './mixed-content-accordion-content'; // New

// Performance Content Components
import AssetMinificationAccordionContent from './asset-minification-accordion-content'; // New


const ReportAccordionItem: React.FC<OnPageItem> = ({
  id,
  icon: IconComponent,
  title,
  statusText,
  statusColorClass,
  badgeVariant = "outline",
  content, 
  details,
  // On-Page data
  googleDesktopPreview,
  googleMobilePreview,
  headingsAnalysis,
  contentAnalysisData,
  altAttributeAnalysis,
  inPageLinksAnalysis,
  // Indexing data
  webFeedsData,
  urlResolveData,
  robotsTxtData,
  xmlSitemapData,
  sitemapValidityData,
  urlParametersData,
  // Technical SEO data
  robotsTagsData,
  indexFollowData,
  hreflangTagsData,
  brokenLinksData,
  underscoresInUrlsData,
  discoveredPagesData,
  // Mobile data
  mobileFriendlinessData,
  mobileRenderingData,
  tapTargetsData,
  // Structured Data
  schemaOrgData,
  openGraphData,
  twitterCardData, // New
  // Microformats
  microformatsData, // New
  // Security
  emailPrivacyData, // New
  dmarcData, // New
  sslSecureData, // New
  mixedContentData, // New
  // Performance
  assetMinificationData, // New
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
      // --- ON-PAGE ---
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
            {(!googleDesktopPreview && !googleMobilePreview) && <p>No Google Preview data available.</p>}
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
      
      // --- INDEXING ---
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

      // --- TECHNICAL SEO ---
      case 'robotsTags':
        return robotsTagsData ? <RobotsTagsAccordionContent data={robotsTagsData} /> : <p>No Robots Tags data available.</p>;
      case 'indexFollow':
        return indexFollowData ? <IndexFollowAccordionContent data={indexFollowData} /> : <p>No Index/Follow data available.</p>;
      case 'hreflangTags':
        return hreflangTagsData ? <HreflangTagsAccordionContent data={hreflangTagsData} /> : <p>No Hreflang Tags data available.</p>;
      case 'brokenLinks':
        return brokenLinksData ? <BrokenLinksAccordionContent data={brokenLinksData} /> : <p>No Broken Links data available.</p>;
      case 'underscoresInUrls':
        return underscoresInUrlsData ? <UnderscoresInUrlsAccordionContent data={underscoresInUrlsData} /> : <p>No Underscores in URLs data available.</p>;
      case 'discoveredPages':
        return discoveredPagesData ? <DiscoveredPagesAccordionContent data={discoveredPagesData} /> : <p>No Discovered Pages data available.</p>;

      // --- MOBILE ---
      case 'mobileFriendliness':
        return mobileFriendlinessData ? <MobileFriendlinessAccordionContent data={mobileFriendlinessData} /> : <p>No Mobile Friendliness data available.</p>;
      case 'mobileRendering':
        return mobileRenderingData ? <MobileRenderingAccordionContent data={mobileRenderingData} /> : <p>No Mobile Rendering data available.</p>;
      case 'tapTargets':
        return tapTargetsData ? <TapTargetsAccordionContent data={tapTargetsData} /> : <p>No Tap Targets data available.</p>;

      // --- STRUCTURED DATA ---
      case 'schemaOrg':
        return schemaOrgData ? <SchemaOrgAccordionContent data={schemaOrgData} /> : <p>No Schema.org data available.</p>;
      case 'openGraphProtocol':
        return openGraphData ? <OpenGraphAccordionContent data={openGraphData} /> : <p>No Open Graph Protocol data available.</p>;
      case 'twitterCard':
        return twitterCardData ? <TwitterCardAccordionContent data={twitterCardData} /> : <p>No Twitter Card data available.</p>;

      // --- MICROFORMATS ---
      case 'microformats':
        return microformatsData ? <MicroformatsAccordionContent data={microformatsData} /> : <p>No Microformats data available.</p>;
      
      // --- SECURITY ---
      case 'emailPrivacy':
        return emailPrivacyData ? <EmailPrivacyAccordionContent data={emailPrivacyData} /> : <p>No Email Privacy data available.</p>;
      case 'dmarc':
        return dmarcData ? <DmarcAccordionContent data={dmarcData} /> : <p>No DMARC data available.</p>;
      case 'sslSecure':
        return sslSecureData ? <SslSecureAccordionContent data={sslSecureData} /> : <p>No SSL Secure data available.</p>;
      case 'mixedContent':
        return mixedContentData ? <MixedContentAccordionContent data={mixedContentData} /> : <p>No Mixed Content data available.</p>;

      // --- PERFORMANCE ---
      case 'assetMinification':
        return assetMinificationData ? <AssetMinificationAccordionContent data={assetMinificationData} /> : <p>No Asset Minification data available.</p>;

      default:
        return typeof content === 'string' ? <p>{content}</p> : <p>No specific content view for this item (ID: {id}).</p>;
    }
  };

  return (
    <AccordionItem value={title} className="border-b border-border last:border-b-0">
      <AccordionTrigger className="py-3 px-2 hover:bg-muted/50 rounded-t-md text-sm font-medium">
        <div className="flex items-center space-x-3 flex-1">
          <IconComponent className={`h-5 w-5 ${statusColorClass || 'text-muted-foreground'}`} />
          <span>{title}</span>
          <div className="flex items-center space-x-1 ml-auto mr-2">
            {Array(3).fill(0).map((_, i) => (
              <Circle key={i} className={`h-1.5 w-1.5 ${ i === 0 ? (statusColorClass || 'text-gray-300 dark:text-gray-600') : 'text-gray-300 dark:text-gray-600'} fill-current`} />
            ))}
          </div>
          <Badge 
            variant={effectiveBadgeVariant} 
            className={`text-xs px-2 py-0.5 ${statusColorClass === 'text-warning' && effectiveBadgeVariant === 'default' ? 'bg-warning/20 text-yellow-700 border-warning' : ''} ${(statusColorClass || '').includes('text-muted') ? 'bg-muted text-muted-foreground' : ''}`}
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

