
import type { LucideIcon } from 'lucide-react';
// Import detailed types from the new schema file
import type { 
  // Shared/General
  GooglePreviewData as AiGooglePreviewData, 
  MonthlyTrafficData as AiMonthlyTrafficData,
  // On-Page
  OnPageDetailItem as AiOnPageDetailItem,
  HeadingItem as AiHeadingItem,
  HeadingsAnalysis as AiHeadingsAnalysis,
  KeywordItem as AiKeywordItem,
  ContentAnalysis as AiContentAnalysis,
  AltAttributeAnalysis as AiAltAttributeAnalysis,
  LinkItem as AiLinkItem,
  InPageLinksAnalysis as AiInPageLinksAnalysis,
  // Indexing
  IndexingAnalysis as AiIndexingAnalysis,
  WebFeedItem as AiWebFeedItem,
  WebFeedsAnalysis as AiWebFeedsAnalysis,
  UrlResolveItem as AiUrlResolveItem,
  UrlResolveAnalysis as AiUrlResolveAnalysis,
  RobotsTxtAnalysis as AiRobotsTxtAnalysis,
  XmlSitemapAnalysis as AiXmlSitemapAnalysis,
  SitemapValidityCheckItem as AiSitemapValidityCheckItem,
  SitemapValidityAnalysis as AiSitemapValidityAnalysis,
  UrlParametersAnalysis as AiUrlParametersAnalysis,
  // Technical SEO
  RobotsTagItem as AiRobotsTagItem,
  RobotsTagsAnalysis as AiRobotsTagsAnalysis,
  IndexFollowAnalysis as AiIndexFollowAnalysis,
  HreflangTagsAnalysis as AiHreflangTagsAnalysis,
  BrokenLinksAnalysis as AiBrokenLinksAnalysis,
  UnderscoresInUrlsAnalysis as AiUnderscoresInUrlsAnalysis,
  DiscoveredPagesAnalysis as AiDiscoveredPagesAnalysis,
  TechnicalSeoAnalysis as AiTechnicalSeoAnalysis,
  // Mobile
  MobileFriendlinessAnalysis as AiMobileFriendlinessAnalysis,
  MobileRenderingAnalysis as AiMobileRenderingAnalysis,
  TapTargetsAnalysis as AiTapTargetsAnalysis,
  MobileAnalysis as AiMobileAnalysis,
  // Structured Data
  SchemaTypeBadge as AiSchemaTypeBadge,
  SchemaIssueItem as AiSchemaIssueItem,
  SchemaOrgAnalysis as AiSchemaOrgAnalysis,
  OpenGraphTag as AiOpenGraphTag,
  OpenGraphPreview as AiOpenGraphPreview,
  OpenGraphAnalysis as AiOpenGraphAnalysis,
  TwitterTag as AiTwitterTag,
  TwitterCardPreview as AiTwitterCardPreview,
  TwitterCardAnalysis as AiTwitterCardAnalysis,
  StructuredDataAnalysis as AiStructuredDataAnalysis,
  // Microformats
  MicroformatItem as AiMicroformatItem,
  MicroformatsAnalysis as AiMicroformatsAnalysis,
  // Security
  EmailPrivacyAnalysis as AiEmailPrivacyAnalysis,
  DmarcAnalysis as AiDmarcAnalysis,
  SslCheckItem as AiSslCheckItem,
  SslSecureAnalysis as AiSslSecureAnalysis,
  MixedContentAnalysis as AiMixedContentAnalysis,
  SecurityAnalysis as AiSecurityAnalysis,
  // Performance
  AssetMinificationAnalysis as AiAssetMinificationAnalysis,
  PerformanceAnalysis as AiPerformanceAnalysis,
  // Accessibility
  ContrastItem as AiContrastItem,
  ContrastAnalysis as AiContrastAnalysis,
  NavigationCheckItem as AiNavigationCheckItem,
  NavigationAnalysis as AiNavigationAnalysis,
  AccessibilityAnalysis as AiAccessibilityAnalysis,
   // Technologies, Analytics, Doctype, Encoding
  TechnologyItem as AiTechnologyItem,
  TechnologiesAnalysis as AiTechnologiesAnalysis,
  AnalyticsTool as AiAnalyticsTool,
  AnalyticsAnalysis as AiAnalyticsAnalysis,
  DoctypeAnalysis as AiDoctypeAnalysis,
  EncodingAnalysis as AiEncodingAnalysis,
  // Branding
  UrlAnalysis as AiUrlAnalysis,
  FaviconAnalysis as AiFaviconAnalysis,
  Custom404PageAnalysis as AiCustom404PageAnalysis,
  BrandingAnalysis as AiBrandingAnalysis,
  // Domain
  DomainRegistrationAnalysis as AiDomainRegistrationAnalysis,
  DomainAvailabilityItem as AiDomainAvailabilityItem,
  DomainAvailabilityAnalysis as AiDomainAvailabilityAnalysis,
  DomainAnalysis as AiDomainAnalysis,
} from '@/ai/schemas/seo-report-schemas';

