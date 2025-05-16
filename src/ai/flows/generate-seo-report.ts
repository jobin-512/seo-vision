
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

const GooglePreviewDataSchema = z.object({
  url: z.string().describe("The display URL for the preview."),
  title: z.string().describe("The title text for the preview."),
  description: z.string().describe("The description snippet for the preview.")
});

const OnPageDetailItemSchema = z.object({
  id: z.string().describe("Identifier for the item, e.g., 'titleTag', 'metaDescription', 'googlePreview'."),
  title: z.string().describe("The display title of the on-page SEO item, e.g., 'Title Tag'."),
  statusText: z.string().describe("A status description, e.g., 'Outdated', 'Good', 'Needs Improvement'."),
  statusColorClass: z.string().describe("Tailwind class for status color, e.g., 'text-warning', 'text-accent'."),
  content: z.string().optional().describe("Main content, e.g., the text of the title tag or meta description."),
  details: z.string().optional().describe("Additional details, e.g., character length."),
  googleDesktopPreview: GooglePreviewDataSchema.optional(),
  googleMobilePreview: GooglePreviewDataSchema.optional(),
});
export type OnPageDetailItem = z.infer<typeof OnPageDetailItemSchema>;


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
  onPageSeoDetails: z.array(OnPageDetailItemSchema).optional().describe("Structured details for on-page SEO items like Title Tag, Meta Description, and Google Preview, based on the analyzed URL.")
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

  For the 'On-Page' SEO section (onPageSeoDetails), provide an array of objects for the following items based on your analysis of the URL ({{{url}}}):
  1.  **Title Tag**:
      *   id: "titleTag"
      *   title: "Title Tag"
      *   statusText: (e.g., "Good", "Outdated", "Too long", "Too short", "Missing") - be specific.
      *   statusColorClass: (e.g., "text-accent" for Good, "text-warning" for Outdated/Too long/Too short, "text-destructive" for Missing)
      *   content: The plausible current text of the title tag for the website.
      *   details: The character length of this title tag, e.g., "Length: 70 character(s)".
  2.  **Meta Description**:
      *   id: "metaDescription"
      *   title: "Meta Description"
      *   statusText: (e.g., "Good", "Outdated", "Too long", "Too short", "Missing") - be specific.
      *   statusColorClass: (e.g., "text-accent" for Good, "text-warning" for Outdated/Too long/Too short, "text-destructive" for Missing)
      *   content: The plausible current text of the meta description for the website.
      *   details: The character length of this meta description, e.g., "Length: 155 character(s)".
  3.  **Google Preview**:
      *   id: "googlePreview"
      *   title: "Google Preview"
      *   statusText: (e.g., "Looks good", "Description too long", "Title too long")
      *   statusColorClass: (e.g., "text-accent" for good, "text-warning" for issues)
      *   googleDesktopPreview: Generate a plausible desktop Google search snippet with fields: 'url' (use the domain from {{{url}}}), 'title' (a plausible search result title), 'description' (a plausible search result description).
      *   googleMobilePreview: Generate a plausible mobile Google search snippet with fields: 'url' (use the full {{{url}}}), 'title' (a plausible search result title for mobile), 'description' (a plausible search result description for mobile, likely shorter).

  Ensure that the statusText and statusColorClass are appropriate for each item.
  For statusColorClass: use 'text-accent' for positive statuses, 'text-warning' for moderate issues or suggestions, and 'text-destructive' for critical issues or missing elements.

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

