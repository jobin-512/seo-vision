
import { z } from 'zod';

// Schema for Monthly Traffic Data (used in websiteTraffic and potentially other places)
export const MonthlyTrafficDataSchema = z.object({
  month: z.string().describe('The month (e.g., "Jan", "Feb").'),
  visits: z.number().describe('The number of visits for that month.'),
});
export type MonthlyTrafficData = z.infer<typeof MonthlyTrafficDataSchema>;

// Schema for Google Preview Data
export const GooglePreviewDataSchema = z.object({
  url: z.string().describe("The display URL for the preview."),
  title: z.string().describe("The title text for the preview."),
  description: z.string().describe("The description snippet for the preview.")
});
export type GooglePreviewData = z.infer<typeof GooglePreviewDataSchema>;

// --- ON-PAGE SEO ---
// Schema for individual On-Page SEO Detail Items
export const OnPageDetailItemSchema = z.object({
  id: z.string().describe("Identifier for the item, e.g., 'titleTag', 'metaDescription', 'googlePreview'."),
  title: z.string().describe("The display title of the on-page SEO item, e.g., 'Title Tag'."),
  statusText: z.string().describe("A status description, e.g., 'Outdated', 'Good', 'Needs Improvement'."),
  statusColorClass: z.string().describe("Tailwind class for status color, e.g., 'text-warning', 'text-accent'."),
  content: z.string().nullable().optional().describe("Main content, e.g., the text of the title tag or meta description. Return empty string if not found, not null."),
  details: z.string().optional().describe("Additional details, e.g., character length."),
  googleDesktopPreview: GooglePreviewDataSchema.optional(),
  googleMobilePreview: GooglePreviewDataSchema.optional(),
});
export type OnPageDetailItem = z.infer<typeof OnPageDetailItemSchema>;

// Schema for Headings Analysis
export const HeadingItemSchema = z.object({
  tag: z.enum(["H1", "H2", "H3", "H4", "H5", "H6"]),
  text: z.string().describe("The text content of the heading. Provide the first 50 characters if very long."),
});
export type HeadingItem = z.infer<typeof HeadingItemSchema>;

export const HeadingsAnalysisSchema = z.object({
  statusText: z.string().describe("Overall status, e.g., 'Good', 'Multiple H1s', 'Outdated'"),
  statusColorClass: z.string().describe("Tailwind class for status color."),
  h1Count: z.number().describe("Count of H1 tags."),
  h2Count: z.number().describe("Count of H2 tags."),
  h3Count: z.number().describe("Count of H3 tags."),
  h4Count: z.number().describe("Count of H4 tags."),
  h5Count: z.number().describe("Count of H5 tags."),
  h6Count: z.number().describe("Count of H6 tags."),
  headings: z.array(HeadingItemSchema).optional().describe("A list of representative heading tags found on the page. Limit to first 5-7 of each type if many."),
});
export type HeadingsAnalysis = z.infer<typeof HeadingsAnalysisSchema>;

// Schema for Content Analysis (Keywords)
export const KeywordItemSchema = z.object({
  keyword: z.string().describe("The keyword or keyphrase."),
  count: z.number().describe("Frequency of the keyword."),
});
export type KeywordItem = z.infer<typeof KeywordItemSchema>;

export const ContentAnalysisSchema = z.object({
  statusText: z.string().describe("Overall status, e.g., 'Well-optimized', 'Needs more keywords'"),
  statusColorClass: z.string().describe("Tailwind class for status color."),
  keywords: z.array(KeywordItemSchema).optional().describe("List of top 10-20 keywords/keyphrases and their counts."),
});
export type ContentAnalysis = z.infer<typeof ContentAnalysisSchema>;