// Re-exporting AI types for easier use in components
export interface GooglePreviewData extends AiGooglePreviewData {}
export interface MonthlyTrafficData extends AiMonthlyTrafficData {}
export interface HeadingItem extends AiHeadingItem {}
export interface HeadingsAnalysis extends AiHeadingsAnalysis {}
export interface KeywordItem extends AiKeywordItem {}
export interface ContentAnalysis extends AiContentAnalysis {}
export interface AltAttributeAnalysis extends AiAltAttributeAnalysis {}
export interface LinkItem extends AiLinkItem {}
export interface InPageLinksAnalysis extends AiInPageLinksAnalysis {}

// Indexing Analysis Interfaces
export interface WebFeedItem extends AiWebFeedItem {}
export interface WebFeedsAnalysis extends AiWebFeedsAnalysis {}
export interface UrlResolveItem extends AiUrlResolveItem {}
export interface UrlResolveAnalysis extends AiUrlResolveAnalysis {}
export interface RobotsTxtAnalysis extends AiRobotsTxtAnalysis {}
export interface XmlSitemapAnalysis extends AiXmlSitemapAnalysis {}
export interface SitemapValidityCheckItem extends AiSitemapValidityCheckItem {}
export interface SitemapValidityAnalysis extends AiSitemapValidityAnalysis {}
export interface UrlParametersAnalysis extends AiUrlParametersAnalysis {}
export interface IndexingAnalysis extends AiIndexingAnalysis {}

// Technical SEO Interfaces
export interface RobotsTagItem extends AiRobotsTagItem {}
export interface RobotsTagsAnalysis extends AiRobotsTagsAnalysis {}
export interface IndexFollowAnalysis extends AiIndexFollowAnalysis {}
export interface HreflangTagsAnalysis extends AiHreflangTagsAnalysis {}
export interface BrokenLinksAnalysis extends AiBrokenLinksAnalysis {}
export interface UnderscoresInUrlsAnalysis extends AiUnderscoresInUrlsAnalysis {}
export interface DiscoveredPagesAnalysis extends AiDiscoveredPagesAnalysis {}
export interface TechnicalSeoAnalysis extends AiTechnicalSeoAnalysis {}

// Mobile Analysis Interfaces
export interface MobileFriendlinessAnalysis extends AiMobileFriendlinessAnalysis {}
export interface MobileRenderingAnalysis extends AiMobileRenderingAnalysis {}
export interface TapTargetsAnalysis extends AiTapTargetsAnalysis {}
export interface MobileAnalysis extends AiMobileAnalysis {}

