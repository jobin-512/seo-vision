
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
