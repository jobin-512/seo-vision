
import { z } from 'zod';

// --- SHARED / GENERAL ---
export const MonthlyTrafficDataSchema = z.object({
  month: z.string().describe('The month (e.g., "Jan", "Feb").'),
  visits: z.number().describe('The number of visits for that month.'),
});
export type MonthlyTrafficData = z.infer<typeof MonthlyTrafficDataSchema>;

export const GooglePreviewDataSchema = z.object({
  url: z.string().describe("The display URL for the preview."),
  title: z.string().describe("The title text for the preview."),
  description: z.string().describe("The description snippet for the preview.")
});
export type GooglePreviewData = z.infer<typeof GooglePreviewDataSchema>;


// --- ON-PAGE SEO ---
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

export const AltAttributeAnalysisSchema = z.object({
  statusText: z.string().describe("Overall status, e.g., 'All images have alts', 'Some missing'"),
  statusColorClass: z.string().describe("Tailwind class for status color."),
  totalImages: z.number().describe("Total number of images found on the page."),
  imagesMissingAlts: z.number().describe("Number of images missing alt attributes."),
  details: z.string().optional().describe("A brief summary message, e.g., 'We found X images on this web page. Y ALT attributes are missing/present.'")
});
export type AltAttributeAnalysis = z.infer<typeof AltAttributeAnalysisSchema>;

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
  robotsTxtUrl: z.string().nullable().optional().describe("URL to the robots.txt file, if found. Return empty string if not found."),
  findings: z.array(z.string()).optional().describe("Key findings or details from robots.txt review, e.g., 'We found your robots.txt here', 'The reviewed page is allowed...'"),
});
export type RobotsTxtAnalysis = z.infer<typeof RobotsTxtAnalysisSchema>;

