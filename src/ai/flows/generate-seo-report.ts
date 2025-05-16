
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
  type MobileAnalysis
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
  MobileAnalysis
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

  For each section and sub-section, determine a 'statusText' (e.g., 'Good', 'Needs Improvement', 'Outdated', 'Multiple H1s', 'Well-optimized', 'All images have alts', 'Some missing', 'Good link distribution', 'OK', 'Error', 'Very Good', 'Perfect') and a 'statusColorClass' (Tailwind CSS class: 'text-accent' for good, 'text-warning' for moderate issues, 'text-destructive' for critical issues, 'text-muted-foreground' for informational/neutral).

  If content for a field (like title tag text, meta description text, or URLs) is missing or not found, please return an empty string "" or an empty array [] as appropriate, rather than null, unless the schema specifically allows null.

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

  7.  **Indexing Analysis ('indexingAnalysis')**:
      *   **Web Feeds ('webFeeds')**: statusText, statusColorClass. 'details' (e.g., "We found X web feed URL(s)..."). 'feeds': array of {url, format ("RSS", "Atom", etc.)}.
      *   **URL Resolve ('urlResolve')**: statusText, statusColorClass. 'details' (e.g., "Great, a redirect is in place..."). 'resolutions': array of {originalUrl, resolvedUrl}. Limit to 3-5 examples.
      *   **Robots.txt ('robotsTxt')**: statusText, statusColorClass. 'robotsTxtUrl' (link if found, else empty string). 'findings': array of strings detailing key observations (e.g., "We found your robots.txt here:", "The reviewed page is allowed, so search engines are able to find it.").
      *   **XML Sitemap ('xmlSitemap')**: statusText, statusColorClass. 'sitemapUrl' (link if found, else empty string). 'details' (brief note if any).
      *   **Sitemaps Validity ('sitemapValidity')**: statusText, statusColorClass. 'sitemapUrl' (link to sitemap being validated). 'summary' (e.g., "We found 1 sitemap(s) listing 0 URL(s)."). 'checks': array of {text (description of check/issue), type ("check" for neutral info, "issue" for problem, "positive" for good finding)}.
      *   **URL Parameters ('urlParameters')**: statusText, statusColorClass. 'details' (e.g., "Good, the URLs look clean.", "Potential duplicate content issues due to parameters.").

  8.  **Technical SEO Analysis ('technicalSeoAnalysis')**:
      *   **Robots Tags ('robotsTags')**: statusText, statusColorClass. 'details' (summary of findings). 'foundTags': array of {tag (content of meta tag), source ("HTML")}. Example: {tag: "index, follow", source: "HTML"}.
      *   **Index and Follow ('indexFollow')**: statusText, statusColorClass. 'details' (e.g., "This page is set to 'index' and 'follow'").
      *   **Hreflang Tags ('hreflangTags')**: statusText, statusColorClass. 'details' (e.g., "No hreflang tags were found on this page").
      *   **Broken Links ('brokenLinks')**: statusText, statusColorClass. 'details' (e.g., "No broken links were found on this web page").
      *   **Underscores in URLs ('underscoresInUrls')**: statusText, statusColorClass. 'details' (e.g., "Great, you are not using underscores in your URLs.").
      *   **Discovered Pages ('discoveredPages')**: statusText, statusColorClass. 'count' (number of pages), 'details' (e.g., "Approx. 31 pages discovered").

  9.  **Mobile Analysis ('mobileAnalysis')**:
      *   **Mobile Friendliness ('mobileFriendliness')**: statusText, statusColorClass. 'ratingText' (e.g., "Very Good"), 'progressValue' (0-100 for progress bar), 'details' (e.g., "This web page is super optimized for Mobile Visitors").
      *   **Mobile Rendering ('mobileRendering')**: statusText, statusColorClass. 'details' (e.g., "The page appears to render well on mobile devices."). You do not need to provide an image URL.
      *   **Tap Targets ('tapTargets')**: statusText, statusColorClass. 'details' (e.g., "Perfect, your page's tap targets are big enough and have enough space between them.").

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