// Schema for Alt Attribute Analysis
export const AltAttributeAnalysisSchema = z.object({
  statusText: z.string().describe("Overall status, e.g., 'All images have alts', 'Some missing'"),
  statusColorClass: z.string().describe("Tailwind class for status color."),
  totalImages: z.number().describe("Total number of images found on the page."),
  imagesMissingAlts: z.number().describe("Number of images missing alt attributes."),
  details: z.string().optional().describe("A brief summary message, e.g., 'We found X images on this web page. Y ALT attributes are missing/present.'")
});
export type AltAttributeAnalysis = z.infer<typeof AltAttributeAnalysisSchema>;

// Schema for In-Page Links Analysis
export const LinkItemSchema = z.object({
  anchorText: z.string().describe("The anchor text of the link. Use 'No Anchor Text' if empty. Provide first 50 chars if very long."),
  url: z.string().describe("The URL of the link. Provide first 70 chars if very long."),
  type: z.enum(["Internal", "External"]),
  followStatus: z.enum(["Follow", "Nofollow", "Unknown"]).describe("Indicates if the link is follow or nofollow."),
});
export type LinkItem = z.infer<typeof LinkItemSchema>;

export const InPageLinksAnalysisSchema = z.object({
  statusText: z.string().describe("Overall status, e.g., 'Good link distribution', 'Too many nofollow'"),
  statusColorClass: z.string().describe("Tailwind class for status color."),
  totalLinks: z.number().describe("Total number of links found."),
  internalLinks: z.number().describe("Number of internal links."),
  externalLinksFollow: z.number().describe("Number of external follow links."),
  externalLinksNofollow: z.number().describe("Number of external nofollow links."),
  details: z.string().optional().describe("A brief summary message, e.g., 'We found a total of X link(s) including Y link(s) to files.'"),
  links: z.array(LinkItemSchema).optional().describe("A list of representative links. Limit to first 5-10 if many."),
});
export type InPageLinksAnalysis = z.infer<typeof InPageLinksAnalysisSchema>;


// --- INDEXING ANALYSIS ---
export const WebFeedItemSchema = z.object({
  url: z.string().describe("URL of the web feed."),
  format: z.string().describe("Format of the web feed (e.g., RSS, Atom)."),
});
export type WebFeedItem = z.infer<typeof WebFeedItemSchema>;

export const WebFeedsAnalysisSchema = z.object({
  statusText: z.string().describe("Overall status, e.g., 'Outdated', 'Good'."),
  statusColorClass: z.string().describe("Tailwind class for status color."),
  feeds: z.array(WebFeedItemSchema).optional().describe("List of web feeds found."),
  details: z.string().optional().describe("Summary message, e.g., 'We found X web feed URL(s) on this web page.'"),
});
export type WebFeedsAnalysis = z.infer<typeof WebFeedsAnalysisSchema>;

export const UrlResolveItemSchema = z.object({
  originalUrl: z.string().describe("The original URL checked."),
  resolvedUrl: z.string().describe("The URL it resolves to."),
});
export type UrlResolveItem = z.infer<typeof UrlResolveItemSchema>;

export const UrlResolveAnalysisSchema = z.object({
  statusText: z.string().describe("Overall status, e.g., 'Good', 'Redirect issues'."),
  statusColorClass: z.string().describe("Tailwind class for status color."),
  resolutions: z.array(UrlResolveItemSchema).optional().describe("List of URL resolution examples."),
  details: z.string().optional().describe("Summary message, e.g., 'Great, a redirect is in place...'."),
});
export type UrlResolveAnalysis = z.infer<typeof UrlResolveAnalysisSchema>;

export const RobotsTxtAnalysisSchema = z.object({
  statusText: z.string().describe("Overall status of robots.txt analysis."),
  statusColorClass: z.string().describe("Tailwind class for status color."),
  robotsTxtUrl: z.string().optional().describe("URL to the robots.txt file, if found."),
  findings: z.array(z.string()).optional().describe("Key findings or details from robots.txt review, e.g., 'We found your robots.txt here', 'The reviewed page is allowed...'"),
});
export type RobotsTxtAnalysis = z.infer<typeof RobotsTxtAnalysisSchema>;