export const XmlSitemapAnalysisSchema = z.object({
  statusText: z.string().describe("Overall status of XML sitemap presence/accessibility."),
  statusColorClass: z.string().describe("Tailwind class for status color."),
  sitemapUrl: z.string().nullable().optional().describe("URL to the XML sitemap, if found. Return empty string if not found."),
  details: z.string().nullable().optional().describe("Brief summary or note."),
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
  sitemapUrl: z.string().nullable().optional().describe("URL to the sitemap that was validated. Return empty string if not found."),
  summary: z.string().nullable().optional().describe("Summary like 'We found X sitemap(s) listing Y URL(s).'"),
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


// --- TECHNICAL SEO ---
export const RobotsTagItemSchema = z.object({
  tag: z.string().describe("The content of the robots meta tag."),
  source: z.string().describe("Source of the tag, e.g., HTML, HTTP Header."),
});
export type RobotsTagItem = z.infer<typeof RobotsTagItemSchema>;

export const RobotsTagsAnalysisSchema = z.object({
  statusText: z.string().describe("Overall status, e.g., 'Valid tags found', 'No robots tags'"),
  statusColorClass: z.string().describe("Tailwind class for status color."),
  details: z.string().optional().describe("General summary or note about robots tags."),
  foundTags: z.array(RobotsTagItemSchema).optional().describe("List of valid robots meta tags found."),
});
export type RobotsTagsAnalysis = z.infer<typeof RobotsTagsAnalysisSchema>;

export const IndexFollowAnalysisSchema = z.object({
  statusText: z.string().describe("Status of index/follow directives, e.g., 'Index, Follow', 'Noindex'"),
  statusColorClass: z.string().describe("Tailwind class for status color."),
  details: z.string().optional().describe("Explanation, e.g., 'This page is set to index and follow.'"),
});
export type IndexFollowAnalysis = z.infer<typeof IndexFollowAnalysisSchema>;

export const HreflangTagsAnalysisSchema = z.object({
  statusText: z.string().describe("Status of Hreflang tags, e.g., 'Implemented correctly', 'Not found'"),
  statusColorClass: z.string().describe("Tailwind class for status color."),
  details: z.string().optional().describe("Details about Hreflang tags found or missing."),
});
export type HreflangTagsAnalysis = z.infer<typeof HreflangTagsAnalysisSchema>;

export const BrokenLinksAnalysisSchema = z.object({
  statusText: z.string().describe("Status of broken links, e.g., 'No broken links', 'X broken links found'"),
  statusColorClass: z.string().describe("Tailwind class for status color."),
  details: z.string().optional().describe("Summary about broken links."),
});
export type BrokenLinksAnalysis = z.infer<typeof BrokenLinksAnalysisSchema>;

export const UnderscoresInUrlsAnalysisSchema = z.object({
  statusText: z.string().describe("Status of underscore usage in URLs, e.g., 'Good', 'Underscores present'"),
  statusColorClass: z.string().describe("Tailwind class for status color."),
  details: z.string().optional().describe("Explanation about underscore usage."),
});
export type UnderscoresInUrlsAnalysis = z.infer<typeof UnderscoresInUrlsAnalysisSchema>;

export const DiscoveredPagesAnalysisSchema = z.object({
  statusText: z.string().describe("Status of discovered pages."),
  statusColorClass: z.string().describe("Tailwind class for status color."),
  count: z.number().optional().describe("Number of discovered pages."),
  details: z.string().optional().describe("General information about discovered pages."),
});
export type DiscoveredPagesAnalysis = z.infer<typeof DiscoveredPagesAnalysisSchema>;

export const TechnicalSeoAnalysisSchema = z.object({
  robotsTags: RobotsTagsAnalysisSchema.optional(),
  indexFollow: IndexFollowAnalysisSchema.optional(),
  hreflangTags: HreflangTagsAnalysisSchema.optional(),
  brokenLinks: BrokenLinksAnalysisSchema.optional(),
  underscoresInUrls: UnderscoresInUrlsAnalysisSchema.optional(),
  discoveredPages: DiscoveredPagesAnalysisSchema.optional(),
}).describe("Comprehensive analysis of various technical SEO aspects.");
export type TechnicalSeoAnalysis = z.infer<typeof TechnicalSeoAnalysisSchema>;


// --- MOBILE ANALYSIS ---
export const MobileFriendlinessAnalysisSchema = z.object({
  statusText: z.string().describe("Overall status of mobile friendliness, e.g., 'Very Good', 'Needs Improvement'"),
  statusColorClass: z.string().describe("Tailwind class for status color."),
  ratingText: z.string().optional().describe("A descriptive rating, e.g., 'Very Good', 'Poor'."),
  progressValue: z.number().min(0).max(100).optional().describe("A score from 0-100 representing mobile friendliness."),
  details: z.string().optional().describe("Summary message about mobile friendliness."),
});
export type MobileFriendlinessAnalysis = z.infer<typeof MobileFriendlinessAnalysisSchema>;

export const MobileRenderingAnalysisSchema = z.object({
  statusText: z.string().describe("Status of mobile rendering."),
  statusColorClass: z.string().describe("Tailwind class for status color."),
  details: z.string().optional().describe("Observations about mobile rendering."),
});
export type MobileRenderingAnalysis = z.infer<typeof MobileRenderingAnalysisSchema>;

export const TapTargetsAnalysisSchema = z.object({
  statusText: z.string().describe("Status of tap target sizing, e.g., 'Good', 'Too small'"),
  statusColorClass: z.string().describe("Tailwind class for status color."),
  details: z.string().optional().describe("Explanation about tap target spacing and size."),
});
export type TapTargetsAnalysis = z.infer<typeof TapTargetsAnalysisSchema>;

export const MobileAnalysisSchema = z.object({
  mobileFriendliness: MobileFriendlinessAnalysisSchema.optional(),
  mobileRendering: MobileRenderingAnalysisSchema.optional(),
  tapTargets: TapTargetsAnalysisSchema.optional(),
}).describe("Comprehensive analysis of mobile usability aspects.");
export type MobileAnalysis = z.infer<typeof MobileAnalysisSchema>;

// --- STRUCTURED DATA ---
export const SchemaTypeBadgeSchema = z.object({
  type: z.string().describe("The type of schema found, e.g., 'Product', 'FAQPage'."),
  count: z.number().describe("The number of times this schema type was found."),
});
export type SchemaTypeBadge = z.infer<typeof SchemaTypeBadgeSchema>;

export const SchemaIssueItemSchema = z.object({
  text: z.string().describe("Description of the schema validation issue."),
  severity: z.enum(["warning", "error"]).default("warning").describe("Severity of the issue."),
});
export type SchemaIssueItem = z.infer<typeof SchemaIssueItemSchema>;

export const SchemaOrgAnalysisSchema = z.object({
  statusText: z.string().describe("Overall status of Schema.org implementation, e.g., 'Good', 'Outdated', 'Multiple Issues'."),
  statusColorClass: z.string().describe("Tailwind class for status color."),
  schemaTypes: z.array(SchemaTypeBadgeSchema).optional().describe("List of schema types found with their counts."),
  issues: z.array(SchemaIssueItemSchema).optional().describe("List of validation issues found."),
  warningCount: z.number().optional().describe("Total number of warnings related to Schema.org implementation."),
});
export type SchemaOrgAnalysis = z.infer<typeof SchemaOrgAnalysisSchema>;

export const OpenGraphTagSchema = z.object({
  tag: z.string().describe("The Open Graph tag name, e.g., 'og:type', 'og:title'."),
  value: z.string().describe("The value of the Open Graph tag."),
});
export type OpenGraphTag = z.infer<typeof OpenGraphTagSchema>;

export const OpenGraphPreviewSchema = z.object({
  title: z.string().nullable().optional().describe("The Open Graph title for the preview. Return empty string if not found."),
  description: z.string().nullable().optional().describe("The Open Graph description for the preview. Return empty string if not found."),
  imageUrl: z.string().optional().describe("The Open Graph image URL for the preview. Use placeholder 'https://placehold.co/600x315.png' and add data-ai-hint if not available."),
  url: z.string().nullable().optional().describe("The Open Graph URL or site name for the preview. Return empty string if not found."),
});
export type OpenGraphPreview = z.infer<typeof OpenGraphPreviewSchema>;

export const OpenGraphAnalysisSchema = z.object({
  statusText: z.string().describe("Overall status of Open Graph implementation, e.g., 'Good', 'Missing Tags'."),
  statusColorClass: z.string().describe("Tailwind class for status color."),
  previewData: OpenGraphPreviewSchema.optional().describe("Data for rendering an Open Graph preview card."),
  tags: z.array(OpenGraphTagSchema).optional().describe("List of key Open Graph tags found and their values."),
});
export type OpenGraphAnalysis = z.infer<typeof OpenGraphAnalysisSchema>;

export const TwitterTagSchema = z.object({
  tag: z.string().describe("The Twitter Card tag name, e.g., 'twitter:card', 'twitter:title'."),
  value: z.string().describe("The value of the Twitter Card tag."),
});
export type TwitterTag = z.infer<typeof TwitterTagSchema>;

export const TwitterCardPreviewSchema = z.object({
  cardType: z.string().nullable().optional().describe("Type of Twitter card, e.g., 'summary', 'summary_large_image'. Return empty string if not found."),
  site: z.string().nullable().optional().describe("The Twitter @username of the website/publisher. Return empty string if not found."),
  title: z.string().nullable().optional().describe("The title for the Twitter Card preview. Return empty string if not found."),
  description: z.string().nullable().optional().describe("The description for the Twitter Card preview. Return empty string if not found."),
  imageUrl: z.string().optional().describe("The image URL for the Twitter Card preview. Use placeholder 'https://placehold.co/600x315.png' and add data-ai-hint if not available."),
  domain: z.string().nullable().optional().describe("The domain of the content. Return empty string if not found."),
});
export type TwitterCardPreview = z.infer<typeof TwitterCardPreviewSchema>;

export const TwitterCardAnalysisSchema = z.object({
  statusText: z.string().describe("Overall status of Twitter Card implementation, e.g., 'Well Implemented', 'Missing Key Tags'."),
  statusColorClass: z.string().describe("Tailwind class for status color."),
  previewData: TwitterCardPreviewSchema.optional().describe("Data for rendering a Twitter Card preview."),
  tags: z.array(TwitterTagSchema).optional().describe("List of key Twitter Card tags found and their values."),
});
export type TwitterCardAnalysis = z.infer<typeof TwitterCardAnalysisSchema>;

export const StructuredDataAnalysisSchema = z.object({
  schemaOrg: SchemaOrgAnalysisSchema.optional().describe("Analysis of Schema.org structured data."),
  openGraph: OpenGraphAnalysisSchema.optional().describe("Analysis of Open Graph Protocol data."),
  twitterCard: TwitterCardAnalysisSchema.optional().describe("Analysis of Twitter Card metadata."),
}).describe("Comprehensive analysis of structured data implementation.");
export type StructuredDataAnalysis = z.infer<typeof StructuredDataAnalysisSchema>;


// --- MICROFORMATS ANALYSIS ---
export const MicroformatItemSchema = z.object({
  type: z.string().describe("Type of microformat found, e.g., 'h-entry', 'h-card'."),
  count: z.number().describe("Number of times this microformat type was found."),
});
export type MicroformatItem = z.infer<typeof MicroformatItemSchema>;

export const MicroformatsAnalysisSchema = z.object({
  statusText: z.string().describe("Overall status of microformats detection."),
  statusColorClass: z.string().describe("Tailwind class for status color."),
  formatsFound: z.array(MicroformatItemSchema).optional().describe("List of microformats detected and their counts."),
});
export type MicroformatsAnalysis = z.infer<typeof MicroformatsAnalysisSchema>;


// --- SECURITY ANALYSIS ---
export const EmailPrivacyAnalysisSchema = z.object({
  statusText: z.string().describe("Status of email privacy, e.g., 'Good', 'Warning'."),
  statusColorClass: z.string().describe("Tailwind class for status color."),
  details: z.string().optional().describe("Details about email addresses found, e.g., 'Warning! At least one email address has been found in plain text.'"),
});
export type EmailPrivacyAnalysis = z.infer<typeof EmailPrivacyAnalysisSchema>;

export const DmarcAnalysisSchema = z.object({
  statusText: z.string().describe("Status of DMARC record analysis."),
  statusColorClass: z.string().describe("Tailwind class for status color."),
  details: z.string().optional().describe("Details on DMARC record findings, e.g., 'We found more than one DMARC record...'."),
});
export type DmarcAnalysis = z.infer<typeof DmarcAnalysisSchema>;

export const SslCheckItemSchema = z.object({
  text: z.string().describe("Description of the SSL check performed."),
  isPositive: z.boolean().describe("True if the check is a positive finding, false if it's an issue or warning."),
});
export type SslCheckItem = z.infer<typeof SslCheckItemSchema>;

export const SslSecureAnalysisSchema = z.object({
  statusText: z.string().describe("Overall SSL security status."),
  statusColorClass: z.string().describe("Tailwind class for status color."),
  details: z.string().optional().describe("Overall summary, e.g., 'Great, your website is SSL secured (HTTPS).'"),
  checks: z.array(SslCheckItemSchema).optional().describe("List of specific SSL checks and their outcomes (e.g., HTTPS redirect, HSTS, expiry, issuer)."),
});
export type SslSecureAnalysis = z.infer<typeof SslSecureAnalysisSchema>;

export const MixedContentAnalysisSchema = z.object({
  statusText: z.string().describe("Status of mixed content detection."),
  statusColorClass: z.string().describe("Tailwind class for status color."),
  details: z.string().optional().describe("Details, e.g., 'We didn't find any mixed content on this web page.'"),
});
export type MixedContentAnalysis = z.infer<typeof MixedContentAnalysisSchema>;

export const SecurityAnalysisSchema = z.object({
  emailPrivacy: EmailPrivacyAnalysisSchema.optional(),
  dmarc: DmarcAnalysisSchema.optional(),
  sslSecure: SslSecureAnalysisSchema.optional(),
  mixedContent: MixedContentAnalysisSchema.optional(),
}).describe("Comprehensive analysis of website security aspects.");
export type SecurityAnalysis = z.infer<typeof SecurityAnalysisSchema>;


// --- PERFORMANCE ANALYSIS ---
export const AssetMinificationAnalysisSchema = z.object({
  statusText: z.string().describe("Status of asset minification."),
  statusColorClass: z.string().describe("Tailwind class for status color."),
  details: z.string().optional().describe("Details, e.g., 'Perfect, all your assets are minified.'"),
});
export type AssetMinificationAnalysis = z.infer<typeof AssetMinificationAnalysisSchema>;

export const PerformanceAnalysisSchema = z.object({
  assetMinification: AssetMinificationAnalysisSchema.optional(),
}).describe("Analysis of website performance aspects.");
export type PerformanceAnalysis = z.infer<typeof PerformanceAnalysisSchema>;

// --- ACCESSIBILITY ANALYSIS ---
export const ContrastItemSchema = z.object({
  elementHtml: z.string().describe("A short HTML snippet of the element with low contrast."),
  ratio: z.string().describe("The calculated contrast ratio, e.g., '2.5:1'."),
  expectedRatio: z.string().describe("The expected contrast ratio, e.g., '4.5:1 expected'."),
  previewText: z.string().default("Aa").describe("Text to display for visual preview, typically 'Aa'."),
});
export type ContrastItem = z.infer<typeof ContrastItemSchema>;

export const ContrastAnalysisSchema = z.object({
  statusText: z.string().describe("Overall status of contrast accessibility."),
  statusColorClass: z.string().describe("Tailwind class for status color."),
  details: z.string().optional().describe("Summary description of contrast issues or findings."),
  items: z.array(ContrastItemSchema).optional().describe("List of elements with contrast issues."),
});
export type ContrastAnalysis = z.infer<typeof ContrastAnalysisSchema>;

export const NavigationCheckItemSchema = z.object({
  text: z.string().describe("Description of the navigation check performed."),
  passed: z.boolean().describe("True if the check passed, false otherwise."),
});
export type NavigationCheckItem = z.infer<typeof NavigationCheckItemSchema>;

export const NavigationAnalysisSchema = z.object({
  statusText: z.string().describe("Overall status of navigation accessibility."),
  statusColorClass: z.string().describe("Tailwind class for status color."),
  summaryText: z.string().optional().describe("A summary text like 'This page has not passed all 5 checks'."),
  checks: z.array(NavigationCheckItemSchema).optional().describe("List of specific navigation checks and their outcomes."),
  notRelevantChecks: z.array(z.string()).optional().describe("List of navigation checks not relevant to the page."),
});
export type NavigationAnalysis = z.infer<typeof NavigationAnalysisSchema>;

export const AccessibilityAnalysisSchema = z.object({
  contrast: ContrastAnalysisSchema.optional(),
  navigation: NavigationAnalysisSchema.optional(),
}).describe("Analysis of website accessibility aspects.");
export type AccessibilityAnalysis = z.infer<typeof AccessibilityAnalysisSchema>;

// --- TECHNOLOGIES, ANALYTICS, DOCTYPE, ENCODING ---
export const TechnologyItemSchema = z.object({
  name: z.string().describe("Name of the detected technology, e.g., 'React', 'Google Analytics'."),
});
export type TechnologyItem = z.infer<typeof TechnologyItemSchema>;

export const TechnologiesAnalysisSchema = z.object({
  statusText: z.string().describe("Overall status text for detected technologies."),
  statusColorClass: z.string().describe("Tailwind CSS class for status color."),
  detectedTechnologies: z.array(TechnologyItemSchema).optional().describe("List of detected technologies."),
});
export type TechnologiesAnalysis = z.infer<typeof TechnologiesAnalysisSchema>;

export const AnalyticsToolSchema = z.object({
  name: z.string().describe("Name of the detected analytics tool, e.g., 'Google Analytics', 'Google Analytics 4'."),
});
export type AnalyticsTool = z.infer<typeof AnalyticsToolSchema>;

export const AnalyticsAnalysisSchema = z.object({
  statusText: z.string().describe("Overall status text for detected analytics tools."),
  statusColorClass: z.string().describe("Tailwind CSS class for status color."),
  detectedTools: z.array(AnalyticsToolSchema).optional().describe("List of detected analytics tools."),
});
export type AnalyticsAnalysis = z.infer<typeof AnalyticsAnalysisSchema>;

export const DoctypeAnalysisSchema = z.object({
  statusText: z.string().describe("Status text for Doctype."),
  statusColorClass: z.string().describe("Tailwind CSS class for status color."),
  doctype: z.string().optional().describe("The detected DOCTYPE, e.g., 'HTML5'."),
});
export type DoctypeAnalysis = z.infer<typeof DoctypeAnalysisSchema>;

export const EncodingAnalysisSchema = z.object({
  statusText: z.string().describe("Status text for character encoding."),
  statusColorClass: z.string().describe("Tailwind CSS class for status color."),
  encoding: z.string().optional().describe("The detected character encoding, e.g., 'utf-8'."),
});
export type EncodingAnalysis = z.infer<typeof EncodingAnalysisSchema>;

// --- BRANDING ---
export const UrlAnalysisSchema = z.object({
  statusText: z.string().describe("Status text for URL analysis."),
  statusColorClass: z.string().describe("Tailwind CSS class for status color."),
  url: z.string().optional().describe("The primary URL of the page."),
  length: z.number().optional().describe("Length of the URL string."),
});
export type UrlAnalysis = z.infer<typeof UrlAnalysisSchema>;

export const FaviconAnalysisSchema = z.object({
  statusText: z.string().describe("Status text for Favicon presence."),
  statusColorClass: z.string().describe("Tailwind CSS class for status color."),
  details: z.string().optional().describe("Details about favicon presence or issues. e.g. 'Great, your website has a favicon.'"),
});
export type FaviconAnalysis = z.infer<typeof FaviconAnalysisSchema>;

export const Custom404PageAnalysisSchema = z.object({
  statusText: z.string().describe("Status text for Custom 404 Page presence."),
  statusColorClass: z.string().describe("Tailwind CSS class for status color."),
  details: z.string().optional().describe("Details about the custom 404 page. e.g., 'Great, your website has a custom 404 error page.'"),
  httpStatusCode: z.number().optional().describe("The HTTP status code returned for a non-existent page, e.g., 404."),
});
export type Custom404PageAnalysis = z.infer<typeof Custom404PageAnalysisSchema>;

export const BrandingAnalysisSchema = z.object({
  urlAnalysis: UrlAnalysisSchema.optional(),
  faviconAnalysis: FaviconAnalysisSchema.optional(),
  custom404PageAnalysis: Custom404PageAnalysisSchema.optional(),
});
export type BrandingAnalysis = z.infer<typeof BrandingAnalysisSchema>;

// --- DOMAIN ---
export const DomainRegistrationAnalysisSchema = z.object({
  statusText: z.string().describe("Status text for Domain Registration."),
  statusColorClass: z.string().describe("Tailwind CSS class for status color."),
  createdDate: z.string().optional().describe("Simulated creation date, e.g., 'Created a year ago'."),
  expiryDate: z.string().optional().describe("Simulated expiry date, e.g., 'Expires in 2 years'."),
});
export type DomainRegistrationAnalysis = z.infer<typeof DomainRegistrationAnalysisSchema>;

export const DomainAvailabilityItemSchema = z.object({
  domain: z.string().describe("The domain name variant, e.g., 'example.com'."),
  status: z.string().describe("Availability status message, e.g., 'Available. Register it now!' or 'Taken'."),
  isAvailable: z.boolean().describe("True if the domain is likely available, false otherwise."),
});
export type DomainAvailabilityItem = z.infer<typeof DomainAvailabilityItemSchema>;

export const DomainAvailabilityAnalysisSchema = z.object({
  statusText: z.string().describe("Overall status text for Domain Availability."),
  statusColorClass: z.string().describe("Tailwind CSS class for status color."),
  domains: z.array(DomainAvailabilityItemSchema).optional().describe("List of related domains and their simulated availability."),
});
export type DomainAvailabilityAnalysis = z.infer<typeof DomainAvailabilityAnalysisSchema>;

export const DomainAnalysisSchema = z.object({
  domainRegistration: DomainRegistrationAnalysisSchema.optional(),
  domainAvailability: DomainAvailabilityAnalysisSchema.optional(),
});
export type DomainAnalysis = z.infer<typeof DomainAnalysisSchema>;


// --- OFF-PAGE SEO ---
export const BacklinksScoreSchema = z.object({
    statusText: z.string().describe("Status text for backlinks score, e.g., 'Bad', 'Good'."),
    statusColorClass: z.string().describe("Tailwind class for status color."),
    score: z.number().min(0).max(100).optional().describe("Backlink score from 0-100."),
    details: z.string().optional().describe("Additional details about the score."),
});
export type BacklinksScore = z.infer<typeof BacklinksScoreSchema>;

export const BacklinksCounterSchema = z.object({
    statusText: z.string().describe("Status text for backlinks count."),
    statusColorClass: z.string().describe("Tailwind class for status color."),
    count: z.number().optional().describe("Total number of backlinks found."),
});
export type BacklinksCounter = z.infer<typeof BacklinksCounterSchema>;

export const ReferringDomainsSchema = z.object({
    statusText: z.string().describe("Status text for referring domains."),
    statusColorClass: z.string().describe("Tailwind class for status color."),
    count: z.number().optional().describe("Total number of referring domains."),
});
export type ReferringDomains = z.infer<typeof ReferringDomainsSchema>;

export const OffPageAnalysisSchema = z.object({
    backlinksScore: BacklinksScoreSchema.optional(),
    backlinksCounter: BacklinksCounterSchema.optional(),
    referringDomains: ReferringDomainsSchema.optional(),
});
export type OffPageAnalysis = z.infer<typeof OffPageAnalysisSchema>;

// --- TRAFFIC (as per new image section, not websiteTraffic for charts) ---
export const TrafficEstimationsSchema = z.object({
    statusText: z.string().describe("Status of traffic estimations, e.g., 'Very Low'."),
    statusColorClass: z.string().describe("Tailwind class for status color."),
    estimationText: z.string().optional().describe("Qualitative estimation, e.g., 'Very Low', 'Moderate'."),
    details: z.string().optional().describe("Additional details about estimations."),
});
export type TrafficEstimations = z.infer<typeof TrafficEstimationsSchema>;

export const TrafficRankSchema = z.object({
    statusText: z.string().describe("Status of traffic rank."),
    statusColorClass: z.string().describe("Tailwind class for status color."),
    globalRankText: z.string().optional().describe("Text for global rank, e.g., 'Global rank too low to be calculated'."),
    tldRankText: z.string().optional().describe("Text for TLD rank."),
});
export type TrafficRank = z.infer<typeof TrafficRankSchema>;

export const TrafficReportAnalysisSchema = z.object({
    trafficEstimations: TrafficEstimationsSchema.optional(),
    trafficRank: TrafficRankSchema.optional(),
});
export type TrafficReportAnalysis = z.infer<typeof TrafficReportAnalysisSchema>;

// --- LOCAL SEO ---
export const LocalDirectoryLinkSchema = z.object({
    text: z.string().describe("Text for the link, e.g., 'Add your Google My Business profile'"),
    url: z.string().url().describe("URL for the directory link."),
});
export type LocalDirectoryLink = z.infer<typeof LocalDirectoryLinkSchema>;

export const LocalDirectoriesSchema = z.object({
    statusText: z.string().describe("Status of local directory listings."),
    statusColorClass: z.string().describe("Tailwind class for status color."),
    links: z.array(LocalDirectoryLinkSchema).optional().describe("List of links to local directory services."),
});
export type LocalDirectories = z.infer<typeof LocalDirectoriesSchema>;

export const OnlineReviewsSchema = z.object({
    statusText: z.string().describe("Status of online reviews."),
    statusColorClass: z.string().describe("Tailwind class for status color."),
    details: z.string().optional().describe("Details about online reviews, e.g., 'No local reviews found.'"),
});
export type OnlineReviews = z.infer<typeof OnlineReviewsSchema>;

export const LocalSeoAnalysisSchema = z.object({
    localDirectories: LocalDirectoriesSchema.optional(),
    onlineReviews: OnlineReviewsSchema.optional(),
});
export type LocalSeoAnalysis = z.infer<typeof LocalSeoAnalysisSchema>;

// --- SOCIAL MEDIA ANALYSIS ---
export const SocialProfileSchema = z.object({
  platform: z.string().describe("Name of the social media platform, e.g., 'Facebook', 'Twitter'."),
  url: z.string().url().describe("URL to the social media profile."),
});
export type SocialProfile = z.infer<typeof SocialProfileSchema>;

export const DiscoveredProfilesSchema = z.object({
  statusText: z.string().describe("Overall status, e.g., 'Found', 'Outdated', 'No profiles found'."),
  statusColorClass: z.string().describe("Tailwind class for status color."),
  profiles: z.array(SocialProfileSchema).optional().describe("List of discovered social media profiles."),
  summaryText: z.string().optional().describe("A brief summary about the discovered profiles, e.g., 'We found the following social profiles on your website:'")
});
export type DiscoveredProfiles = z.infer<typeof DiscoveredProfilesSchema>;

export const SocialAccountDetailsSchema = z.object({
  platform: z.string().describe("Name of the social media platform, e.g., 'Facebook', 'Twitter'."),
  url: z.string().url().nullable().optional().describe("URL to the specific social media page. Return empty string if not found."),
  name: z.string().nullable().optional().describe("Name of the account or page. Return empty string if not found."),
  found: z.boolean().describe("Whether the account was found or not."),
  statusText: z.string().describe("Status like 'Found', 'Not found', 'Needs update'."),
  statusColorClass: z.string().describe("Tailwind class for status color."),
});
export type SocialAccountDetails = z.infer<typeof SocialAccountDetailsSchema>;

export const SocialEngagementItemSchema = z.object({
  metricName: z.string().describe("Name of the engagement metric, e.g., 'Facebook Shares', 'Facebook Comments', 'Facebook Likes'."),
  value: z.number().describe("The count for the engagement metric. Use 0 if no data."),
  iconName: z.string().optional().describe("Optional: Name of a Lucide icon to represent the metric, e.g., 'ThumbsUp', 'MessageCircle', 'Share2'.")
});
export type SocialEngagementItem = z.infer<typeof SocialEngagementItemSchema>;

export const SocialMediaEngagementSchema = z.object({
  statusText: z.string().describe("Overall status of social media engagement."),
  statusColorClass: z.string().describe("Tailwind class for status color."),
  summary: z.string().optional().describe("A brief summary, e.g., 'Your homepage is sometimes shared on social networks.'"),
  engagements: z.array(SocialEngagementItemSchema).optional().describe("List of engagement metrics."),
});
export type SocialMediaEngagement = z.infer<typeof SocialMediaEngagementSchema>;

export const SocialMediaAnalysisSchema = z.object({
  discoveredProfiles: DiscoveredProfilesSchema.optional(),
  facebookPage: SocialAccountDetailsSchema.optional(),
  twitterAccount: SocialAccountDetailsSchema.optional(),
  instagramAccount: SocialAccountDetailsSchema.optional(),
  linkedinAccount: SocialAccountDetailsSchema.optional(),
  socialMediaEngagement: SocialMediaEngagementSchema.optional(),
}).describe("Analysis of social media presence and engagement.");
export type SocialMediaAnalysis = z.infer<typeof SocialMediaAnalysisSchema>;



// --- MAIN SCHEMAS ---
export const GenerateSeoReportInputSchema = z.object({
  url: z.string().describe('The URL of the website to analyze.'),
});
export type GenerateSeoReportInput = z.infer<typeof GenerateSeoReportInputSchema>;

export const GenerateSeoReportOutputSchema = z.object({
  report: z.string().describe('A comprehensive SEO report, including identified problems and optimization suggestions.'),
  score: z.number().describe('An SEO score (out of 100) representing the overall performance of the website.'),
  performanceReport: z.string().describe('Performance report of the website'),
  performanceScore: z.number().describe('A score out of 100 of website performance.'),
  websiteTraffic: z.array(MonthlyTrafficDataSchema)
    .optional()
    .describe('Monthly website traffic data for the past 6 months. This data is fetched using the getWebsiteTrafficData tool.'),
  
  lcpValue: z.string().optional().describe('Largest Contentful Paint value (e.g., "2.5s").'),
  lcpStatus: z.enum(["Good", "Improve", "Poor"]).optional().describe('Largest Contentful Paint status.'),
  clsValue: z.string().optional().describe('Cumulative Layout Shift value (e.g., "0.1").'),
  clsStatus: z.enum(["Good", "Improve", "Poor"]).optional().describe('Cumulative Layout Shift status.'),
  fidValue: z.string().optional().describe('First Input Delay value (e.g., "100ms").'),
  fidStatus: z.enum(["Good", "Improve", "Poor"]).optional().describe('First Input Delay status.'),
  
  onPageScore: z.number().min(0).max(100).optional().describe('Score for On-Page SEO factors (0-100).'),
  offPageScore: z.number().min(0).max(100).optional().describe('Score for Off-Page SEO factors (0-100).'),
  technicalScore: z.number().min(0).max(100).optional().describe('Score for Technical SEO factors (0-100).'),
  contentScore: z.number().min(0).max(100).optional().describe('Score for Content quality and relevance (0-100).'),
  uxScore: z.number().min(0).max(100).optional().describe('Score for User Experience (UX) factors (0-100).'),
  
  onPageSeoDetails: z.array(OnPageDetailItemSchema).optional().describe("Structured details for on-page SEO items like Title Tag, Meta Description, and Google Preview, based on the analyzed URL."),
  headingsAnalysis: HeadingsAnalysisSchema.optional().describe("Analysis of heading tags (H1-H6) on the page."),
  contentAnalysis: ContentAnalysisSchema.optional().describe("Analysis of keywords and keyphrases found in the content."),
  altAttributeAnalysis: AltAttributeAnalysisSchema.optional().describe("Analysis of image alt attributes."),
  inPageLinksAnalysis: InPageLinksAnalysisSchema.optional().describe("Analysis of internal and external links on the page."),
  indexingAnalysis: IndexingAnalysisSchema.optional().describe("Detailed analysis of website indexing aspects."),
  technicalSeoAnalysis: TechnicalSeoAnalysisSchema.optional().describe("Detailed analysis of technical SEO aspects like robots tags, hreflang, etc."),
  mobileAnalysis: MobileAnalysisSchema.optional().describe("Detailed analysis of mobile friendliness, rendering, and tap targets."),
  structuredDataAnalysis: StructuredDataAnalysisSchema.optional().describe("Detailed analysis of structured data like Schema.org, Open Graph, and Twitter Cards."),
  microformatsAnalysis: MicroformatsAnalysisSchema.optional().describe("Analysis of detected microformats on the page."),
  securityAnalysis: SecurityAnalysisSchema.optional().describe("Analysis of website security aspects."),
  performanceAnalysis: PerformanceAnalysisSchema.optional().describe("Analysis of website performance aspects."),
  accessibilityAnalysis: AccessibilityAnalysisSchema.optional().describe("Analysis of website accessibility aspects."),
  technologiesAnalysis: TechnologiesAnalysisSchema.optional().describe("Analysis of detected technologies."),
  analyticsAnalysis: AnalyticsAnalysisSchema.optional().describe("Analysis of detected analytics tools."),
  doctypeAnalysis: DoctypeAnalysisSchema.optional().describe("Analysis of the website's DOCTYPE."),
  encodingAnalysis: EncodingAnalysisSchema.optional().describe("Analysis of the website's character encoding."),
  brandingAnalysis: BrandingAnalysisSchema.optional().describe("Analysis of website branding elements (URL, Favicon, Custom 404)."),
  domainAnalysis: DomainAnalysisSchema.optional().describe("Analysis of domain registration and availability."),

  // New Sections based on the image
  offPageAnalysis: OffPageAnalysisSchema.optional().describe("Analysis of off-page SEO factors like backlinks."),
  trafficReportAnalysis: TrafficReportAnalysisSchema.optional().describe("Analysis of traffic estimations and rank (not chart data)."),
  localSeoAnalysis: LocalSeoAnalysisSchema.optional().describe("Analysis of local SEO factors like directories and reviews."),
  socialMediaAnalysis: SocialMediaAnalysisSchema.optional().describe("Analysis of social media presence and engagement."),
});
export type GenerateSeoReportOutput = z.infer<typeof GenerateSeoReportOutputSchema>;

