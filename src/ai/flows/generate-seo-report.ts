
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

  For each section and sub-section, determine a 'statusText' (e.g., 'Good', 'Needs Improvement', 'Outdated', 'Multiple H1s', 'Well-optimized', 'All images have alts', 'Some missing', 'Good link distribution', 'OK', 'Error', 'Very Good', 'Perfect', '10 Warnings', 'Warning!', 'Secure') and a 'statusColorClass' (Tailwind CSS class: 'text-accent' for good/positive, 'text-warning' for moderate issues/warnings, 'text-destructive' for critical issues/errors, 'text-muted-foreground' for informational/neutral).

  If content for a field (like title tag text, meta description text, URLs, or other text fields) is missing or not found, please return an empty string "" or an empty array [] as appropriate, rather than null, unless the schema specifically allows null (e.g. for optional objects). Use a placeholder image URL like "https://placehold.co/WIDTHxHEIGHT.png" (e.g. "https://placehold.co/600x315.png") if an actual image URL for Open Graph or Twitter Card preview is not found, appending data-ai-hint with relevant keywords (e.g., data-ai-hint="social media" or data-ai-hint="twitter card").

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
      *   **Schema.org ('schemaOrg')**:
          *   statusText, statusColorClass (e.g., "Good", "Multiple Issues", "Outdated").
          *   'schemaTypes': Array of {type (e.g., "Product", "FAQPage"), count}.
          *   'issues': Array of {text (description of issue), severity ("warning" or "error")}. Limit to 5-7 representative issues.
          *   'warningCount': Total number of warnings found.
      *   **Open Graph Protocol ('openGraph')**:
          *   statusText, statusColorClass (e.g., "Well Implemented", "Missing Key Tags").
          *   'previewData': {title (or ""), description (or ""), imageUrl (use placeholder "https://placehold.co/600x315.png" data-ai-hint="social media" if none found), url (or siteName, or "")}.
          *   'tags': Array of {tag (e.g., "og:type", "og:title"), value}. Include common tags.
      *   **Twitter Card ('twitterCard')**:
          *   statusText, statusColorClass (e.g., "Found", "Missing").
          *   'previewData': {cardType (or ""), site (or ""), title (or ""), description (or ""), imageUrl (use placeholder "https://placehold.co/600x315.png" data-ai-hint="twitter card" if none found), domain (or "")}.
          *   'tags': Array of {tag (e.g., "twitter:card", "twitter:title"), value}. Include common tags.

  11. **Microformats Analysis ('microformatsAnalysis')**:
      *   statusText, statusColorClass.
      *   'formatsFound': Array of {type (e.g., "h-entry", "h-card"), count}.

  12. **Security Analysis ('securityAnalysis')**:
      *   **Email Privacy ('emailPrivacy')**: statusText, statusColorClass. 'details' (e.g., "Warning! At least one email address has been found in plain text." or "No plain text email addresses found.").
      *   **DMARC ('dmarc')**: statusText, statusColorClass. 'details' (e.g., "DMARC record found and valid." or "No DMARC record found." or "Multiple DMARC records found for example.com.").
      *   **SSL Secure ('sslSecure')**: statusText, statusColorClass. 'details' (overall summary). 'checks': Array of {text (e.g., "Your website's URLs redirect to HTTPS pages."), isPositive (boolean)}. Example checks: HTTPS redirect, HSTS setup, certificate expiry, certificate issuer.
      *   **Mixed Content ('mixedContent')**: statusText, statusColorClass. 'details' (e.g., "We didn't find any mixed content on this web page." or "Mixed content found on X pages.").

  13. **Performance Analysis ('performanceAnalysis')**:
      *   **Asset Minification ('assetMinification')**: statusText, statusColorClass. 'details' (e.g., "Perfect, all your assets are minified." or "Some CSS/JS files could be minified.").

  14. **Accessibility Analysis ('accessibilityAnalysis')**:
      *   **Contrast ('contrast')**: statusText, statusColorClass. 'details' (summary, e.g., "The table below shows X elements..."). 'items': array of {elementHtml (short HTML snippet), ratio (e.g., "4.47:1"), expectedRatio (e.g., "4.5:1 expected"), previewText ("Aa")}.
      *   **Navigation ('navigation')**: statusText, statusColorClass. 'summaryText' (e.g., "This page has not passed all 5 checks."). 'checks': array of {text (e.g., "The page contains a heading..."), passed (boolean)}. 'notRelevantChecks': array of strings for checks not applicable.

  15. **Technologies Analysis ('technologiesAnalysis')**:
      *   statusText, statusColorClass.
      *   'detectedTechnologies': Array of {name (e.g., "Elementor", "Google Analytics 4", "PHP")}.

  16. **Analytics Analysis ('analyticsAnalysis')**:
      *   statusText, statusColorClass.
      *   'detectedTools': Array of {name (e.g., "Google Analytics", "Google Analytics 4")}.

  17. **Doctype Analysis ('doctypeAnalysis')**:
      *   statusText, statusColorClass.
      *   'doctype': The detected doctype (e.g., "HTML5").

  18. **Encoding Analysis ('encodingAnalysis')**:
      *   statusText, statusColorClass.
      *   'encoding': The detected character encoding (e.g., "utf-8").

  19. **Branding Analysis ('brandingAnalysis')**:
      *   **URL ('urlAnalysis')**: statusText, statusColorClass. 'url' (the canonical URL of the page), 'length' (character count).
      *   **Favicon ('faviconAnalysis')**: statusText, statusColorClass. 'details' (e.g., "Great, your website has a favicon.").
      *   **Custom 404 Page ('custom404PageAnalysis')**: statusText, statusColorClass. 'details' (e.g., "Great, your website has a custom 404 error page."), 'httpStatusCode' (e.g., 404, if applicable).

  20. **Domain Analysis ('domainAnalysis')**:
      *   **Domain Registration ('domainRegistration')**: statusText, statusColorClass. 'createdDate' (simulated, e.g., "Created a year ago"), 'expiryDate' (simulated, e.g., "Expires in 2 years").
      *   **Domain Availability ('domainAvailability')**: statusText, statusColorClass. 'domains': Array of {domain (e.g., "{{{url}}}.net", "{{{url}}}.org"), status (e.g., "Available. Register it now!"), isAvailable (boolean)}. Simulate for .net, .org, .info, .biz TLDs based on the main URL.

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