// Structured Data Interfaces
export interface SchemaTypeBadge extends AiSchemaTypeBadge {}
export interface SchemaIssueItem extends AiSchemaIssueItem {}
export interface SchemaOrgAnalysis extends AiSchemaOrgAnalysis {}
export interface OpenGraphTag extends AiOpenGraphTag {}
export interface OpenGraphPreview extends AiOpenGraphPreview {}
export interface OpenGraphAnalysis extends AiOpenGraphAnalysis {}
export interface TwitterTag extends AiTwitterTag {}
export interface TwitterCardPreview extends AiTwitterCardPreview {}
export interface TwitterCardAnalysis extends AiTwitterCardAnalysis {}
export interface StructuredDataAnalysis extends AiStructuredDataAnalysis {}

// Microformats Interfaces
export interface MicroformatItem extends AiMicroformatItem {}
export interface MicroformatsAnalysis extends AiMicroformatsAnalysis {}

// Security Interfaces
export interface EmailPrivacyAnalysis extends AiEmailPrivacyAnalysis {}
export interface DmarcAnalysis extends AiDmarcAnalysis {}
export interface SslCheckItem extends AiSslCheckItem {}
export interface SslSecureAnalysis extends AiSslSecureAnalysis {}
export interface MixedContentAnalysis extends AiMixedContentAnalysis {}
export interface SecurityAnalysis extends AiSecurityAnalysis {}

// Performance Interfaces
export interface AssetMinificationAnalysis extends AiAssetMinificationAnalysis {}
export interface PerformanceAnalysis extends AiPerformanceAnalysis {}

// Accessibility Interfaces
export interface ContrastItem extends AiContrastItem {}
export interface ContrastAnalysis extends AiContrastAnalysis {}
export interface NavigationCheckItem extends AiNavigationCheckItem {}
export interface NavigationAnalysis extends AiNavigationAnalysis {}
export interface AccessibilityAnalysis extends AiAccessibilityAnalysis {}

// Technologies, Analytics, Doctype, Encoding Interfaces
export interface TechnologyItem extends AiTechnologyItem {}
export interface TechnologiesAnalysis extends AiTechnologiesAnalysis {}
export interface AnalyticsTool extends AiAnalyticsTool {}
export interface AnalyticsAnalysis extends AiAnalyticsAnalysis {}
export interface DoctypeAnalysis extends AiDoctypeAnalysis {}
export interface EncodingAnalysis extends AiEncodingAnalysis {}

// Branding Interfaces
export interface UrlAnalysis extends AiUrlAnalysis {}
export interface FaviconAnalysis extends AiFaviconAnalysis {}
export interface Custom404PageAnalysis extends AiCustom404PageAnalysis {}
export interface BrandingAnalysis extends AiBrandingAnalysis {}

// Domain Interfaces
export interface DomainRegistrationAnalysis extends AiDomainRegistrationAnalysis {}
export interface DomainAvailabilityItem extends AiDomainAvailabilityItem {}
export interface DomainAvailabilityAnalysis extends AiDomainAvailabilityAnalysis {}
export interface DomainAnalysis extends AiDomainAnalysis {}


export interface OnPageItem { // This type is becoming more generic for any accordion item
  id: string; 
  icon: LucideIcon; 
  title: string;
  statusText: string;
  statusColorClass: string; 
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
  content?: string | React.ReactNode; 
  details?: string; 
  
  // On-Page specific data
  googleDesktopPreview?: GooglePreviewData;
  googleMobilePreview?: GooglePreviewData;
  headingsAnalysis?: HeadingsAnalysis;
  contentAnalysisData?: ContentAnalysis;
  altAttributeAnalysis?: AltAttributeAnalysis;
  inPageLinksAnalysis?: InPageLinksAnalysis;

  // Indexing specific data
  webFeedsData?: WebFeedsAnalysis;
  urlResolveData?: UrlResolveAnalysis;
  robotsTxtData?: RobotsTxtAnalysis;
  xmlSitemapData?: XmlSitemapAnalysis;
  sitemapValidityData?: SitemapValidityAnalysis;
  urlParametersData?: UrlParametersAnalysis;

