
'use client';

import * as React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { 
  generateSeoReport, 
  // On-Page types
  type OnPageDetailItem as AiOnPageDetailItem,
  type HeadingsAnalysis as AiHeadingsAnalysisType,
  type ContentAnalysis as AiContentAnalysisType,
  type AltAttributeAnalysis as AiAltAttributeAnalysisType,
  type InPageLinksAnalysis as AiInPageLinksAnalysisType,
  // Indexing types
  type IndexingAnalysis as AiIndexingAnalysisType,
  type WebFeedsAnalysis as AiWebFeedsAnalysisType,
  type UrlResolveAnalysis as AiUrlResolveAnalysisType,
  type RobotsTxtAnalysis as AiRobotsTxtAnalysisType,
  type XmlSitemapAnalysis as AiXmlSitemapAnalysisType,
  type SitemapValidityAnalysis as AiSitemapValidityAnalysisType,
  type UrlParametersAnalysis as AiUrlParametersAnalysisType,
  // Technical SEO types
  type TechnicalSeoAnalysis as AiTechnicalSeoAnalysisType,
  type RobotsTagsAnalysis as AiRobotsTagsAnalysisType,
  type IndexFollowAnalysis as AiIndexFollowAnalysisType,
  type HreflangTagsAnalysis as AiHreflangTagsAnalysisType,
  type BrokenLinksAnalysis as AiBrokenLinksAnalysisType,
  type UnderscoresInUrlsAnalysis as AiUnderscoresInUrlsAnalysisType,
  type DiscoveredPagesAnalysis as AiDiscoveredPagesAnalysisType,
  // Mobile types
  type MobileAnalysis as AiMobileAnalysisType,
  type MobileFriendlinessAnalysis as AiMobileFriendlinessAnalysisType,
  type MobileRenderingAnalysis as AiMobileRenderingAnalysisType,
  type TapTargetsAnalysis as AiTapTargetsAnalysisType,
  // Structured Data types
  type StructuredDataAnalysis as AiStructuredDataAnalysisType,
  type SchemaOrgAnalysis as AiSchemaOrgAnalysisType,
  type OpenGraphAnalysis as AiOpenGraphAnalysisType,
  type TwitterCardAnalysis as AiTwitterCardAnalysisType,
  // Microformats types
  type MicroformatsAnalysis as AiMicroformatsAnalysisType,
  // Security types
  type SecurityAnalysis as AiSecurityAnalysisType,
  type EmailPrivacyAnalysis as AiEmailPrivacyAnalysisType,
  type DmarcAnalysis as AiDmarcAnalysisType,
  type SslSecureAnalysis as AiSslSecureAnalysisType,
  type MixedContentAnalysis as AiMixedContentAnalysisType,
  // Performance types
  type PerformanceAnalysis as AiPerformanceAnalysisType,
  type AssetMinificationAnalysis as AiAssetMinificationAnalysisType,
  // Accessibility types
  type AccessibilityAnalysis as AiAccessibilityAnalysisType,
  type ContrastAnalysis as AiContrastAnalysisType,
  type NavigationAnalysis as AiNavigationAnalysisType,
  // Technologies, Analytics, Doctype, Encoding
  type TechnologiesAnalysis as AiTechnologiesAnalysisType,
  type AnalyticsAnalysis as AiAnalyticsAnalysisType,
  type DoctypeAnalysis as AiDoctypeAnalysisType,
  type EncodingAnalysis as AiEncodingAnalysisType,
  // Branding
  type BrandingAnalysis as AiBrandingAnalysisType,
  type UrlAnalysis as AiUrlAnalysisType,
  type FaviconAnalysis as AiFaviconAnalysisType,
  type Custom404PageAnalysis as AiCustom404PageAnalysisType,
  // Domain
  type DomainAnalysis as AiDomainAnalysisType,
  type DomainRegistrationAnalysis as AiDomainRegistrationAnalysisType,
  type DomainAvailabilityAnalysis as AiDomainAvailabilityAnalysisType,
  // Off-Page
  type OffPageAnalysis as AiOffPageAnalysisType,
  type BacklinksScore as AiBacklinksScoreType,
  type BacklinksCounter as AiBacklinksCounterType,
  type ReferringDomains as AiReferringDomainsType,
  // Traffic Report
  type TrafficReportAnalysis as AiTrafficReportAnalysisType,
  type TrafficEstimations as AiTrafficEstimationsType,
  type TrafficRank as AiTrafficRankType,
  // Local SEO
  type LocalSeoAnalysis as AiLocalSeoAnalysisType,
  type LocalDirectories as AiLocalDirectoriesType,
  type OnlineReviews as AiOnlineReviewsType,
  // Social Media
  type SocialMediaAnalysis as AiSocialMediaAnalysisType,
  type DiscoveredProfiles as AiDiscoveredProfilesType,
  type SocialAccountDetails as AiSocialAccountDetailsType,
  type SocialMediaEngagement as AiSocialMediaEngagementType,
} from '@/ai/flows/generate-seo-report';

import type { 
  ReportData, 
  OnPageItem, 
  GooglePreviewData, 
  HeadingsAnalysis, 
  ContentAnalysis, 
  AltAttributeAnalysis, 
  InPageLinksAnalysis,
  WebFeedsAnalysis,
  UrlResolveAnalysis,
  RobotsTxtAnalysis,
  XmlSitemapAnalysis,
  SitemapValidityAnalysis,
  UrlParametersAnalysis,
  // Technical SEO
  RobotsTagsAnalysis,
  IndexFollowAnalysis,
  HreflangTagsAnalysis,
  BrokenLinksAnalysis,
  UnderscoresInUrlsAnalysis,
  DiscoveredPagesAnalysis,
  // Mobile
  MobileFriendlinessAnalysis,
  MobileRenderingAnalysis,
  TapTargetsAnalysis,
  // Structured Data
  SchemaOrgAnalysis,
  OpenGraphAnalysis,
  TwitterCardAnalysis,
  // Microformats
  MicroformatsAnalysis,
  // Security
  EmailPrivacyAnalysis,
  DmarcAnalysis,
  SslSecureAnalysis,
  MixedContentAnalysis,
  // Performance
  AssetMinificationAnalysis,
  // Accessibility
  ContrastAnalysis,
  NavigationAnalysis,
  // Technologies, Analytics, Doctype, Encoding
  TechnologiesAnalysis,
  AnalyticsAnalysis,
  DoctypeAnalysis,
  EncodingAnalysis,
  // Branding
  UrlAnalysis,
  FaviconAnalysis,
  Custom404PageAnalysis,
  // Domain
  DomainRegistrationAnalysis,
  DomainAvailabilityAnalysis,
  // Off-Page
  BacklinksScore,
  BacklinksCounter,
  ReferringDomains,
  // Traffic Report
  TrafficEstimations,
  TrafficRank,
  // Local SEO
  LocalDirectories,
  OnlineReviews,
  // Social Media
  DiscoveredProfiles,
  SocialAccountDetails,
  SocialMediaEngagement,
} from '@/lib/types';

