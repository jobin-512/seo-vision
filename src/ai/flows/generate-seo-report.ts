
'use server';
/**
 * @fileOverview Generates a comprehensive SEO report for a given URL.
 *
 * - generateSeoReport - A function that initiates the SEO report generation process.
 * - GenerateSeoReportInput - The input type for the generateSeoReport function.
 * - GenerateSeoReportOutput - The return type for the generateSeoReportOutput function.
 */

import {ai} from '@/ai/genkit';
import { getWebsiteTrafficDataTool } from '@/ai/tools/get-website-traffic-tool';
import { 
  GenerateSeoReportInputSchema, 
  GenerateSeoReportOutputSchema,
  // Import all other necessary schemas from the dedicated schema file
  type MonthlyTrafficData,
  type GooglePreviewData,
  type OnPageDetailItem,
  type HeadingItem,
  type HeadingsAnalysis,
  type KeywordItem,
  type ContentAnalysis,
  type AltAttributeAnalysis,
  type LinkItem,
  type InPageLinksAnalysis,
  type WebFeedItem,
  type WebFeedsAnalysis,
  type UrlResolveItem,
  type UrlResolveAnalysis,
  type RobotsTxtAnalysis,
  type XmlSitemapAnalysis,
  type SitemapValidityCheckItem,
  type SitemapValidityAnalysis,
  type UrlParametersAnalysis,
  type IndexingAnalysis,
  // Technical SEO
  type RobotsTagItem,
  type RobotsTagsAnalysis,
  type IndexFollowAnalysis,
  type HreflangTagsAnalysis,
  type BrokenLinksAnalysis,
  type UnderscoresInUrlsAnalysis,
  type DiscoveredPagesAnalysis,
  type TechnicalSeoAnalysis,
  // Mobile
  type MobileFriendlinessAnalysis,
  type MobileRenderingAnalysis,
  type TapTargetsAnalysis,
  type MobileAnalysis,
  // Structured Data
  type SchemaTypeBadge,
  type SchemaIssueItem,
  type SchemaOrgAnalysis,
  type OpenGraphTag,
  type OpenGraphPreview,
  type OpenGraphAnalysis,
  type StructuredDataAnalysis
} from '@/ai/schemas/seo-report-schemas';

// Export types for external use (e.g., by the frontend)
// Re-export main input/output and all detailed types
export type { 
  GenerateSeoReportInput, 
  GenerateSeoReportOutput,
  MonthlyTrafficData,
  GooglePreviewData,
  OnPageDetailItem,
  HeadingItem,
  HeadingsAnalysis,
  KeywordItem,
  ContentAnalysis,
  AltAttributeAnalysis,
  LinkItem,
  InPageLinksAnalysis,
  WebFeedItem,
  WebFeedsAnalysis,
  UrlResolveItem,
  UrlResolveAnalysis,
  RobotsTxtAnalysis,
  XmlSitemapAnalysis,
  SitemapValidityCheckItem,
  SitemapValidityAnalysis,
  UrlParametersAnalysis,
  IndexingAnalysis,
  // Technical SEO
  RobotsTagItem,
  RobotsTagsAnalysis,
  IndexFollowAnalysis,
  HreflangTagsAnalysis,
  BrokenLinksAnalysis,
  UnderscoresInUrlsAnalysis,
  DiscoveredPagesAnalysis,
  TechnicalSeoAnalysis,
  // Mobile
  MobileFriendlinessAnalysis,
  MobileRenderingAnalysis,
  TapTargetsAnalysis,
  MobileAnalysis,
  // Structured Data
  SchemaTypeBadge,
  SchemaIssueItem,
  SchemaOrgAnalysis,
  OpenGraphTag,
  OpenGraphPreview,
  OpenGraphAnalysis,
  StructuredDataAnalysis
};