  // Technical SEO specific data
  robotsTagsData?: RobotsTagsAnalysis;
  indexFollowData?: IndexFollowAnalysis;
  hreflangTagsData?: HreflangTagsAnalysis;
  brokenLinksData?: BrokenLinksAnalysis;
  underscoresInUrlsData?: UnderscoresInUrlsAnalysis;
  discoveredPagesData?: DiscoveredPagesAnalysis;

  // Mobile specific data
  mobileFriendlinessData?: MobileFriendlinessAnalysis;
  mobileRenderingData?: MobileRenderingAnalysis;
  tapTargetsData?: TapTargetsAnalysis;

  // Structured Data specific data
  schemaOrgData?: SchemaOrgAnalysis;
  openGraphData?: OpenGraphAnalysis;
  twitterCardData?: TwitterCardAnalysis;

  // Microformats specific data
  microformatsData?: MicroformatsAnalysis;

  // Security specific data
  emailPrivacyData?: EmailPrivacyAnalysis;
  dmarcData?: DmarcAnalysis;
  sslSecureData?: SslSecureAnalysis;
  mixedContentData?: MixedContentAnalysis;
  
  // Performance specific data
  assetMinificationData?: AssetMinificationAnalysis;

  // Accessibility specific data
  contrastData?: ContrastAnalysis;
  navigationData?: NavigationAnalysis;

  // Technologies, Analytics, Doctype, Encoding specific data
  technologiesData?: TechnologiesAnalysis;
  analyticsData?: AnalyticsAnalysis;
  doctypeData?: DoctypeAnalysis;
  encodingData?: EncodingAnalysis;

  // Branding specific data
  urlAnalysisData?: UrlAnalysis;
  faviconAnalysisData?: FaviconAnalysis;
  custom404PageData?: Custom404PageAnalysis;

  // Domain specific data
  domainRegistrationData?: DomainRegistrationAnalysis;
  domainAvailabilityData?: DomainAvailabilityAnalysis;
}


export type ReportData = {
  // Fields from the AI flow
  report: string; 
  score: number; 
  performanceReport: string;
  performanceScore: number;
  websiteTraffic?: AiMonthlyTrafficData[];
  
  lcpValue?: string;
  lcpStatus?: "Good" | "Improve" | "Poor";
  clsValue?: string;
  clsStatus?: "Good" | "Improve" | "Poor";
  fidValue?: string;
  fidStatus?: "Good" | "Improve" | "Poor";

  onPageScore?: number;
  offPageScore?: number;
  technicalScore?: number;
  contentScore?: number;
  uxScore?: number;
  
  // Structured data sections
  onPageSeoDetails?: AiOnPageDetailItem[]; 
  headingsAnalysis?: AiHeadingsAnalysis;
  contentAnalysis?: AiContentAnalysis;
  altAttributeAnalysis?: AiAltAttributeAnalysis;
  inPageLinksAnalysis?: AiInPageLinksAnalysis;
  indexingAnalysis?: AiIndexingAnalysis;
  technicalSeoAnalysis?: AiTechnicalSeoAnalysis;
  mobileAnalysis?: AiMobileAnalysis;
  structuredDataAnalysis?: AiStructuredDataAnalysis;
  microformatsAnalysis?: AiMicroformatsAnalysis;
  securityAnalysis?: AiSecurityAnalysis;
  performanceAnalysis?: AiPerformanceAnalysis;
  accessibilityAnalysis?: AiAccessibilityAnalysis;
  technologiesAnalysis?: AiTechnologiesAnalysis;
  analyticsAnalysis?: AiAnalyticsAnalysis;
  doctypeAnalysis?: AiDoctypeAnalysis;
  encodingAnalysis?: AiEncodingAnalysis;
  brandingAnalysis?: AiBrandingAnalysis;
  domainAnalysis?: AiDomainAnalysis;


  // Fields for the header card (some might overlap or be derived)
  urlAnalyzed?: string;
  analysisTimestamp?: string | number; 
  passedPercent?: number; 
  toImprovePercent?: number; 
  errorsPercent?: number; 
};
