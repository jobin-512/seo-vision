
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
  GooglePreviewData as AiGooglePreviewData, // Renaming to avoid conflict if needed
  MonthlyTrafficData as AiMonthlyTrafficData // Renaming to avoid conflict if needed
} from '@/ai/schemas/seo-report-schemas';

export interface GooglePreviewData extends AiGooglePreviewData {}

// Individual Heading Item (e.g. H1: "Welcome")
export interface HeadingItem extends AiHeadingItem {}

// Structure for Headings Analysis
export interface HeadingsAnalysis extends AiHeadingsAnalysis {}

// Individual Keyword Item
export interface KeywordItem extends AiKeywordItem {}

// Structure for Content Analysis (Keywords)
export interface ContentAnalysis extends AiContentAnalysis {}

// Structure for Alt Attribute Analysis
export interface AltAttributeAnalysis extends AiAltAttributeAnalysis {}

// Individual Link Item for the table
export interface LinkItem extends AiLinkItem {}

// Structure for In-Page Links Analysis
export interface InPageLinksAnalysis extends AiInPageLinksAnalysis {}


export interface OnPageItem {
  id: string; // e.g., "titleTag", "metaDescription", "headings", "contentAnalysis"
  icon: LucideIcon; // Mapped on frontend
  title: string;
  statusText: string;
  statusColorClass: string; // e.g., "text-accent", "text-warning", "text-muted-foreground"
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
  content?: string | React.ReactNode; // Main textual content or React node OR specific data structure
  details?: string; // Additional details like length
  googleDesktopPreview?: GooglePreviewData;
  googleMobilePreview?: GooglePreviewData;
  // Specific data for new sections
  headingsAnalysis?: HeadingsAnalysis;
  contentAnalysisData?: ContentAnalysis;
  altAttributeAnalysis?: AltAttributeAnalysis;
  inPageLinksAnalysis?: InPageLinksAnalysis;
}


export type ReportData = {
  // Fields from the AI flow
  report: string; // Overall text report
  score: number; // Overall SEO score (0-100)
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

  // New field for AI-generated on-page details
  onPageSeoDetails?: AiOnPageDetailItem[]; // Data directly from AI

  // New structured data fields from AI
  headingsAnalysis?: AiHeadingsAnalysis;
  contentAnalysis?: AiContentAnalysis;
  altAttributeAnalysis?: AiAltAttributeAnalysis;
  inPageLinksAnalysis?: AiInPageLinksAnalysis;


  // New fields for the redesigned header card
  urlAnalyzed?: string;
  analysisTimestamp?: string | number; // Could be ISO string or epoch
  passedPercent?: number; // Percentage for the "Passed" progress bar
  toImprovePercent?: number; // Percentage for the "To Improve" progress bar
  errorsPercent?: number; // Percentage for the "Errors" progress bar
};
