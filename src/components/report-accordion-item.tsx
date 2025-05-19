
'use client';

import React from 'react';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import GooglePreviewCard from '@/components/google-preview-card';
import type { OnPageItem } from '@/lib/types';
import { Circle } from 'lucide-react';

// On-Page Content Components
import HeadingsAccordionContent from '@/components/headings-accordion-content';
import ContentAnalysisAccordionContent from '@/components/content-analysis-accordion-content';
import AltAttributeAccordionContent from '@/components/alt-attribute-accordion-content';
import InPageLinksAccordionContent from '@/components/inpage-links-accordion-content';

// Indexing Content Components
import WebFeedsAccordionContent from '@/components/webfeeds-accordion-content';
import UrlResolveAccordionContent from '@/components/url-resolve-accordion-content';
import RobotsTxtAccordionContent from '@/components/robotstxt-accordion-content';
import XmlSitemapAccordionContent from '@/components/xmlsitemap-accordion-content';
import SitemapsValidityAccordionContent from '@/components/sitemaps-validity-accordion-content';
import UrlParametersAccordionContent from '@/components/url-parameters-accordion-content';

// Technical SEO Content Components
import RobotsTagsAccordionContent from '@/components/robots-tags-accordion-content';
import IndexFollowAccordionContent from '@/components/index-follow-accordion-content';
import HreflangTagsAccordionContent from '@/components/hreflang-tags-accordion-content';
import BrokenLinksAccordionContent from '@/components/broken-links-accordion-content';
import UnderscoresInUrlsAccordionContent from '@/components/underscores-in-urls-accordion-content';
import DiscoveredPagesAccordionContent from '@/components/discovered-pages-accordion-content';

// Mobile Content Components
import MobileFriendlinessAccordionContent from '@/components/mobile-friendliness-accordion-content';
import MobileRenderingAccordionContent from '@/components/mobile-rendering-accordion-content';
import TapTargetsAccordionContent from '@/components/tap-targets-accordion-content';

// Structured Data Content Components
import SchemaOrgAccordionContent from '@/components/schemaorg-accordion-content';
import OpenGraphAccordionContent from '@/components/opengraph-accordion-content';
import TwitterCardAccordionContent from '@/components/twitter-card-accordion-content'; 

// Microformats Content Component
import MicroformatsAccordionContent from '@/components/microformats-accordion-content'; 

// Security Content Components
import EmailPrivacyAccordionContent from '@/components/email-privacy-accordion-content'; 
import DmarcAccordionContent from '@/components/dmarc-accordion-content'; 
import SslSecureAccordionContent from '@/components/ssl-secure-accordion-content'; 
import MixedContentAccordionContent from '@/components/mixed-content-accordion-content'; 

// Performance Content Components
import AssetMinificationAccordionContent from '@/components/asset-minification-accordion-content'; 

// Accessibility Content Components
import ContrastAccordionContent from '@/components/contrast-accordion-content'; 
import NavigationAccordionContent from '@/components/navigation-accordion-content';

// Technologies, Analytics, Doctype, Encoding Components
import TechnologiesAccordionContent from '@/components/technologies-accordion-content';
import AnalyticsAccordionContent from '@/components/analytics-accordion-content';
import DoctypeAccordionContent from '@/components/doctype-accordion-content';
import EncodingAccordionContent from '@/components/encoding-accordion-content';

// Branding Components
import UrlAccordionContent from '@/components/url-accordion-content';
import FaviconAccordionContent from '@/components/favicon-accordion-content';
import Custom404PageAccordionContent from '@/components/custom-404-page-accordion-content';

// Domain Components
import DomainRegistrationAccordionContent from '@/components/domain-registration-accordion-content';
import DomainAvailabilityAccordionContent from '@/components/domain-availability-accordion-content';

// Off-Page Components
import BacklinksScoreAccordionContent from '@/components/backlinks-score-accordion-content';
import BacklinksCounterAccordionContent from '@/components/backlinks-counter-accordion-content';
import ReferringDomainsAccordionContent from '@/components/referring-domains-accordion-content';

// Traffic Report Components
import TrafficEstimationsAccordionContent from '@/components/traffic-estimations-accordion-content';
import TrafficRankAccordionContent from '@/components/traffic-rank-accordion-content';

