
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
  // Shared
  type MonthlyTrafficData,
  type GooglePreviewData,
  // On-Page
  type OnPageDetailItem,
  type HeadingItem,
  type HeadingsAnalysis,
  type KeywordItem,
  type ContentAnalysis,
  type AltAttributeAnalysis,
  type LinkItem,
  type InPageLinksAnalysis,
  // Indexing
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
  type TwitterTag,
  type TwitterCardPreview,
  type TwitterCardAnalysis,
  type StructuredDataAnalysis,
  // Microformats
  type MicroformatItem,
  type MicroformatsAnalysis,
  // Security
  type EmailPrivacyAnalysis,
  type DmarcAnalysis,
  type SslCheckItem,
  type SslSecureAnalysis,
  type MixedContentAnalysis,
  type SecurityAnalysis,
  // Performance
  type AssetMinificationAnalysis,
  type PerformanceAnalysis,
  // Accessibility
  type ContrastItem,
  type ContrastAnalysis,
  type NavigationCheckItem,
  type NavigationAnalysis,
  type AccessibilityAnalysis,
  // Technologies, Analytics, Doctype, Encoding
  type TechnologyItem,
  type TechnologiesAnalysis,
  type AnalyticsTool,
  type AnalyticsAnalysis,
  type DoctypeAnalysis,
  type EncodingAnalysis,
  // Branding
  type UrlAnalysis,
  type FaviconAnalysis,
  type Custom404PageAnalysis,
  type BrandingAnalysis,
  // Domain
  type DomainRegistrationAnalysis,
  type DomainAvailabilityItem,
  type DomainAvailabilityAnalysis,
  type DomainAnalysis,
  // Off-Page
  type BacklinksScore,
  type BacklinksCounter,
  type ReferringDomains,
  type OffPageAnalysis,
  // Traffic (Report section, not chart data)
  type TrafficEstimations,
  type TrafficRank,
  type TrafficReportAnalysis,
  // Local SEO
  type LocalDirectoryLink,
  type LocalDirectories,
  type OnlineReviews,
  type LocalSeoAnalysis,
} from '@/ai/schemas/seo-report-schemas';

