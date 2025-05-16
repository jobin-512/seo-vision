
import type { LucideIcon } from 'lucide-react';
import type { OnPageDetailItem as AiOnPageDetailItem } from '@/ai/flows/generate-seo-report'; // Import the AI type

export interface GooglePreviewData {
  url: string;
  title: string;
  description: string;
}

export interface OnPageItem {
  id: string; // e.g., "titleTag", "metaDescription"
  icon: LucideIcon; // Mapped on frontend
  title: string;
  statusText: string;
  statusColorClass: string; // e.g., "text-accent", "text-warning", "text-muted-foreground"
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
  content?: string | React.ReactNode; // Main textual content or React node
  details?: string; // Additional details like length
  googleDesktopPreview?: GooglePreviewData;
  googleMobilePreview?: GooglePreviewData;
}


export type ReportData = {
  // Fields from the AI flow
  report: string; // Overall text report
  score: number; // Overall SEO score (0-100)
  performanceReport: string;
  performanceScore: number;
  websiteTraffic?: { month: string; visits: number }[];
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

  // New fields for the redesigned header card
  urlAnalyzed?: string;
  analysisTimestamp?: string | number; // Could be ISO string or epoch
  passedPercent?: number; // Percentage for the "Passed" progress bar
  toImprovePercent?: number; // Percentage for the "To Improve" progress bar
  errorsPercent?: number; // Percentage for the "Errors" progress bar

  // Note: The frontend might transform AiOnPageDetailItem[] into OnPageItem[] for rendering.
  // If transformation happens before setting state, then onPageSeoDetails in state could be OnPageItem[].
  // For clarity, keeping them separate for now. If state stores transformed data, adjust ReportData type.
};