// Local SEO Components
import LocalDirectoriesAccordionContent from '@/components/local-directories-accordion-content';
import OnlineReviewsAccordionContent from '@/components/online-reviews-accordion-content';

// Social Media Components
import DiscoveredProfilesAccordionContent from '@/components/discovered-profiles-accordion-content';
import SocialAccountAccordionContent from '@/components/social-account-accordion-content';
import SocialMediaEngagementAccordionContent from '@/components/social-media-engagement-accordion-content';


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
  // Off-Page
  backlinksScoreData,
  backlinksCounterData,
  referringDomainsData,
  // Traffic Report
  trafficEstimationsData,
  trafficRankData,
  // Local SEO
  localDirectoriesData,
  onlineReviewsData,
  // Social Media
  discoveredProfilesData,
  socialAccountData,
  socialEngagementData,
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
      
      // --- OFF-PAGE ---
      case 'backlinksScore':
        return backlinksScoreData ? <BacklinksScoreAccordionContent data={backlinksScoreData} /> : <p>No Backlinks Score data available.</p>;
      case 'backlinksCounter':
        return backlinksCounterData ? <BacklinksCounterAccordionContent data={backlinksCounterData} /> : <p>No Backlinks Counter data available.</p>;
      case 'referringDomains':
        return referringDomainsData ? <ReferringDomainsAccordionContent data={referringDomainsData} /> : <p>No Referring Domains data available.</p>;

      // --- TRAFFIC REPORT ---
      case 'trafficEstimations':
        return trafficEstimationsData ? <TrafficEstimationsAccordionContent data={trafficEstimationsData} /> : <p>No Traffic Estimations data available.</p>;
      case 'trafficRank':
        return trafficRankData ? <TrafficRankAccordionContent data={trafficRankData} /> : <p>No Traffic Rank data available.</p>;

      // --- LOCAL SEO ---
      case 'localDirectories':
        return localDirectoriesData ? <LocalDirectoriesAccordionContent data={localDirectoriesData} /> : <p>No Local Directories data available.</p>;
      case 'onlineReviews':
        return onlineReviewsData ? <OnlineReviewsAccordionContent data={onlineReviewsData} /> : <p>No Online Reviews data available.</p>;

      // --- SOCIAL MEDIA ---
      case 'discoveredProfiles':
        return discoveredProfilesData ? <DiscoveredProfilesAccordionContent data={discoveredProfilesData} /> : <p>No Discovered Profiles data available.</p>;
      case 'facebookPage':
      case 'twitterAccount':
      case 'instagramAccount':
      case 'linkedinAccount':
        return socialAccountData ? <SocialAccountAccordionContent data={socialAccountData} /> : <p>No Social Account data available.</p>;
      case 'socialMediaEngagement':
        return socialEngagementData ? <SocialMediaEngagementAccordionContent data={socialEngagementData} /> : <p>No Social Media Engagement data available.</p>;

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
            {/* Visual cue for status, could be dynamic based on overall health of the item */}
            {Array(3).fill(0).map((_, i) => (
              <Circle key={i} className={`h-1.5 w-1.5 ${ i === 0 ? (statusColorClass || 'text-gray-300 dark:text-gray-600') : 'text-gray-300 dark:text-gray-600'} fill-current`} />
            ))}
          </div>
          <Badge 
            variant={effectiveBadgeVariant} 
            className={`text-xs px-2 py-0.5 
                        ${statusColorClass === 'text-warning' && effectiveBadgeVariant === 'default' ? 'bg-yellow-500/20 text-yellow-700 border-yellow-500 dark:text-yellow-400 dark:border-yellow-500/70' : ''} 
                        ${(statusColorClass || '').includes('text-muted') ? 'bg-muted text-muted-foreground' : ''} 
                        ${statusColorClass === 'text-accent' && effectiveBadgeVariant === 'default' ? 'bg-accent/20 text-accent border-accent/50' : ''}
                        ${statusColorClass === 'text-destructive' && effectiveBadgeVariant === 'destructive' ? 'bg-destructive/20 text-destructive border-destructive/50' : ''}
                       `}
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

