
export type ReportData = {
  report: string;
  score: number;
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
};