// Export types for external use (e.g., by the frontend)
// Re-export main input/output and all detailed types
export type { 
  GenerateSeoReportInput, 
  GenerateSeoReportOutput,
  // Shared
  MonthlyTrafficData,
  GooglePreviewData,
  // On-Page
  OnPageDetailItem,
  HeadingItem,
  HeadingsAnalysis,
  KeywordItem,
  ContentAnalysis,
  AltAttributeAnalysis,
  LinkItem,
  InPageLinksAnalysis,
  // Indexing
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
  TwitterTag,
  TwitterCardPreview,
  TwitterCardAnalysis,
  StructuredDataAnalysis,
  // Microformats
  MicroformatItem,
  MicroformatsAnalysis,
  // Security
  EmailPrivacyAnalysis,
  DmarcAnalysis,
  SslCheckItem,
  SslSecureAnalysis,
  MixedContentAnalysis,
  SecurityAnalysis,
  // Performance
  AssetMinificationAnalysis,
  PerformanceAnalysis,
  // Accessibility
  ContrastItem,
  ContrastAnalysis,
  NavigationCheckItem,
  NavigationAnalysis,
  AccessibilityAnalysis,
  // Technologies, Analytics, Doctype, Encoding
  TechnologyItem,
  TechnologiesAnalysis,
  AnalyticsTool,
  AnalyticsAnalysis,
  DoctypeAnalysis,
  EncodingAnalysis,
  // Branding
  UrlAnalysis,
  FaviconAnalysis,
  Custom404PageAnalysis,
  BrandingAnalysis,
  // Domain
  DomainRegistrationAnalysis,
  DomainAvailabilityItem,
  DomainAvailabilityAnalysis,
  DomainAnalysis,
  // Off-Page
  BacklinksScore,
  BacklinksCounter,
  ReferringDomains,
  OffPageAnalysis,
  // Traffic (Report section)
  TrafficEstimations,
  TrafficRank,
  TrafficReportAnalysis,
  // Local SEO
  LocalDirectoryLink,
  LocalDirectories,
  OnlineReviews,
  LocalSeoAnalysis,
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

  For each section and sub-section, determine a 'statusText' (e.g., 'Good', 'Needs Improvement', 'Outdated', 'Multiple H1s', 'Well-optimized', 'All images have alts', 'Some missing', 'Good link distribution', 'OK', 'Error', 'Very Good', 'Perfect', '10 Warnings', 'Warning!', 'Secure', 'Bad', 'Very Low') and a 'statusColorClass' (Tailwind CSS class: 'text-accent' for good/positive, 'text-warning' for moderate issues/warnings, 'text-destructive' for critical issues/errors, 'text-muted-foreground' for informational/neutral).

  If content for a field (like title tag text, meta description text, URLs, or other text fields) is missing or not found, please return an empty string "" or an empty array [] as appropriate, rather than null, unless the schema specifically allows null (e.g. for optional objects or numeric counts where 0 is meaningful). Use a placeholder image URL like "https://placehold.co/WIDTHxHEIGHT.png" (e.g. "https://placehold.co/600x315.png") if an actual image URL for Open Graph or Twitter Card preview is not found, appending data-ai-hint with relevant keywords (e.g., data-ai-hint="social media" or data-ai-hint="twitter card"). For numeric counts like image counts, link counts, heading counts, if zero, use 0.

  1.  **Overall Report & Scores**:
      *   Identify problems and provide optimization suggestions in the main 'report' field.
      *   Calculate an overall 'score' (0-100).
      *   Generate a 'performanceReport' and 'performanceScore' (0-100).
      *   Provide specific scores (0-100) for: 'onPageScore', 'offPageScore', 'technicalScore', 'contentScore', 'uxScore'.
      *   Determine Core Web Vitals: 'lcpValue' (e.g., "2.5s") & 'lcpStatus' ("Good", "Improve", "Poor"), 'clsValue' & 'clsStatus', 'fidValue' & 'fidStatus'.

  2.  **On-Page SEO Details ('onPageSeoDetails')**: (Array of items for Title Tag, Meta Description, Google Preview)
      *   **Title Tag**: id "titleTag", title "Title Tag". statusText, statusColorClass. 'content' (current text or empty string if not found), 'details' (char length).
      *   **Meta Description**: id "metaDescription", title "Meta Description". statusText, statusColorClass. 'content' (current text or empty string if missing), 'details' (char length).
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
      *   **Robots.txt ('robotsTxt')**: statusText, statusColorClass. 'robotsTxtUrl' (return empty string if not found). 'findings': array of strings.
      *   **XML Sitemap ('xmlSitemap')**: statusText, statusColorClass. 'sitemapUrl' (return empty string if not found). 'details'.
      *   **Sitemaps Validity ('sitemapValidity')**: statusText, statusColorClass. 'sitemapUrl' (return empty string if not found). 'summary'. 'checks': array of {text, type ("check", "issue", "positive")}.
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
      *   **Mobile Rendering ('mobileRendering')**: statusText, statusColorClass. 'details'. (No image URL needed, frontend uses placeholder).
      *   **Tap Targets ('tapTargets')**: statusText, statusColorClass. 'details'.

  10. **Structured Data Analysis ('structuredDataAnalysis')**:
      *   **Schema.org ('schemaOrg')**: statusText, statusColorClass. 'schemaTypes': Array of {type, count}. 'issues': Array of {text, severity ("warning" or "error")}. 'warningCount'.
      *   **Open Graph Protocol ('openGraph')**: statusText, statusColorClass. 'previewData': {title, description, imageUrl (use placeholder "https://placehold.co/600x315.png" data-ai-hint="social media" if none), url (or siteName)}. 'tags': Array of {tag, value}.
      *   **Twitter Card ('twitterCard')**: statusText, statusColorClass. 'previewData': {cardType, site, title, description, imageUrl (use placeholder "https://placehold.co/600x315.png" data-ai-hint="twitter card" if none), domain}. 'tags': Array of {tag, value}.

  11. **Microformats Analysis ('microformatsAnalysis')**:
      *   statusText, statusColorClass. 'formatsFound': Array of {type, count}.

  12. **Security Analysis ('securityAnalysis')**:
      *   **Email Privacy ('emailPrivacy')**: statusText, statusColorClass. 'details'.
      *   **DMARC ('dmarc')**: statusText, statusColorClass. 'details'.
      *   **SSL Secure ('sslSecure')**: statusText, statusColorClass. 'details'. 'checks': array of {text, isPositive (boolean)}.
      *   **Mixed Content ('mixedContent')**: statusText, statusColorClass. 'details'.

  13. **Performance Analysis ('performanceAnalysis')**:
      *   **Asset Minification ('assetMinification')**: statusText, statusColorClass. 'details'.

  14. **Accessibility Analysis ('accessibilityAnalysis')**:
      *   **Contrast ('contrast')**: statusText, statusColorClass. 'details'. 'items': array of {elementHtml, ratio, expectedRatio, previewText ("Aa")}.
      *   **Navigation ('navigation')**: statusText, statusColorClass. 'summaryText'. 'checks': array of {text, passed (boolean)}. 'notRelevantChecks': array of strings.

  15. **Technologies Analysis ('technologiesAnalysis')**:
      *   statusText, statusColorClass. 'detectedTechnologies': Array of {name}.

  16. **Analytics Analysis ('analyticsAnalysis')**:
      *   statusText, statusColorClass. 'detectedTools': Array of {name}.

  17. **Doctype Analysis ('doctypeAnalysis')**:
      *   statusText, statusColorClass. 'doctype'.

  18. **Encoding Analysis ('encodingAnalysis')**:
      *   statusText, statusColorClass. 'encoding'.

  19. **Branding Analysis ('brandingAnalysis')**:
      *   **URL ('urlAnalysis')**: statusText, statusColorClass. 'url', 'length'.
      *   **Favicon ('faviconAnalysis')**: statusText, statusColorClass. 'details'.
      *   **Custom 404 Page ('custom404PageAnalysis')**: statusText, statusColorClass. 'details', 'httpStatusCode'.

  20. **Domain Analysis ('domainAnalysis')**:
      *   **Domain Registration ('domainRegistration')**: statusText, statusColorClass. 'createdDate' (simulated), 'expiryDate' (simulated).
      *   **Domain Availability ('domainAvailability')**: statusText, statusColorClass. 'domains': Array of {domain, status, isAvailable (boolean)}. Simulate for .net, .org, .info, .biz TLDs.

  21. **Off-Page Analysis ('offPageAnalysis')**:
      *   **Backlinks Score ('backlinksScore')**: statusText, statusColorClass, 'score' (0-100), 'details'.
      *   **Backlinks Counter ('backlinksCounter')**: statusText, statusColorClass, 'count'.
      *   **Referring Domains ('referringDomains')**: statusText, statusColorClass, 'count'.

  22. **Traffic Report Analysis ('trafficReportAnalysis')** (Distinct from websiteTraffic for charts):
      *   **Traffic Estimations ('trafficEstimations')**: statusText, statusColorClass, 'estimationText' (e.g., "Very Low"), 'details'.
      *   **Traffic Rank ('trafficRank')**: statusText, statusColorClass, 'globalRankText', 'tldRankText'.

  23. **Local SEO Analysis ('localSeoAnalysis')**:
      *   **Local Directories ('localDirectories')**: statusText, statusColorClass, 'links': Array of {text, url}. (e.g., "Add your Google My Business profile", "https://www.google.com/business/").
      *   **Online Reviews ('onlineReviews')**: statusText, statusColorClass, 'details'.

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

