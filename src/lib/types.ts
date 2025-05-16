
import type { LucideIcon } from 'lucide-react';

export interface GooglePreviewData {
  url: string;
  title: string;
  description: string;
}

export interface OnPageItem {
  id: string;
  icon: LucideIcon;
  title: string;
  statusText: string;
  statusColorClass: string; // e.g., "text-accent", "text-warning", "text-muted-foreground"
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
  content?: string | React.ReactNode; // Main textual content or React node
  details?: string; // Additional details like length
  googleDesktopPreview?: GooglePreviewData;
  googleMobilePreview?: GooglePreviewData;
  // Optional fields for filtering if needed later
  // impact?: 'High' | 'Medium' | 'Low';
  // effort?: 'Low' | 'Medium' | 'High';
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

  // New fields for the redesigned header card
  urlAnalyzed?: string;
  analysisTimestamp?: string | number; // Could be ISO string or epoch
  passedPercent?: number; // Percentage for the "Passed" progress bar
  toImprovePercent?: number; // Percentage for the "To Improve" progress bar
  errorsPercent?: number; // Percentage for the "Errors" progress bar

  // Structured data for accordion sections
  onPageSeoDetails?: OnPageItem[]; 
  // technicalSeoDetails?: OnPageItem[];
  // ... other sections
};
