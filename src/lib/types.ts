
import type { LucideIcon } from 'lucide-react';
// Import detailed types from the new schema file
import type { 
  OnPageDetailItem as AiOnPageDetailItem,
  HeadingsAnalysis as AiHeadingsAnalysis,
  ContentAnalysis as AiContentAnalysis,
  AltAttributeAnalysis as AiAltAttributeAnalysis,
  InPageLinksAnalysis as AiInPageLinksAnalysis,
  LinkItem as AiLinkItem,
  KeywordItem as AiKeywordItem,
  HeadingItem as AiHeadingItem,
  GooglePreviewData as AiGooglePreviewData, 
  MonthlyTrafficData as AiMonthlyTrafficData,
  // Indexing Analysis Types
  IndexingAnalysis as AiIndexingAnalysis,
  WebFeedsAnalysis as AiWebFeedsAnalysis,
  UrlResolveAnalysis as AiUrlResolveAnalysis,
  RobotsTxtAnalysis as AiRobotsTxtAnalysis,
  XmlSitemapAnalysis as AiXmlSitemapAnalysis,
  SitemapValidityAnalysis as AiSitemapValidityAnalysis,
  UrlParametersAnalysis as AiUrlParametersAnalysis,
  WebFeedItem as AiWebFeedItem,
  UrlResolveItem as AiUrlResolveItem,
  SitemapValidityCheckItem as AiSitemapValidityCheckItem
} from '@/ai/schemas/seo-report-schemas';

export interface GooglePreviewData extends AiGooglePreviewData {}
export interface HeadingItem extends AiHeadingItem {}
export interface HeadingsAnalysis extends AiHeadingsAnalysis {}
export interface KeywordItem extends AiKeywordItem {}
export interface ContentAnalysis extends AiContentAnalysis {}
export interface AltAttributeAnalysis extends AiAltAttributeAnalysis {}
export interface LinkItem extends AiLinkItem {}
export interface InPageLinksAnalysis extends AiInPageLinksAnalysis {}

// Indexing Analysis Interfaces (mirroring AI Schemas)
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


export interface OnPageItem {
  id: string; 
  icon: LucideIcon; 
  title: string;
  statusText: string;
  statusColorClass: string; 
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
  content?: string | React.ReactNode; 
  details?: string; 
  googleDesktopPreview?: GooglePreviewData;
  googleMobilePreview?: GooglePreviewData;
  
  // Specific data for On-Page sections
  headingsAnalysis?: HeadingsAnalysis;
  contentAnalysisData?: ContentAnalysis;
  altAttributeAnalysis?: AltAttributeAnalysis;
  inPageLinksAnalysis?: InPageLinksAnalysis;

  // Specific data for Indexing sections
  webFeedsData?: WebFeedsAnalysis;
  urlResolveData?: UrlResolveAnalysis;
  robotsTxtData?: RobotsTxtAnalysis;
  xmlSitemapData?: XmlSitemapAnalysis;
  sitemapValidityData?: SitemapValidityAnalysis;
  urlParametersData?: UrlParametersAnalysis;
}


export type ReportData = {
  // Fields from the AI flow
  report: string; 
  score: number; 
  performanceReport: string;
  performanceScore: number;
  websiteTraffic?: AiMonthlyTrafficData[];
  onPageScore?: number;
  offPageScore?: number;
  technicalScore?: number;
  contentScore?: number;
  uxScore?: number;
  lcpValue?: string;
  lcpStatus?: "Good" | "Improve" | "Poor";
  clsValue?: string;
  clsStatus?: "Good" | "Improve" | "Poor";
  fidValue?: string;
  fidStatus?: "Good" | "Improve" | "Poor";

  // On-Page structured data
  onPageSeoDetails?: AiOnPageDetailItem[]; 
  headingsAnalysis?: AiHeadingsAnalysis;
  contentAnalysis?: AiContentAnalysis;
  altAttributeAnalysis?: AiAltAttributeAnalysis;
  inPageLinksAnalysis?: AiInPageLinksAnalysis;

  // Indexing structured data
  indexingAnalysis?: AiIndexingAnalysis;


  // New fields for the redesigned header card
  urlAnalyzed?: string;
  analysisTimestamp?: string | number; 
  passedPercent?: number; 
  toImprovePercent?: number; 
  errorsPercent?: number; 
};