export async function generateSeoReport(input: GenerateSeoReportInput): Promise<GenerateSeoReportOutput> {
  return generateSeoReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSeoReportPrompt',
  input: {schema: GenerateSeoReportInputSchema},
  output: {schema: GenerateSeoReportOutputSchema},
  tools: [getWebsiteTrafficDataTool],
  prompt: `You are an expert SEO analyst. Analyze the website at the given URL ({{{url}}}) and generate a comprehensive SEO report.

  For each section and sub-section, determine a 'statusText' (e.g., 'Good', 'Needs Improvement', 'Outdated', 'Multiple H1s', 'Well-optimized', 'All images have alts', 'Some missing', 'Good link distribution', 'OK', 'Error', 'Very Good', 'Perfect', '10 Warnings') and a 'statusColorClass' (Tailwind CSS class: 'text-accent' for good, 'text-warning' for moderate issues, 'text-destructive' for critical issues, 'text-muted-foreground' for informational/neutral).

  If content for a field (like title tag text, meta description text, or URLs) is missing or not found, please return an empty string "" or an empty array [] as appropriate, rather than null, unless the schema specifically allows null. Use a placeholder image URL like "https://placehold.co/600x315.png" if an actual image URL for Open Graph preview is not found, appending data-ai-hint with relevant keywords.

  1.  **Overall Report & Scores**:
      *   Identify problems and provide optimization suggestions in the main 'report' field.
      *   Calculate an overall 'score' (0-100).
      *   Generate a 'performanceReport' and 'performanceScore' (0-100).
      *   Provide specific scores (0-100) for: 'onPageScore', 'offPageScore', 'technicalScore', 'contentScore', 'uxScore'.
      *   Determine Core Web Vitals: 'lcpValue' (e.g., "2.5s") & 'lcpStatus' ("Good", "Improve", "Poor"), 'clsValue' & 'clsStatus', 'fidValue' & 'fidStatus'.

  2.  **On-Page SEO Details ('onPageSeoDetails')**: (Array of items for Title Tag, Meta Description, Google Preview)
      *   **Title Tag**: id "titleTag", title "Title Tag". statusText, statusColorClass. 'content' (current text or empty string), 'details' (char length).
      *   **Meta Description**: id "metaDescription", title "Meta Description". statusText, statusColorClass. 'content' (current text or empty string), 'details' (char length).
      *   **Google Preview**: id "googlePreview", title "Google Preview". statusText, statusColorClass. 'googleDesktopPreview' (url, title, description), 'googleMobilePreview' (url, title, description).

  3.  **Headings Analysis ('headingsAnalysis')**:
      *   statusText, statusColorClass. Counts: 'h1Count', 'h2Count', 'h3Count', 'h4Count', 'h5Count', 'h6Count'. 'headings': Array of {tag, text} for representative headings. Limit to first 5-7 of each type. Truncate text to 50 chars if very long.

  4.  **Content Analysis ('contentAnalysis')**:
      *   statusText, statusColorClass. 'keywords': Array of {keyword, count} for top 10-20 keywords.

  5.  **Alt Attribute Analysis ('altAttributeAnalysis')**:
      *   statusText, statusColorClass. 'totalImages', 'imagesMissingAlts'. 'details': Brief summary.

  6.  **In-Page Links Analysis ('inPageLinksAnalysis')**:
      *   statusText, statusColorClass. Counts: 'totalLinks', 'internalLinks', 'externalLinksFollow', 'externalLinksNofollow'. 'details': Brief summary. 'links': Array of {anchorText (use 'No Anchor Text' if empty, truncate to 50 chars), url (truncate to 70 chars), type ("Internal"/"External"), followStatus ("Follow"/"Nofollow"/"Unknown")}. Limit to first 5-10 links.

  7.  **Indexing Analysis ('indexingAnalysis')**:
      *   **Web Feeds ('webFeeds')**: statusText, statusColorClass. 'details'. 'feeds': array of {url, format}.
      *   **URL Resolve ('urlResolve')**: statusText, statusColorClass. 'details'. 'resolutions': array of {originalUrl, resolvedUrl}.
      *   **Robots.txt ('robotsTxt')**: statusText, statusColorClass. 'robotsTxtUrl'. 'findings': array of strings.
      *   **XML Sitemap ('xmlSitemap')**: statusText, statusColorClass. 'sitemapUrl'. 'details'.
      *   **Sitemaps Validity ('sitemapValidity')**: statusText, statusColorClass. 'sitemapUrl'. 'summary'. 'checks': array of {text, type ("check", "issue", "positive")}.
      *   **URL Parameters ('urlParameters')**: statusText, statusColorClass. 'details'.

  8.  **Technical SEO Analysis ('technicalSeoAnalysis')**:
      *   **Robots Tags ('robotsTags')**: statusText, statusColorClass. 'details'. 'foundTags': array of {tag, source}.
      *   **Index and Follow ('indexFollow')**: statusText, statusColorClass. 'details'.
      *   **Hreflang Tags ('hreflangTags')**: statusText, statusColorClass. 'details'.
      *   **Broken Links ('brokenLinks')**: statusText, statusColorClass. 'details'.
      *   **Underscores in URLs ('underscoresInUrls')**: statusText, statusColorClass. 'details'.
      *   **Discovered Pages ('discoveredPages')**: statusText, statusColorClass. 'count', 'details'.

  9.  **Mobile Analysis ('mobileAnalysis')**:
      *   **Mobile Friendliness ('mobileFriendliness')**: statusText, statusColorClass. 'ratingText', 'progressValue', 'details'.
      *   **Mobile Rendering ('mobileRendering')**: statusText, statusColorClass. 'details'. (No image URL needed).
      *   **Tap Targets ('tapTargets')**: statusText, statusColorClass. 'details'.

  10. **Structured Data Analysis ('structuredDataAnalysis')**:
      *   **Schema.org ('schemaOrg')**:
          *   statusText, statusColorClass (e.g., "Good", "Multiple Issues", "Outdated").
          *   'schemaTypes': Array of {type (e.g., "Product", "FAQPage"), count}.
          *   'issues': Array of {text (description of issue), severity ("warning" or "error")}. Limit to 5-7 representative issues.
          *   'warningCount': Total number of warnings found.
      *   **Open Graph Protocol ('openGraph')**:
          *   statusText, statusColorClass (e.g., "Well Implemented", "Missing Key Tags").
          *   'previewData': {title, description, imageUrl (use placeholder "https://placehold.co/600x315.png?text=Open+Graph+Preview" if none found, add data-ai-hint="social media share"), url (or siteName)}.
          *   'tags': Array of {tag (e.g., "og:type", "og:title"), value}. Include common tags like og:type, og:title, og:description, og:image, og:url, og:site_name if found.

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

