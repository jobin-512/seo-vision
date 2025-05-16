
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

  // Placeholder for future detailed structured report data for accordion
  // e.g., onPageDetails?: OnPageSectionData;
  // technicalSeoDetails?: TechnicalSeoSectionData;
};

// Example structure for accordion data (to be defined later)
/*
export type OnPageSectionData = {
  titleTag: ReportItemDetail;
  metaDescription: ReportItemDetail;
  // ... other on-page items
};

export type ReportItemDetail = {
  title: string;
  status: 'Passed' | 'To Improve' | 'Error' | 'Informational' | 'Outdated';
  description: string;
  details?: string; // e.g., "Length: 71 character(s) (519 pixels)"
  // impact?: 'High' | 'Medium' | 'Low';
  // effort?: 'Low' | 'Medium' | 'High';
};
*/