import { useToast } from "@/hooks/use-toast";
import { 
  LoaderCircle, AlertTriangle, CheckCircle2, Info, FileText, BookOpen, Heading1, 
  FileSearch2, ImageIcon, Link as LinkIcon, Rss, Network, FileCode, ListChecks, Link2 as Link2Icon,
  Tags, Target, Languages, Unlink, DraftingCompass, FileStack, Smartphone, TabletSmartphone, MousePointerClick,
  Binary, Share2, Twitter, Code2 as MicroformatsIcon, ShieldAlert, MailWarning, ShieldCheck as DmarcIcon, Lock, Blend, Gauge,
  Contrast as ContrastIcon, Navigation as NavigationIcon, Cpu, AreaChart, FileBadge, Globe, CalendarDays, FileQuestion,
  Award, TrendingUp, Users, BarChartHorizontal, MapPin, MessageSquare, Activity,
  Facebook, Instagram, Linkedin, ThumbsUp, MessageCircle as MessageCircleIcon, Search // New Social Media Icons
} from 'lucide-react';

import ReportHeaderCard from '@/components/report-header-card';
import ReportFilters from '@/components/report-filters';
import ReportAccordionSection from '@/components/report-accordion-section';

const formSchema = z.object({
  url: z.string().url({ message: 'Please enter a valid URL (e.g., https://example.com)' }),
});

type FormValues = z.infer<typeof formSchema>;

// Helper to map various AI data structures to OnPageItem for the accordion
const mapAiDataToAccordionItem = (
  id: string, 
  title: string, 
  icon: React.ElementType, 
  aiData: any, 
  defaultStatusText: string = 'N/A',
  defaultStatusColorClass: string = 'text-muted-foreground'
): OnPageItem => {
  
  let statusText = defaultStatusText;
  let statusColorClass = defaultStatusColorClass;

  if (aiData && typeof aiData === 'object' && 'statusText' in aiData && aiData.statusText) {
    statusText = aiData.statusText;
  }
  if (aiData && typeof aiData === 'object' && 'statusColorClass' in aiData && aiData.statusColorClass) {
    statusColorClass = aiData.statusColorClass;
  }
  
  const item: OnPageItem = {
    id,
    icon,
    title,
    statusText,
    statusColorClass,
    badgeVariant: 'outline',
  };

  // Assign specific data structures based on id
  if (id === 'headings' && aiData) item.headingsAnalysis = aiData as HeadingsAnalysis;
  if (id === 'contentAnalysis' && aiData) item.contentAnalysisData = aiData as ContentAnalysis;
  if (id === 'altAttributes' && aiData) item.altAttributeAnalysis = aiData as AltAttributeAnalysis;
  if (id === 'inPageLinks' && aiData) item.inPageLinksAnalysis = aiData as InPageLinksAnalysis;
  
  if (id === 'webFeeds' && aiData) item.webFeedsData = aiData as WebFeedsAnalysis;
  if (id === 'urlResolve' && aiData) item.urlResolveData = aiData as UrlResolveAnalysis;
  if (id === 'robotsTxt' && aiData) item.robotsTxtData = aiData as RobotsTxtAnalysis;
  if (id === 'xmlSitemap' && aiData) item.xmlSitemapData = aiData as XmlSitemapAnalysis;
  if (id === 'sitemapValidity' && aiData) item.sitemapValidityData = aiData as SitemapValidityAnalysis;
  if (id === 'urlParameters' && aiData) item.urlParametersData = aiData as UrlParametersAnalysis;

  if (id === 'robotsTags' && aiData) item.robotsTagsData = aiData as RobotsTagsAnalysis;
  if (id === 'indexFollow' && aiData) item.indexFollowData = aiData as IndexFollowAnalysis;
  if (id === 'hreflangTags' && aiData) item.hreflangTagsData = aiData as HreflangTagsAnalysis;
  if (id === 'brokenLinks' && aiData) item.brokenLinksData = aiData as BrokenLinksAnalysis;
  if (id === 'underscoresInUrls' && aiData) item.underscoresInUrlsData = aiData as UnderscoresInUrlsAnalysis;
  if (id === 'discoveredPages' && aiData) item.discoveredPagesData = aiData as DiscoveredPagesAnalysis;

  if (id === 'mobileFriendliness' && aiData) item.mobileFriendlinessData = aiData as MobileFriendlinessAnalysis;
  if (id === 'mobileRendering' && aiData) item.mobileRenderingData = aiData as MobileRenderingAnalysis;
  if (id === 'tapTargets' && aiData) item.tapTargetsData = aiData as TapTargetsAnalysis;

  if (id === 'schemaOrg' && aiData) item.schemaOrgData = aiData as SchemaOrgAnalysis;
  if (id === 'openGraphProtocol' && aiData) item.openGraphData = aiData as OpenGraphAnalysis;
  if (id === 'twitterCard' && aiData) item.twitterCardData = aiData as TwitterCardAnalysis;

  if (id === 'microformats' && aiData) item.microformatsData = aiData as MicroformatsAnalysis;
  
  if (id === 'emailPrivacy' && aiData) item.emailPrivacyData = aiData as EmailPrivacyAnalysis;
  if (id === 'dmarc' && aiData) item.dmarcData = aiData as DmarcAnalysis;
  if (id === 'sslSecure' && aiData) item.sslSecureData = aiData as SslSecureAnalysis;
  if (id === 'mixedContent' && aiData) item.mixedContentData = aiData as MixedContentAnalysis;

  if (id === 'assetMinification' && aiData) item.assetMinificationData = aiData as AssetMinificationAnalysis;
  
  if (id === 'contrast' && aiData) item.contrastData = aiData as ContrastAnalysis;
  if (id === 'navigation' && aiData) item.navigationData = aiData as NavigationAnalysis;

  if (id === 'technologies' && aiData) item.technologiesData = aiData as TechnologiesAnalysis;
  if (id === 'analytics' && aiData) item.analyticsData = aiData as AnalyticsAnalysis;
  if (id === 'doctype' && aiData) item.doctypeData = aiData as DoctypeAnalysis;
  if (id === 'encoding' && aiData) item.encodingData = aiData as EncodingAnalysis;

  if (id === 'url' && aiData) item.urlAnalysisData = aiData as UrlAnalysis;
  if (id === 'favicon' && aiData) item.faviconAnalysisData = aiData as FaviconAnalysis;
  if (id === 'custom404' && aiData) item.custom404PageData = aiData as Custom404PageAnalysis;
  
  if (id === 'domainRegistration' && aiData) item.domainRegistrationData = aiData as DomainRegistrationAnalysis;
  if (id === 'domainAvailability' && aiData) item.domainAvailabilityData = aiData as DomainAvailabilityAnalysis;

  if (id === 'backlinksScore' && aiData) item.backlinksScoreData = aiData as BacklinksScore;
  if (id === 'backlinksCounter' && aiData) item.backlinksCounterData = aiData as BacklinksCounter;
  if (id === 'referringDomains' && aiData) item.referringDomainsData = aiData as ReferringDomains;

  if (id === 'trafficEstimations' && aiData) item.trafficEstimationsData = aiData as TrafficEstimations;
  if (id === 'trafficRank' && aiData) item.trafficRankData = aiData as TrafficRank;

  if (id === 'localDirectories' && aiData) item.localDirectoriesData = aiData as LocalDirectories;
  if (id === 'onlineReviews' && aiData) item.onlineReviewsData = aiData as OnlineReviews;

  // Social Media
  if (id === 'discoveredProfiles' && aiData) item.discoveredProfilesData = aiData as DiscoveredProfiles;
  if (['facebookPage', 'twitterAccount', 'instagramAccount', 'linkedinAccount'].includes(id) && aiData) item.socialAccountData = aiData as SocialAccountDetails;
  if (id === 'socialMediaEngagement' && aiData) item.socialEngagementData = aiData as SocialMediaEngagement;
  
  return item;
};


