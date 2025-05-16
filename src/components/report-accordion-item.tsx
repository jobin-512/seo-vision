
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
import TwitterCardAccordionContent from './twitter-card-accordion-content'; 

// Microformats Content Component
import MicroformatsAccordionContent from './microformats-accordion-content'; 

// Security Content Components
import EmailPrivacyAccordionContent from './email-privacy-accordion-content'; 
import DmarcAccordionContent from './dmarc-accordion-content'; 
import SslSecureAccordionContent from './ssl-secure-accordion-content'; 
import MixedContentAccordionContent from './mixed-content-accordion-content'; 

// Performance Content Components
import AssetMinificationAccordionContent from './asset-minification-accordion-content'; 

// Accessibility Content Components
import ContrastAccordionContent from './contrast-accordion-content';
import NavigationAccordionContent from './navigation-accordion-content';

// Technologies, Analytics, Doctype, Encoding Components
import TechnologiesAccordionContent from './technologies-accordion-content';
import AnalyticsAccordionContent from './analytics-accordion-content';
import DoctypeAccordionContent from './doctype-accordion-content';
import EncodingAccordionContent from './encoding-accordion-content';

// Branding Components
import UrlAccordionContent from './url-accordion-content';
import FaviconAccordionContent from './favicon-accordion-content';
import Custom404PageAccordionContent from './custom-404-page-accordion-content';

// Domain Components
import DomainRegistrationAccordionContent from './domain-registration-accordion-content';
import DomainAvailabilityAccordionContent from './domain-availability-accordion-content';


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
  twitterCardData, 
  // Microformats
  microformatsData, 
  // Security
  emailPrivacyData, 
  dmarcData, 
  sslSecureData, 
  mixedContentData, 
  // Performance
  assetMinificationData, 
  // Accessibility
  contrastData,
  navigationData,
  // Technologies, Analytics, Doctype, Encoding
  technologiesData,
  analyticsData,
  doctypeData,
  encodingData,
  // Branding
  urlAnalysisData,
  faviconAnalysisData,
  custom404PageData,
  // Domain
  domainRegistrationData,
  domainAvailabilityData,
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

      // --- ACCESSIBILITY ---
      case 'contrast':
        return contrastData ? <ContrastAccordionContent data={contrastData} /> : <p>No Contrast data available.</p>;
      case 'navigation':
        return navigationData ? <NavigationAccordionContent data={navigationData} /> : <p>No Navigation data available.</p>;
      
      // --- TECHNOLOGIES, ANALYTICS, DOCTYPE, ENCODING ---
      case 'technologies':
        return technologiesData ? <TechnologiesAccordionContent data={technologiesData} /> : <p>No Technologies data available.</p>;
      case 'analytics':
        return analyticsData ? <AnalyticsAccordionContent data={analyticsData} /> : <p>No Analytics data available.</p>;
      case 'doctype':
        return doctypeData ? <DoctypeAccordionContent data={doctypeData} /> : <p>No Doctype data available.</p>;
      case 'encoding':
        return encodingData ? <EncodingAccordionContent data={encodingData} /> : <p>No Encoding data available.</p>;

      // --- BRANDING ---
      case 'url':
        return urlAnalysisData ? <UrlAccordionContent data={urlAnalysisData} /> : <p>No URL data available.</p>;
      case 'favicon':
        return faviconAnalysisData ? <FaviconAccordionContent data={faviconAnalysisData} /> : <p>No Favicon data available.</p>;
      case 'custom404':
        return custom404PageData ? <Custom404PageAccordionContent data={custom404PageData} /> : <p>No Custom 404 Page data available.</p>;
      
      // --- DOMAIN ---
      case 'domainRegistration':
        return domainRegistrationData ? <DomainRegistrationAccordionContent data={domainRegistrationData} /> : <p>No Domain Registration data available.</p>;
      case 'domainAvailability':
        return domainAvailabilityData ? <DomainAvailabilityAccordionContent data={domainAvailabilityData} /> : <p>No Domain Availability data available.</p>;

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
            className={`text-xs px-2 py-0.5 ${statusColorClass === 'text-warning' && effectiveBadgeVariant === 'default' ? 'bg-yellow-500/20 text-yellow-700 border-yellow-500' : ''} ${(statusColorClass || '').includes('text-muted') ? 'bg-muted text-muted-foreground' : ''} ${statusColorClass === 'text-warning' ? '!bg-yellow-500/20 !text-yellow-700 !border-yellow-500/50' : ''}`}
          >
            {statusText}
          </Badge>
        </div>
      </AccordionTrigger>
      <AccordionContent className="py-4 px-3 text-sm bg-card/50 dark:bg-background rounded-b-md">
        {renderContent()}
      </AccordionContent>
    </AccordionItem>
  );
};

export default ReportAccordionItem;


    