
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
  MobileAnalysis as AiMobileAnalysis
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


export interface OnPageItem { // This type is becoming more generic for any accordion item
  id: string; 
  icon: LucideIcon; 
  title: string;
  statusText: string;
  statusColorClass: string; 
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
  content?: string | React.ReactNode; // Can be simple text or complex data structure
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

  // Fields for the header card (some might overlap or be derived)
  urlAnalyzed?: string;
  analysisTimestamp?: string | number; 
  passedPercent?: number; 
  toImprovePercent?: number; 
  errorsPercent?: number; 
};