const mapAiOnPageDetailToOnPageItem = (aiItem: AiOnPageDetailItem): OnPageItem => {
  let icon: React.ElementType = Info; 
  if (aiItem.id === 'titleTag') icon = FileText;
  else if (aiItem.id === 'metaDescription') icon = BookOpen;
  else if (aiItem.id === 'googlePreview') icon = CheckCircle2;

  return {
    id: aiItem.id,
    icon: icon,
    title: aiItem.title,
    statusText: aiItem.statusText,
    statusColorClass: aiItem.statusColorClass,
    badgeVariant: 'outline', 
    content: aiItem.content || undefined,
    details: aiItem.details,
    googleDesktopPreview: aiItem.googleDesktopPreview as GooglePreviewData | undefined, 
    googleMobilePreview: aiItem.googleMobilePreview as GooglePreviewData | undefined, 
  };
};

const getDefaultOnPageAccordionItems = (url?: string): OnPageItem[] => [
  { id: 'titleTag', icon: FileText, title: 'Title Tag', statusText: 'N/A', statusColorClass: 'text-muted-foreground', badgeVariant: 'outline', content: `Example: ${url ? new URL(url).hostname : 'YourWebsite'}.com Title`, details: 'Length: ~60 chars' },
  { id: 'metaDescription', icon: BookOpen, title: 'Meta Description', statusText: 'N/A', statusColorClass: 'text-muted-foreground', badgeVariant: 'outline', content: 'Example: Concise summary of your page content.', details: 'Length: ~155 chars' },
  { id: 'googlePreview', icon: CheckCircle2, title: 'Google Preview', statusText: 'N/A', statusColorClass: 'text-muted-foreground', badgeVariant: 'outline', googleDesktopPreview: { url: url || 'example.com', title: 'Example Title', description: 'Example desktop description.'}, googleMobilePreview: { url: url || 'example.com', title: 'Example Mobile Title', description: 'Example mobile description.'} },
  { id: 'headings', icon: Heading1, title: 'Headings', statusText: 'N/A', statusColorClass: 'text-muted-foreground', headingsAnalysis: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', h1Count: 0, h2Count: 0, h3Count: 0, h4Count: 0, h5Count: 0, h6Count: 0, headings: [] } },
  { id: 'contentAnalysis', icon: FileSearch2, title: 'Content Analysis', statusText: 'N/A', statusColorClass: 'text-muted-foreground', contentAnalysisData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', keywords: [] } },
  { id: 'altAttributes', icon: ImageIcon, title: 'Alt Attributes', statusText: 'N/A', statusColorClass: 'text-muted-foreground', altAttributeAnalysis: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', totalImages: 0, imagesMissingAlts: 0, details: '' } },
  { id: 'inPageLinks', icon: LinkIcon, title: 'In-Page Links', statusText: 'N/A', statusColorClass: 'text-muted-foreground', inPageLinksAnalysis: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', totalLinks: 0, internalLinks: 0, externalLinksFollow: 0, externalLinksNofollow: 0, links: [] } },
];

const getDefaultIndexingAccordionItems = (): OnPageItem[] => [
  { id: 'webFeeds', icon: Rss, title: 'Web Feeds', statusText: 'N/A', statusColorClass: 'text-muted-foreground', webFeedsData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', details: 'Checking...', feeds: []}},
  { id: 'urlResolve', icon: Network, title: 'URL Resolve', statusText: 'N/A', statusColorClass: 'text-muted-foreground', urlResolveData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', details: 'Checking...', resolutions: []}},
  { id: 'robotsTxt', icon: FileCode, title: 'Robots.txt', statusText: 'N/A', statusColorClass: 'text-muted-foreground', robotsTxtData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', robotsTxtUrl: '', findings: []}},
  { id: 'xmlSitemap', icon: FileText, title: 'XML Sitemap', statusText: 'N/A', statusColorClass: 'text-muted-foreground', xmlSitemapData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', sitemapUrl: '', details: ''}},
  { id: 'sitemapValidity', icon: ListChecks, title: 'Sitemaps Validity', statusText: 'N/A', statusColorClass: 'text-muted-foreground', sitemapValidityData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', summary: 'Checking...', checks: []}},
  { id: 'urlParameters', icon: Link2Icon, title: 'URL Parameters', statusText: 'N/A', statusColorClass: 'text-muted-foreground', urlParametersData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', details: 'Checking...'}}
];

const getDefaultTechnicalSeoItems = (): OnPageItem[] => [
  { id: 'robotsTags', icon: Tags, title: 'Robots Tags', statusText: 'N/A', statusColorClass: 'text-muted-foreground', robotsTagsData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', details: 'Checking...', foundTags: [] } },
  { id: 'indexFollow', icon: Target, title: 'Index and Follow', statusText: 'N/A', statusColorClass: 'text-muted-foreground', indexFollowData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', details: 'Checking...' } },
  { id: 'hreflangTags', icon: Languages, title: 'Hreflang Tags', statusText: 'N/A', statusColorClass: 'text-muted-foreground', hreflangTagsData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', details: 'Checking...' } },
  { id: 'brokenLinks', icon: Unlink, title: 'Broken Links', statusText: 'N/A', statusColorClass: 'text-muted-foreground', brokenLinksData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', details: 'Checking...' } },
  { id: 'underscoresInUrls', icon: DraftingCompass, title: 'Underscores in the URLs', statusText: 'N/A', statusColorClass: 'text-muted-foreground', underscoresInUrlsData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', details: 'Checking...' } },
  { id: 'discoveredPages', icon: FileStack, title: 'Discovered Pages', statusText: 'N/A', statusColorClass: 'text-muted-foreground', discoveredPagesData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', count: 0, details: 'Checking...' } },
];

const getDefaultMobileItems = (): OnPageItem[] => [
  { id: 'mobileFriendliness', icon: Smartphone, title: 'Mobile Friendliness', statusText: 'N/A', statusColorClass: 'text-muted-foreground', mobileFriendlinessData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', ratingText: 'N/A', progressValue: 0, details: 'Checking...' } },
  { id: 'mobileRendering', icon: TabletSmartphone, title: 'Mobile Rendering', statusText: 'N/A', statusColorClass: 'text-muted-foreground', mobileRenderingData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', details: 'Checking...' } },
  { id: 'tapTargets', icon: MousePointerClick, title: 'Tap Targets', statusText: 'N/A', statusColorClass: 'text-muted-foreground', tapTargetsData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', details: 'Checking...' } },
];

const getDefaultStructuredDataItems = (): OnPageItem[] => [
    { id: 'schemaOrg', icon: Binary, title: 'Schema.org', statusText: 'N/A', statusColorClass: 'text-muted-foreground', schemaOrgData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', schemaTypes: [], issues: [], warningCount: 0 } },
    { id: 'openGraphProtocol', icon: Share2, title: 'Open Graph Protocol', statusText: 'N/A', statusColorClass: 'text-muted-foreground', openGraphData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', previewData: { title: 'Example Site', description: 'An example site description for Open Graph.', imageUrl: 'https://placehold.co/600x315.png', url: 'example.com' }, tags: [] } },
    { id: 'twitterCard', icon: Twitter, title: 'Twitter Card', statusText: 'N/A', statusColorClass: 'text-muted-foreground', twitterCardData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', previewData: { title: 'Example Site', description: 'An example site description for Twitter Card.', imageUrl: 'https://placehold.co/600x315.png', domain: 'example.com', cardType: 'summary', site: '@example' }, tags: [] } },
];

const getDefaultMicroformatsItems = (): OnPageItem[] => [
  { id: 'microformats', icon: MicroformatsIcon, title: 'Microformats Analysis', statusText: 'N/A', statusColorClass: 'text-muted-foreground', microformatsData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', formatsFound: [] } },
];

const getDefaultSecurityItems = (): OnPageItem[] => [
  { id: 'emailPrivacy', icon: MailWarning, title: 'Email Privacy', statusText: 'N/A', statusColorClass: 'text-muted-foreground', emailPrivacyData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', details: 'Checking...' } },
  { id: 'dmarc', icon: DmarcIcon, title: 'DMARC', statusText: 'N/A', statusColorClass: 'text-muted-foreground', dmarcData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', details: 'Checking...' } },
  { id: 'sslSecure', icon: Lock, title: 'SSL Secure', statusText: 'N/A', statusColorClass: 'text-muted-foreground', sslSecureData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', details: 'Checking...', checks: [] } },
  { id: 'mixedContent', icon: Blend, title: 'Mixed Content', statusText: 'N/A', statusColorClass: 'text-muted-foreground', mixedContentData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', details: 'Checking...' } },
];

const getDefaultPerformanceItems = (): OnPageItem[] => [
  { id: 'assetMinification', icon: Gauge, title: 'Asset Minification', statusText: 'N/A', statusColorClass: 'text-muted-foreground', assetMinificationData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', details: 'Checking...' } },
];

const getDefaultAccessibilityItems = (): OnPageItem[] => [
  { id: 'contrast', icon: ContrastIcon, title: 'Contrast', statusText: 'N/A', statusColorClass: 'text-muted-foreground', contrastData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', details: 'Checking...', items: [] } },
  { id: 'navigation', icon: NavigationIcon, title: 'Navigation', statusText: 'N/A', statusColorClass: 'text-muted-foreground', navigationData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', summaryText: 'Checking...', checks: [], notRelevantChecks: [] } },
];

const getDefaultMetaTechItems = (): OnPageItem[] => [
  { id: 'technologies', icon: Cpu, title: 'Technologies', statusText: 'N/A', statusColorClass: 'text-muted-foreground', technologiesData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', detectedTechnologies: [] } },
  { id: 'analytics', icon: AreaChart, title: 'Analytics', statusText: 'N/A', statusColorClass: 'text-muted-foreground', analyticsData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', detectedTools: [] } },
  { id: 'doctype', icon: FileBadge, title: 'Doctype', statusText: 'N/A', statusColorClass: 'text-muted-foreground', doctypeData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', doctype: 'Checking...' } },
  { id: 'encoding', icon: Binary, title: 'Encoding', statusText: 'N/A', statusColorClass: 'text-muted-foreground', encodingData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', encoding: 'Checking...' } },
];

const getDefaultBrandingItems = (url?: string): OnPageItem[] => [
  { id: 'url', icon: LinkIcon, title: 'URL', statusText: 'N/A', statusColorClass: 'text-muted-foreground', urlAnalysisData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', url: url || 'N/A', length: url?.length || 0 } },
  { id: 'favicon', icon: ImageIcon, title: 'Favicon', statusText: 'N/A', statusColorClass: 'text-muted-foreground', faviconAnalysisData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', details: 'Checking...' } },
  { id: 'custom404', icon: FileQuestion, title: 'Custom 404 Page', statusText: 'N/A', statusColorClass: 'text-muted-foreground', custom404PageData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', details: 'Checking...' } },
];

const getDefaultDomainItems = (): OnPageItem[] => [
  { id: 'domainRegistration', icon: CalendarDays, title: 'Domain Registration', statusText: 'N/A', statusColorClass: 'text-muted-foreground', domainRegistrationData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', createdDate: 'Checking...', expiryDate: 'Checking...' } },
  { id: 'domainAvailability', icon: Globe, title: 'Typo Availability', statusText: 'N/A', statusColorClass: 'text-muted-foreground', domainAvailabilityData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', domains: [] } },
];

const getDefaultOffPageItems = (): OnPageItem[] => [
  { id: 'backlinksScore', icon: Award, title: 'Backlinks Score', statusText: 'N/A', statusColorClass: 'text-muted-foreground', backlinksScoreData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', score: 0, details: 'Checking...' } },
  { id: 'backlinksCounter', icon: Users, title: 'Backlinks Counter', statusText: 'N/A', statusColorClass: 'text-muted-foreground', backlinksCounterData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', count: 0 } },
  { id: 'referringDomains', icon: TrendingUp, title: 'Referring Domains', statusText: 'N/A', statusColorClass: 'text-muted-foreground', referringDomainsData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', count: 0 } },
];

const getDefaultTrafficReportItems = (): OnPageItem[] => [
  { id: 'trafficEstimations', icon: BarChartHorizontal, title: 'Traffic Estimations', statusText: 'N/A', statusColorClass: 'text-muted-foreground', trafficEstimationsData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', estimationText: 'Checking...', details: 'Checking...' } },
  { id: 'trafficRank', icon: Activity, title: 'Traffic Rank', statusText: 'N/A', statusColorClass: 'text-muted-foreground', trafficRankData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', globalRankText: 'Checking...', tldRankText: 'Checking...' } },
];

const getDefaultLocalSeoItems = (): OnPageItem[] => [
  { id: 'localDirectories', icon: MapPin, title: 'Local Directories', statusText: 'N/A', statusColorClass: 'text-muted-foreground', localDirectoriesData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', links: [] } },
  { id: 'onlineReviews', icon: MessageSquare, title: 'Online Reviews', statusText: 'N/A', statusColorClass: 'text-muted-foreground', onlineReviewsData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', details: 'Checking...' } },
];

const getDefaultSocialMediaItems = (): OnPageItem[] => [
  { id: 'discoveredProfiles', icon: Search, title: 'Discovered Profiles', statusText: 'N/A', statusColorClass: 'text-muted-foreground', discoveredProfilesData: { statusText: 'Checking...', statusColorClass: 'text-muted-foreground', summaryText: 'Looking for social profiles...', profiles: [] } },
  { id: 'facebookPage', icon: Facebook, title: 'Facebook Page', statusText: 'N/A', statusColorClass: 'text-muted-foreground', socialAccountData: { platform: 'Facebook', found: false, statusText: 'N/A', statusColorClass: 'text-muted-foreground' } },
  { id: 'twitterAccount', icon: Twitter, title: 'Twitter Account', statusText: 'N/A', statusColorClass: 'text-muted-foreground', socialAccountData: { platform: 'Twitter', found: false, statusText: 'N/A', statusColorClass: 'text-muted-foreground' } },
  { id: 'instagramAccount', icon: Instagram, title: 'Instagram Account', statusText: 'N/A', statusColorClass: 'text-muted-foreground', socialAccountData: { platform: 'Instagram', found: false, statusText: 'N/A', statusColorClass: 'text-muted-foreground' } },
  { id: 'linkedinAccount', icon: Linkedin, title: 'LinkedIn Account', statusText: 'N/A', statusColorClass: 'text-muted-foreground', socialAccountData: { platform: 'LinkedIn', found: false, statusText: 'N/A', statusColorClass: 'text-muted-foreground' } },
  { id: 'socialMediaEngagement', icon: ThumbsUp, title: 'Social Media Engagement', statusText: 'N/A', statusColorClass: 'text-muted-foreground', socialEngagementData: { statusText: 'Checking...', statusColorClass: 'text-muted-foreground', summary: 'Analyzing engagement...', engagements: [] } },
];


export default function HomePage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [reportData, setReportData] = React.useState<ReportData | null>(null);
  
  // State for each accordion section's items
  const [onPageAccordionItems, setOnPageAccordionItems] = React.useState<OnPageItem[]>(getDefaultOnPageAccordionItems());
  const [indexingAccordionItems, setIndexingAccordionItems] = React.useState<OnPageItem[]>(getDefaultIndexingAccordionItems());
  const [technicalSeoAccordionItems, setTechnicalSeoAccordionItems] = React.useState<OnPageItem[]>(getDefaultTechnicalSeoItems());
  const [mobileAccordionItems, setMobileAccordionItems] = React.useState<OnPageItem[]>(getDefaultMobileItems());
  const [structuredDataAccordionItems, setStructuredDataAccordionItems] = React.useState<OnPageItem[]>(getDefaultStructuredDataItems());
  const [microformatsAccordionItems, setMicroformatsAccordionItems] = React.useState<OnPageItem[]>(getDefaultMicroformatsItems());
  const [securityAccordionItems, setSecurityAccordionItems] = React.useState<OnPageItem[]>(getDefaultSecurityItems());
  const [performanceAccordionItems, setPerformanceAccordionItems] = React.useState<OnPageItem[]>(getDefaultPerformanceItems());
  const [accessibilityAccordionItems, setAccessibilityAccordionItems] = React.useState<OnPageItem[]>(getDefaultAccessibilityItems());
  const [metaTechAccordionItems, setMetaTechAccordionItems] = React.useState<OnPageItem[]>(getDefaultMetaTechItems());
  const [brandingAccordionItems, setBrandingAccordionItems] = React.useState<OnPageItem[]>(getDefaultBrandingItems());
  const [domainAccordionItems, setDomainAccordionItems] = React.useState<OnPageItem[]>(getDefaultDomainItems());
  const [offPageAccordionItems, setOffPageAccordionItems] = React.useState<OnPageItem[]>(getDefaultOffPageItems());
  const [trafficReportAccordionItems, setTrafficReportAccordionItems] = React.useState<OnPageItem[]>(getDefaultTrafficReportItems());
  const [localSeoAccordionItems, setLocalSeoAccordionItems] = React.useState<OnPageItem[]>(getDefaultLocalSeoItems());
  const [socialMediaAccordionItems, setSocialMediaAccordionItems] = React.useState<OnPageItem[]>(getDefaultSocialMediaItems());


  const [error, setError] = React.useState<string | null>(null);
  const [currentUrl, setCurrentUrl] = React.useState<string>('');

  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { url: '' },
  });

  const resetAllAccordionItems = (url?: string) => {
    setOnPageAccordionItems(getDefaultOnPageAccordionItems(url)); 
    setIndexingAccordionItems(getDefaultIndexingAccordionItems());
    setTechnicalSeoAccordionItems(getDefaultTechnicalSeoItems());
    setMobileAccordionItems(getDefaultMobileItems());
    setStructuredDataAccordionItems(getDefaultStructuredDataItems());
    setMicroformatsAccordionItems(getDefaultMicroformatsItems());
    setSecurityAccordionItems(getDefaultSecurityItems());
    setPerformanceAccordionItems(getDefaultPerformanceItems());
    setAccessibilityAccordionItems(getDefaultAccessibilityItems());
    setMetaTechAccordionItems(getDefaultMetaTechItems());
    setBrandingAccordionItems(getDefaultBrandingItems(url));
    setDomainAccordionItems(getDefaultDomainItems());
    setOffPageAccordionItems(getDefaultOffPageItems());
    setTrafficReportAccordionItems(getDefaultTrafficReportItems());
    setLocalSeoAccordionItems(getDefaultLocalSeoItems());
    setSocialMediaAccordionItems(getDefaultSocialMediaItems());
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setError(null);
    setReportData(null);
    setCurrentUrl(data.url);
    resetAllAccordionItems(data.url);


    try {
      const result = await generateSeoReport({ url: data.url });
      if (result) {
        const augmentedResult: ReportData = {
          ...result,
          urlAnalyzed: data.url,
          analysisTimestamp: new Date().toISOString(),
          passedPercent: result.score > 0 ? Math.min(result.score + 10, 70) : 0, 
          toImprovePercent: result.score > 0 ? 20 : 0, 
          errorsPercent: result.score > 0 ? 10 : 0, 
        };
        setReportData(augmentedResult);

        // --- Process On-Page SEO Details ---
        let newOnPageItems: OnPageItem[] = [];
        if (result.onPageSeoDetails && result.onPageSeoDetails.length > 0) {
          newOnPageItems.push(...result.onPageSeoDetails.map(mapAiOnPageDetailToOnPageItem));
        } else {
          newOnPageItems.push(...getDefaultOnPageAccordionItems(data.url).filter(item => ['titleTag', 'metaDescription', 'googlePreview'].includes(item.id)));
        }
        newOnPageItems.push(mapAiDataToAccordionItem('headings', 'Headings', Heading1, result.headingsAnalysis, result.headingsAnalysis?.statusText, result.headingsAnalysis?.statusColorClass));
        newOnPageItems.push(mapAiDataToAccordionItem('contentAnalysis', 'Content Analysis', FileSearch2, result.contentAnalysis, result.contentAnalysis?.statusText, result.contentAnalysis?.statusColorClass));
        newOnPageItems.push(mapAiDataToAccordionItem('altAttributes', 'Alt Attributes', ImageIcon, result.altAttributeAnalysis, result.altAttributeAnalysis?.statusText, result.altAttributeAnalysis?.statusColorClass));
        newOnPageItems.push(mapAiDataToAccordionItem('inPageLinks', 'In-Page Links', LinkIcon, result.inPageLinksAnalysis, result.inPageLinksAnalysis?.statusText, result.inPageLinksAnalysis?.statusColorClass));
        setOnPageAccordionItems(newOnPageItems);

        // --- Process Indexing Analysis ---
        const newIndexingItems: OnPageItem[] = [];
        if (result.indexingAnalysis) {
          const ia = result.indexingAnalysis;
          newIndexingItems.push(mapAiDataToAccordionItem('webFeeds', 'Web Feeds', Rss, ia.webFeeds));
          newIndexingItems.push(mapAiDataToAccordionItem('urlResolve', 'URL Resolve', Network, ia.urlResolve));
          newIndexingItems.push(mapAiDataToAccordionItem('robotsTxt', 'Robots.txt', FileCode, ia.robotsTxt));
          newIndexingItems.push(mapAiDataToAccordionItem('xmlSitemap', 'XML Sitemap', FileText, ia.xmlSitemap));
          newIndexingItems.push(mapAiDataToAccordionItem('sitemapValidity', 'Sitemaps Validity', ListChecks, ia.sitemapValidity));
          newIndexingItems.push(mapAiDataToAccordionItem('urlParameters', 'URL Parameters', Link2Icon, ia.urlParameters));
        }
        setIndexingAccordionItems(newIndexingItems.length > 0 ? newIndexingItems : getDefaultIndexingAccordionItems());

        // --- Process Technical SEO Analysis ---
        const newTechnicalSeoItems: OnPageItem[] = [];
        if (result.technicalSeoAnalysis) {
          const tsa = result.technicalSeoAnalysis;
          newTechnicalSeoItems.push(mapAiDataToAccordionItem('robotsTags', 'Robots Tags', Tags, tsa.robotsTags));
          newTechnicalSeoItems.push(mapAiDataToAccordionItem('indexFollow', 'Index and Follow', Target, tsa.indexFollow));
          newTechnicalSeoItems.push(mapAiDataToAccordionItem('hreflangTags', 'Hreflang Tags', Languages, tsa.hreflangTags));
          newTechnicalSeoItems.push(mapAiDataToAccordionItem('brokenLinks', 'Broken Links', Unlink, tsa.brokenLinks));
          newTechnicalSeoItems.push(mapAiDataToAccordionItem('underscoresInUrls', 'Underscores in the URLs', DraftingCompass, tsa.underscoresInUrls));
          newTechnicalSeoItems.push(mapAiDataToAccordionItem('discoveredPages', 'Discovered Pages', FileStack, tsa.discoveredPages));
        }
        setTechnicalSeoAccordionItems(newTechnicalSeoItems.length > 0 ? newTechnicalSeoItems : getDefaultTechnicalSeoItems());
        
        // --- Process Mobile Analysis ---
        const newMobileItems: OnPageItem[] = [];
        if (result.mobileAnalysis) {
          const ma = result.mobileAnalysis;
          newMobileItems.push(mapAiDataToAccordionItem('mobileFriendliness', 'Mobile Friendliness', Smartphone, ma.mobileFriendliness));
          newMobileItems.push(mapAiDataToAccordionItem('mobileRendering', 'Mobile Rendering', TabletSmartphone, ma.mobileRendering));
          newMobileItems.push(mapAiDataToAccordionItem('tapTargets', 'Tap Targets', MousePointerClick, ma.tapTargets));
        }
        setMobileAccordionItems(newMobileItems.length > 0 ? newMobileItems : getDefaultMobileItems());

        // --- Process Structured Data Analysis ---
        const newStructuredDataItems: OnPageItem[] = [];
        if (result.structuredDataAnalysis) {
            const sda = result.structuredDataAnalysis;
            newStructuredDataItems.push(mapAiDataToAccordionItem('schemaOrg', 'Schema.org', Binary, sda.schemaOrg, sda.schemaOrg?.statusText, sda.schemaOrg?.statusColorClass));
            newStructuredDataItems.push(mapAiDataToAccordionItem('openGraphProtocol', 'Open Graph Protocol', Share2, sda.openGraph, sda.openGraph?.statusText, sda.openGraph?.statusColorClass));
            if (sda.twitterCard) {
                 newStructuredDataItems.push(mapAiDataToAccordionItem('twitterCard', 'Twitter Card', Twitter, sda.twitterCard, sda.twitterCard?.statusText, sda.twitterCard?.statusColorClass));
            }
        }
        setStructuredDataAccordionItems(newStructuredDataItems.length > 0 ? newStructuredDataItems : getDefaultStructuredDataItems());

        // --- Process Microformats Analysis ---
        const newMicroformatsItems: OnPageItem[] = [];
        if (result.microformatsAnalysis) {
            newMicroformatsItems.push(mapAiDataToAccordionItem('microformats', 'Microformats Analysis', MicroformatsIcon, result.microformatsAnalysis, result.microformatsAnalysis?.statusText, result.microformatsAnalysis?.statusColorClass));
        }
        setMicroformatsAccordionItems(newMicroformatsItems.length > 0 ? newMicroformatsItems : getDefaultMicroformatsItems());

        // --- Process Security Analysis ---
        const newSecurityItems: OnPageItem[] = [];
        if (result.securityAnalysis) {
            const sa = result.securityAnalysis;
            newSecurityItems.push(mapAiDataToAccordionItem('emailPrivacy', 'Email Privacy', MailWarning, sa.emailPrivacy));
            newSecurityItems.push(mapAiDataToAccordionItem('dmarc', 'DMARC', DmarcIcon, sa.dmarc));
            newSecurityItems.push(mapAiDataToAccordionItem('sslSecure', 'SSL Secure', Lock, sa.sslSecure));
            newSecurityItems.push(mapAiDataToAccordionItem('mixedContent', 'Mixed Content', Blend, sa.mixedContent));
        }
        setSecurityAccordionItems(newSecurityItems.length > 0 ? newSecurityItems : getDefaultSecurityItems());

        // --- Process Performance Analysis ---
        const newPerformanceItems: OnPageItem[] = [];
        if (result.performanceAnalysis) {
            const pa = result.performanceAnalysis;
            newPerformanceItems.push(mapAiDataToAccordionItem('assetMinification', 'Asset Minification', Gauge, pa.assetMinification));
        }
        setPerformanceAccordionItems(newPerformanceItems.length > 0 ? newPerformanceItems : getDefaultPerformanceItems());

        // --- Process Accessibility Analysis ---
        const newAccessibilityItems: OnPageItem[] = [];
        if (result.accessibilityAnalysis) {
            const aa = result.accessibilityAnalysis;
            newAccessibilityItems.push(mapAiDataToAccordionItem('contrast', 'Contrast', ContrastIcon, aa.contrast));
            newAccessibilityItems.push(mapAiDataToAccordionItem('navigation', 'Navigation', NavigationIcon, aa.navigation));
        }
        setAccessibilityAccordionItems(newAccessibilityItems.length > 0 ? newAccessibilityItems : getDefaultAccessibilityItems());

        // --- Process Meta & Technologies Analysis ---
        const newMetaTechItems: OnPageItem[] = [];
        if (result.technologiesAnalysis) newMetaTechItems.push(mapAiDataToAccordionItem('technologies', 'Technologies', Cpu, result.technologiesAnalysis));
        if (result.analyticsAnalysis) newMetaTechItems.push(mapAiDataToAccordionItem('analytics', 'Analytics', AreaChart, result.analyticsAnalysis));
        if (result.doctypeAnalysis) newMetaTechItems.push(mapAiDataToAccordionItem('doctype', 'Doctype', FileBadge, result.doctypeAnalysis));
        if (result.encodingAnalysis) newMetaTechItems.push(mapAiDataToAccordionItem('encoding', 'Encoding', Binary, result.encodingAnalysis));
        setMetaTechAccordionItems(newMetaTechItems.length > 0 ? newMetaTechItems : getDefaultMetaTechItems());
        
        // --- Process Branding Analysis ---
        const newBrandingItems: OnPageItem[] = [];
        if (result.brandingAnalysis) {
            const ba = result.brandingAnalysis;
            if (ba.urlAnalysis) newBrandingItems.push(mapAiDataToAccordionItem('url', 'URL', LinkIcon, ba.urlAnalysis));
            if (ba.faviconAnalysis) newBrandingItems.push(mapAiDataToAccordionItem('favicon', 'Favicon', ImageIcon, ba.faviconAnalysis));
            if (ba.custom404PageAnalysis) newBrandingItems.push(mapAiDataToAccordionItem('custom404', 'Custom 404 Page', FileQuestion, ba.custom404PageAnalysis));
        }
        setBrandingAccordionItems(newBrandingItems.length > 0 ? newBrandingItems : getDefaultBrandingItems(data.url));

        // --- Process Domain Analysis ---
        const newDomainItems: OnPageItem[] = [];
        if (result.domainAnalysis) {
            const da = result.domainAnalysis;
            if (da.domainRegistration) newDomainItems.push(mapAiDataToAccordionItem('domainRegistration', 'Domain Registration', CalendarDays, da.domainRegistration));
            if (da.domainAvailability) newDomainItems.push(mapAiDataToAccordionItem('domainAvailability', 'Typo Availability', Globe, da.domainAvailability));
        }
        setDomainAccordionItems(newDomainItems.length > 0 ? newDomainItems : getDefaultDomainItems());

        // --- Process Off-Page Analysis ---
        const newOffPageItems: OnPageItem[] = [];
        if (result.offPageAnalysis) {
            const opa = result.offPageAnalysis;
            if (opa.backlinksScore) newOffPageItems.push(mapAiDataToAccordionItem('backlinksScore', 'Backlinks Score', Award, opa.backlinksScore));
            if (opa.backlinksCounter) newOffPageItems.push(mapAiDataToAccordionItem('backlinksCounter', 'Backlinks Counter', Users, opa.backlinksCounter));
            if (opa.referringDomains) newOffPageItems.push(mapAiDataToAccordionItem('referringDomains', 'Referring Domains', TrendingUp, opa.referringDomains));
        }
        setOffPageAccordionItems(newOffPageItems.length > 0 ? newOffPageItems : getDefaultOffPageItems());

        // --- Process Traffic Report Analysis ---
        const newTrafficReportItems: OnPageItem[] = [];
        if (result.trafficReportAnalysis) {
            const tra = result.trafficReportAnalysis;
            if (tra.trafficEstimations) newTrafficReportItems.push(mapAiDataToAccordionItem('trafficEstimations', 'Traffic Estimations', BarChartHorizontal, tra.trafficEstimations));
            if (tra.trafficRank) newTrafficReportItems.push(mapAiDataToAccordionItem('trafficRank', 'Traffic Rank', Activity, tra.trafficRank));
        }
        setTrafficReportAccordionItems(newTrafficReportItems.length > 0 ? newTrafficReportItems : getDefaultTrafficReportItems());

        // --- Process Local SEO Analysis ---
        const newLocalSeoItems: OnPageItem[] = [];
        if (result.localSeoAnalysis) {
            const lsa = result.localSeoAnalysis;
            if (lsa.localDirectories) newLocalSeoItems.push(mapAiDataToAccordionItem('localDirectories', 'Local Directories', MapPin, lsa.localDirectories));
            if (lsa.onlineReviews) newLocalSeoItems.push(mapAiDataToAccordionItem('onlineReviews', 'Online Reviews', MessageSquare, lsa.onlineReviews));
        }
        setLocalSeoAccordionItems(newLocalSeoItems.length > 0 ? newLocalSeoItems : getDefaultLocalSeoItems());

        // --- Process Social Media Analysis ---
        const newSocialMediaItems: OnPageItem[] = [];
        if (result.socialMediaAnalysis) {
          const sma = result.socialMediaAnalysis;
          if (sma.discoveredProfiles) newSocialMediaItems.push(mapAiDataToAccordionItem('discoveredProfiles', 'Discovered Profiles', Search, sma.discoveredProfiles));
          if (sma.facebookPage) newSocialMediaItems.push(mapAiDataToAccordionItem('facebookPage', 'Facebook Page', Facebook, sma.facebookPage));
          if (sma.twitterAccount) newSocialMediaItems.push(mapAiDataToAccordionItem('twitterAccount', 'Twitter Account', Twitter, sma.twitterAccount));
          if (sma.instagramAccount) newSocialMediaItems.push(mapAiDataToAccordionItem('instagramAccount', 'Instagram Account', Instagram, sma.instagramAccount));
          if (sma.linkedinAccount) newSocialMediaItems.push(mapAiDataToAccordionItem('linkedinAccount', 'LinkedIn Account', Linkedin, sma.linkedinAccount));
          if (sma.socialMediaEngagement) newSocialMediaItems.push(mapAiDataToAccordionItem('socialMediaEngagement', 'Social Media Engagement', ThumbsUp, sma.socialMediaEngagement));
        }
        setSocialMediaAccordionItems(newSocialMediaItems.length > 0 ? newSocialMediaItems : getDefaultSocialMediaItems());


        toast({ title: "Analysis Complete", description: `SEO report for ${data.url} generated successfully.`, variant: "default" });
      } else {
        throw new Error("Received empty report from AI.");
      }
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred during analysis.';
      setError(errorMessage);
      resetAllAccordionItems(currentUrl);

      toast({ title: "Analysis Failed", description: errorMessage, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    const urlValue = form.getValues("url") || currentUrl;
    if (urlValue) {
      onSubmit({ url: urlValue });
    } else {
      toast({ title: "URL missing", description: "Please enter a URL to refresh the analysis.", variant: "destructive" });
    }
  };

  const handleDownloadPdf = () => {
    if (reportData) { window.print(); } 
    else { toast({ title: "No Report Data", description: "Please generate a report before downloading.", variant: "destructive" }); }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4 md:px-8 printable-area">
      <div className="w-full max-w-3xl mb-6 no-print">
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-end gap-3 p-4 bg-card rounded-lg shadow-md">
              <FormField control={form.control} name="url" render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormLabel className="text-sm text-muted-foreground sr-only">Website URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter website URL (e.g., https://example.com)" {...field} className="text-base py-2 h-10" disabled={isLoading} />
                    </FormControl>
                    <FormMessage className="text-xs"/>
                  </FormItem>
                )} />
              <Button type="submit" className="py-2 h-10 text-sm font-semibold bg-primary hover:bg-primary/90" disabled={isLoading}>
                {isLoading ? (<><LoaderCircle className="mr-2 h-4 w-4 animate-spin" />Analyzing...</>) : ('Analyze')}
              </Button>
            </form>
          </Form>
      </div>
      
      {isLoading && (
        <div className="flex flex-col items-center justify-center text-center p-8 bg-card rounded-lg shadow-md w-full max-w-3xl">
          <LoaderCircle className="h-12 w-12 animate-spin text-primary mb-4" />
          <p className="text-lg font-semibold">Generating your report...</p>
          <p className="text-muted-foreground">This might take a few moments. Please wait.</p>
        </div>
      )}

      {error && !isLoading && (
        <Card className="bg-destructive text-destructive-foreground shadow-md w-full max-w-3xl">
          <CardHeader><CardTitle className="flex items-center"><AlertTriangle className="mr-2 h-5 w-5" />Analysis Error</CardTitle></CardHeader>
          <CardContent><p>{error}</p></CardContent>
        </Card>
      )}

      {(!isLoading && !error) && (
        <main className="w-full max-w-4xl space-y-6">
          {(reportData || currentUrl) && (
            <ReportHeaderCard reportData={reportData} isLoading={isLoading} onRefresh={handleRefresh} onDownloadPdf={handleDownloadPdf} urlInput={form.getValues("url") || currentUrl} />
          )}
          
          {(reportData || currentUrl) && <ReportFilters />}

          <div className={`print:block ${(!reportData && !currentUrl && !isLoading && !error) ? 'hidden' : ''}`}>
            <ReportAccordionSection title="On-Page" items={onPageAccordionItems} defaultOpen={true} />
            <ReportAccordionSection title="Indexing" items={indexingAccordionItems} defaultOpen={false} />
            <ReportAccordionSection title="Technical SEO" items={technicalSeoAccordionItems} defaultOpen={false} />
            <ReportAccordionSection title="Mobile" items={mobileAccordionItems} defaultOpen={false} />
            <ReportAccordionSection title="Structured Data" items={structuredDataAccordionItems} defaultOpen={false} />
            <ReportAccordionSection title="Microformats" items={microformatsAccordionItems} defaultOpen={false} />
            <ReportAccordionSection title="Security" items={securityAccordionItems} defaultOpen={false} />
            <ReportAccordionSection title="Performance" items={performanceAccordionItems} defaultOpen={false} />
            <ReportAccordionSection title="Accessibility" items={accessibilityAccordionItems} defaultOpen={false} />
            <ReportAccordionSection title="Meta & Technologies" items={metaTechAccordionItems} defaultOpen={false} />
            <ReportAccordionSection title="Branding" items={brandingAccordionItems} defaultOpen={false} />
            <ReportAccordionSection title="Domain" items={domainAccordionItems} defaultOpen={false} />
            <ReportAccordionSection title="Off-Page" items={offPageAccordionItems} defaultOpen={false} />
            <ReportAccordionSection title="Traffic" items={trafficReportAccordionItems} defaultOpen={false} />
            <ReportAccordionSection title="Local" items={localSeoAccordionItems} defaultOpen={false} />
            <ReportAccordionSection title="Social Media" items={socialMediaAccordionItems} defaultOpen={false} />
          </div>
          
          {!reportData && !currentUrl && !isLoading && !error && (
            <Card className="w-full max-w-3xl shadow-lg">
              <CardHeader><CardTitle className="text-2xl font-semibold text-primary mb-3 text-center">Ready to analyze?</CardTitle></CardHeader>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">Enter a website URL above and click "Analyze" to get your SEO report.</p>
              </CardContent>
            </Card>
          )}
        </main>
      )}
      <footer className="w-full max-w-4xl mt-12 pt-6 border-t border-border text-center text-sm text-muted-foreground no-print">
        <p>&copy; {new Date().getFullYear()} SEOVision. All rights reserved.</p>
        <p>Made by <a href="https://github.com/jobin-512" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">jobin-512</a></p>
      </footer>
    </div>
  );
}

