
'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { getWebsiteTrafficDataTool } from '@/ai/tools/get-website-traffic-tool';

const GenerateSeoReportInputSchema = z.object({
  url: z.string().describe('The URL of the website to analyze.'),
});
export type GenerateSeoReportInput = z.infer<typeof GenerateSeoReportInputSchema>;

const MonthlyTrafficDataSchema = z.object({
  month: z.string(),
  visits: z.number(),
});

const GenerateSeoReportOutputSchema = z.object({
  report: z.string().describe('A comprehensive SEO report, including identified problems and optimization suggestions.'),
  score: z.number().describe('An SEO score (out of 100) representing the overall performance of the website.'),
  performanceReport: z.string().describe('Performance report of the website'),
  performanceScore: z.number().describe('A score out of 100 of website performance.'),
  websiteTraffic: z.array(MonthlyTrafficDataSchema)
    .optional()
    .describe('Monthly website traffic data for the past 6 months. This data is fetched using the getWebsiteTrafficData tool.'),
  onPageScore: z.number().min(0).max(100).optional().describe('Score for On-Page SEO factors (0-100).'),
  offPageScore: z.number().min(0).max(100).optional().describe('Score for Off-Page SEO factors (0-100).'),
  technicalScore: z.number().min(0).max(100).optional().describe('Score for Technical SEO factors (0-100).'),
  contentScore: z.number().min(0).max(100).optional().describe('Score for Content quality and relevance (0-100).'),
  uxScore: z.number().min(0).max(100).optional().describe('Score for User Experience (UX) factors (0-100).'),
  lcpValue: z.string().optional().describe('Largest Contentful Paint value (e.g., "2.5s").'),
  lcpStatus: z.enum(["Good", "Improve", "Poor"]).optional().describe('Largest Contentful Paint status.'),
  clsValue: z.string().optional().describe('Cumulative Layout Shift value (e.g., "0.1").'),
  clsStatus: z.enum(["Good", "Improve", "Poor"]).optional().describe('Cumulative Layout Shift status.'),
  fidValue: z.string().optional().describe('First Input Delay value (e.g., "100ms").'),
  fidStatus: z.enum(["Good", "Improve", "Poor"]).optional().describe('First Input Delay status.'),
});
export type GenerateSeoReportOutput = z.infer<typeof GenerateSeoReportOutputSchema>;

export async function generateSeoReport(input: GenerateSeoReportInput): Promise<GenerateSeoReportOutput> {
  return generateSeoReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSeoReportPrompt',
  input: {schema: GenerateSeoReportInputSchema},
  output: {schema: GenerateSeoReportOutputSchema},
  tools: [getWebsiteTrafficDataTool],
  prompt: `You are an expert SEO analyst. Analyze the website at the given URL and generate a comprehensive SEO report.

  Identify problems and provide optimization suggestions.
  Also, calculate an SEO score (out of 100) to represent the overall performance of the website.
  Generate a performance report with a performance score out of 100.

  In addition, provide specific scores (0-100) for the following SEO factors:
  - On-Page SEO (onPageScore)
  - Off-Page SEO (offPageScore)
  - Technical SEO (technicalScore)
  - Content Quality & Relevance (contentScore)
  - User Experience (UX) (uxScore)

  Also, determine the Core Web Vitals for the site:
  - Largest Contentful Paint (LCP): Provide the value (e.g., "2.5s") and its status ("Good", "Improve", or "Poor") as lcpValue and lcpStatus.
  - Cumulative Layout Shift (CLS): Provide the value (e.g., "0.1") and its status ("Good", "Improve", or "Poor") as clsValue and clsStatus.
  - First Input Delay (FID): Provide the value (e.g., "100ms") and its status ("Good", "Improve", or "Poor") as fidValue and fidStatus.

  Use the 'getWebsiteTrafficData' tool to fetch website traffic data for the URL: {{{url}}} for the last 6 months. Include this traffic data in your output. If the tool returns an error or no data, omit the websiteTraffic field or set it to an empty array.

  URL: {{{url}}}
`,
});

const generateSeoReportFlow = ai.defineFlow(
  {
    name: 'generateSeoReportFlow',
    inputSchema: GenerateSeoReportInputSchema,
    outputSchema: GenerateSeoReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

