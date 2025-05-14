
export type ReportData = {
  report: string;
  score: number;
  performanceReport: string;
  performanceScore: number;
  websiteTraffic?: { month: string; visits: number }[];
};