export const XmlSitemapAnalysisSchema = z.object({
  statusText: z.string().describe("Overall status of XML sitemap presence/accessibility."),
  statusColorClass: z.string().describe("Tailwind class for status color."),
  sitemapUrl: z.string().optional().describe("URL to the XML sitemap, if found."),
  details: z.string().optional().describe("Brief summary or note."),
});
export type XmlSitemapAnalysis = z.infer<typeof XmlSitemapAnalysisSchema>;

export const SitemapValidityCheckItemSchema = z.object({
  text: z.string().describe("Description of the validity check or finding."),
  type: z.enum(['check', 'issue', 'positive']).describe("Type of item: 'check' (neutral/informational), 'issue' (a problem), 'positive' (a good finding)."),
});
export type SitemapValidityCheckItem = z.infer<typeof SitemapValidityCheckItemSchema>;

export const SitemapValidityAnalysisSchema = z.object({
  statusText: z.string().describe("Overall status of sitemap validity."),
  statusColorClass: z.string().describe("Tailwind class for status color."),
  sitemapUrl: z.string().optional().describe("URL to the sitemap that was validated."),
  summary: z.string().optional().describe("Summary like 'We found X sitemap(s) listing Y URL(s).'"),
  checks: z.array(SitemapValidityCheckItemSchema).optional().describe("List of checks, issues, and positive findings related to sitemap validity."),
});
export type SitemapValidityAnalysis = z.infer<typeof SitemapValidityAnalysisSchema>;

export const UrlParametersAnalysisSchema = z.object({
  statusText: z.string().describe("Overall status of URL parameters."),
  statusColorClass: z.string().describe("Tailwind class for status color."),
  details: z.string().optional().describe("Summary message, e.g., 'Good, the URLs look clean.'"),
});
export type UrlParametersAnalysis = z.infer<typeof UrlParametersAnalysisSchema>;

export const IndexingAnalysisSchema = z.object({
  webFeeds: WebFeedsAnalysisSchema.optional(),
  urlResolve: UrlResolveAnalysisSchema.optional(),
  robotsTxt: RobotsTxtAnalysisSchema.optional(),
  xmlSitemap: XmlSitemapAnalysisSchema.optional(),
  sitemapValidity: SitemapValidityAnalysisSchema.optional(),
  urlParameters: UrlParametersAnalysisSchema.optional(),
}).describe("Comprehensive analysis of various indexing aspects of the website.");
export type IndexingAnalysis = z.infer<typeof IndexingAnalysisSchema>;


// --- Main Schemas ---
// Main Input Schema for the Flow
export const GenerateSeoReportInputSchema = z.object({
  url: z.string().describe('The URL of the website to analyze.'),
});
export type GenerateSeoReportInput = z.infer<typeof GenerateSeoReportInputSchema>;

// Main Output Schema for the Flow
export const GenerateSeoReportOutputSchema = z.object({
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
  
  // On-Page specific details
  onPageSeoDetails: z.array(OnPageDetailItemSchema).optional().describe("Structured details for on-page SEO items like Title Tag, Meta Description, and Google Preview, based on the analyzed URL."),
  headingsAnalysis: HeadingsAnalysisSchema.optional().describe("Analysis of heading tags (H1-H6) on the page."),
  contentAnalysis: ContentAnalysisSchema.optional().describe("Analysis of keywords and keyphrases found in the content."),
  altAttributeAnalysis: AltAttributeAnalysisSchema.optional().describe("Analysis of image alt attributes."),
  inPageLinksAnalysis: InPageLinksAnalysisSchema.optional().describe("Analysis of internal and external links on the page."),

  // Indexing Analysis
  indexingAnalysis: IndexingAnalysisSchema.optional().describe("Detailed analysis of website indexing aspects."),
});
export type GenerateSeoReportOutput = z.infer<typeof GenerateSeoReportOutputSchema>;

