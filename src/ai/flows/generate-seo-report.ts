
'use server';
/**
 * @fileOverview Generates a comprehensive SEO report for a given URL.
 *
 * - generateSeoReport - A function that initiates the SEO report generation process.
 * - GenerateSeoReportInput - The input type for the generateSeoReport function.
 * - GenerateSeoReportOutput - The return type for the generateSeoReport function.
 */

import {ai} from '@/ai/genkit';
import { getWebsiteTrafficDataTool } from '@/ai/tools/get-website-traffic-tool';
import { 
  GenerateSeoReportInputSchema, 
  type GenerateSeoReportInput,
  GenerateSeoReportOutputSchema,
  type GenerateSeoReportOutput
} from '@/ai/schemas/seo-report-schemas';

// Export types for external use (e.g., by the frontend)
export type { 
  GenerateSeoReportInput, 
  GenerateSeoReportOutput,
  OnPageDetailItem,
  HeadingsAnalysis,
  ContentAnalysis,
  AltAttributeAnalysis,
  InPageLinksAnalysis,
  LinkItem,
  KeywordItem,
  HeadingItem,
  GooglePreviewData,
  MonthlyTrafficData
} from '@/ai/schemas/seo-report-schemas';


export async function generateSeoReport(input: GenerateSeoReportInput): Promise<GenerateSeoReportOutput> {
  return generateSeoReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSeoReportPrompt',
  input: {schema: GenerateSeoReportInputSchema},
  output: {schema: GenerateSeoReportOutputSchema},
  tools: [getWebsiteTrafficDataTool],
  prompt: `You are an expert SEO analyst. Analyze the website at the given URL ({{{url}}}) and generate a comprehensive SEO report.

  For each section below, determine a 'statusText' (e.g., 'Good', 'Needs Improvement', 'Outdated', 'Multiple H1s', 'Well-optimized', 'All images have alts', 'Some missing', 'Good link distribution') and a 'statusColorClass' (Tailwind CSS class: 'text-accent' for good, 'text-warning' for moderate issues, 'text-destructive' for critical issues, 'text-muted-foreground' for informational/neutral).

  If content for a field (like title tag text or meta description text) is missing or not found, please return an empty string "" rather than null.

  1.  **Overall Report & Scores**:
      *   Identify problems and provide optimization suggestions in the main 'report' field.
      *   Calculate an overall 'score' (0-100).
      *   Generate a 'performanceReport' and 'performanceScore' (0-100).
      *   Provide specific scores (0-100) for: 'onPageScore', 'offPageScore', 'technicalScore', 'contentScore', 'uxScore'.
      *   Determine Core Web Vitals: 'lcpValue' (e.g., "2.5s") & 'lcpStatus' ("Good", "Improve", "Poor"), 'clsValue' & 'clsStatus', 'fidValue' & 'fidStatus'.

  2.  **On-Page SEO Details ('onPageSeoDetails')**:
      *   Provide an array for these items based on analysis of {{{url}}}:
          *   **Title Tag**: id "titleTag", title "Title Tag". statusText, statusColorClass. 'content' (plausible current text, empty string if missing), 'details' (char length).
          *   **Meta Description**: id "metaDescription", title "Meta Description". statusText, statusColorClass. 'content' (plausible current text, empty string if missing), 'details' (char length).
          *   **Google Preview**: id "googlePreview", title "Google Preview". statusText, statusColorClass. 'googleDesktopPreview' (url, title, description), 'googleMobilePreview' (url, title, description).

  3.  **Headings Analysis ('headingsAnalysis')**:
      *   statusText, statusColorClass.
      *   Counts: 'h1Count', 'h2Count', 'h3Count', 'h4Count', 'h5Count', 'h6Count'.
      *   'headings': Array of {tag, text} for representative headings. Limit to first 5-7 of each type. Truncate text to 50 chars if very long.

  4.  **Content Analysis ('contentAnalysis')**:
      *   statusText, statusColorClass.
      *   'keywords': Array of {keyword, count} for top 10-20 keywords/keyphrases.

  5.  **Alt Attribute Analysis ('altAttributeAnalysis')**:
      *   statusText, statusColorClass.
      *   'totalImages', 'imagesMissingAlts'.
      *   'details': Brief summary message, e.g., "We found X images on this web page. Y ALT attributes are missing/present."

  6.  **In-Page Links Analysis ('inPageLinksAnalysis')**:
      *   statusText, statusColorClass.
      *   Counts: 'totalLinks', 'internalLinks', 'externalLinksFollow', 'externalLinksNofollow'.
      *   'details': Brief summary, e.g., "We found a total of X link(s) including Y link(s) to files."
      *   'links': Array of {anchorText (use 'No Anchor Text' if empty, truncate to 50 chars), url (truncate to 70 chars), type ("Internal"/"External"), followStatus ("Follow"/"Nofollow"/"Unknown")}. Limit to first 5-10 links.

  Use the 'getWebsiteTrafficData' tool to fetch website traffic data for {{{url}}} for the last 6 months. Include this in 'websiteTraffic'. If no data, omit or set to empty array.

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

