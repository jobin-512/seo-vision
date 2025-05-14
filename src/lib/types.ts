
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
};

