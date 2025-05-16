
'use client';

import * as React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { 
  generateSeoReport, 
  // On-Page types
  type OnPageDetailItem as AiOnPageDetailItem,
  type HeadingsAnalysis as AiHeadingsAnalysisType,
  type ContentAnalysis as AiContentAnalysisType,
  type AltAttributeAnalysis as AiAltAttributeAnalysisType,
  type InPageLinksAnalysis as AiInPageLinksAnalysisType,
  // Indexing types
  type IndexingAnalysis as AiIndexingAnalysisType,
  type WebFeedsAnalysis as AiWebFeedsAnalysisType,
  type UrlResolveAnalysis as AiUrlResolveAnalysisType,
  type RobotsTxtAnalysis as AiRobotsTxtAnalysisType,
  type XmlSitemapAnalysis as AiXmlSitemapAnalysisType,
  type SitemapValidityAnalysis as AiSitemapValidityAnalysisType,
  type UrlParametersAnalysis as AiUrlParametersAnalysisType,
  // Technical SEO types
  type TechnicalSeoAnalysis as AiTechnicalSeoAnalysisType,
  type RobotsTagsAnalysis as AiRobotsTagsAnalysisType,
  type IndexFollowAnalysis as AiIndexFollowAnalysisType,
  type HreflangTagsAnalysis as AiHreflangTagsAnalysisType,
  type BrokenLinksAnalysis as AiBrokenLinksAnalysisType,
  type UnderscoresInUrlsAnalysis as AiUnderscoresInUrlsAnalysisType,
  type DiscoveredPagesAnalysis as AiDiscoveredPagesAnalysisType,
  // Mobile types
  type MobileAnalysis as AiMobileAnalysisType,
  type MobileFriendlinessAnalysis as AiMobileFriendlinessAnalysisType,
  type MobileRenderingAnalysis as AiMobileRenderingAnalysisType,
  type TapTargetsAnalysis as AiTapTargetsAnalysisType,
  // Structured Data types
  type StructuredDataAnalysis as AiStructuredDataAnalysisType,
  type SchemaOrgAnalysis as AiSchemaOrgAnalysisType,
  type OpenGraphAnalysis as AiOpenGraphAnalysisType
} from '@/ai/flows/generate-seo-report';

import type { 
  ReportData, 
  OnPageItem, 
  GooglePreviewData, 
  HeadingsAnalysis, 
  ContentAnalysis, 
  AltAttributeAnalysis, 
  InPageLinksAnalysis,
  WebFeedsAnalysis,
  UrlResolveAnalysis,
  RobotsTxtAnalysis,
  XmlSitemapAnalysis,
  SitemapValidityAnalysis,
  UrlParametersAnalysis,
  // Technical SEO
  RobotsTagsAnalysis,
  IndexFollowAnalysis,
  HreflangTagsAnalysis,
  BrokenLinksAnalysis,
  UnderscoresInUrlsAnalysis,
  DiscoveredPagesAnalysis,
  // Mobile
  MobileFriendlinessAnalysis,
  MobileRenderingAnalysis,
  TapTargetsAnalysis,
  // Structured Data
  SchemaOrgAnalysis,
  OpenGraphAnalysis
} from '@/lib/types';

import { useToast } from "@/hooks/use-toast";
import { 
  LoaderCircle, AlertTriangle, CheckCircle2, Info, FileText, BookOpen, Heading1, 
  FileSearch2, ImageIcon, Link as LinkIcon, Rss, Network, FileCode, ListChecks, Link2 as Link2Icon,
  Tags, Target, Languages, Unlink, DraftingCompass, FileStack, Smartphone, TabletSmartphone, MousePointerClick,
  Binary, Share2 // Icons for Structured Data
} from 'lucide-react';

import ReportHeaderCard from '@/components/report-header-card';
import ReportFilters from '@/components/report-filters';
import ReportAccordionSection from '@/components/report-accordion-section';

const formSchema = z.object({
  url: z.string().url({ message: 'Please enter a valid URL (e.g., https://example.com)' }),
});

type FormValues = z.infer<typeof formSchema>;

// Helper to map various AI data structures to OnPageItem for the accordion
const mapAiDataToAccordionItem = (
  id: string, 
  title: string, 
  icon: React.ElementType, 
  aiData: any, 
  defaultStatusText: string = 'N/A',
  defaultStatusColorClass: string = 'text-muted-foreground'
): OnPageItem => {
  
  let statusText = defaultStatusText;
  let statusColorClass = defaultStatusColorClass;

  if (aiData && typeof aiData === 'object' && 'statusText' in aiData && aiData.statusText) {
    statusText = aiData.statusText;
  }
  if (aiData && typeof aiData === 'object' && 'statusColorClass' in aiData && aiData.statusColorClass) {
    statusColorClass = aiData.statusColorClass;
  }
  
  const item: OnPageItem = {
    id,
    icon,
    title,
    statusText,
    statusColorClass,
    badgeVariant: 'outline',
  };

  // Assign specific data structures based on id
  if (id === 'headings' && aiData) item.headingsAnalysis = aiData as HeadingsAnalysis;
  if (id === 'contentAnalysis' && aiData) item.contentAnalysisData = aiData as ContentAnalysis;
  if (id === 'altAttributes' && aiData) item.altAttributeAnalysis = aiData as AltAttributeAnalysis;
  if (id === 'inPageLinks' && aiData) item.inPageLinksAnalysis = aiData as InPageLinksAnalysis;
  
  if (id === 'webFeeds' && aiData) item.webFeedsData = aiData as WebFeedsAnalysis;
  if (id === 'urlResolve' && aiData) item.urlResolveData = aiData as UrlResolveAnalysis;
  if (id === 'robotsTxt' && aiData) item.robotsTxtData = aiData as RobotsTxtAnalysis;
  if (id === 'xmlSitemap' && aiData) item.xmlSitemapData = aiData as XmlSitemapAnalysis;
  if (id === 'sitemapValidity' && aiData) item.sitemapValidityData = aiData as SitemapValidityAnalysis;
  if (id === 'urlParameters' && aiData) item.urlParametersData = aiData as UrlParametersAnalysis;

  if (id === 'robotsTags' && aiData) item.robotsTagsData = aiData as RobotsTagsAnalysis;
  if (id === 'indexFollow' && aiData) item.indexFollowData = aiData as IndexFollowAnalysis;
  if (id === 'hreflangTags' && aiData) item.hreflangTagsData = aiData as HreflangTagsAnalysis;
  if (id === 'brokenLinks' && aiData) item.brokenLinksData = aiData as BrokenLinksAnalysis;
  if (id === 'underscoresInUrls' && aiData) item.underscoresInUrlsData = aiData as UnderscoresInUrlsAnalysis;
  if (id === 'discoveredPages' && aiData) item.discoveredPagesData = aiData as DiscoveredPagesAnalysis;

  if (id === 'mobileFriendliness' && aiData) item.mobileFriendlinessData = aiData as MobileFriendlinessAnalysis;
  if (id === 'mobileRendering' && aiData) item.mobileRenderingData = aiData as MobileRenderingAnalysis;
  if (id === 'tapTargets' && aiData) item.tapTargetsData = aiData as TapTargetsAnalysis;

  if (id === 'schemaOrg' && aiData) item.schemaOrgData = aiData as SchemaOrgAnalysis;
  if (id === 'openGraphProtocol' && aiData) item.openGraphData = aiData as OpenGraphAnalysis;
  
  return item;
};


const mapAiOnPageDetailToOnPageItem = (aiItem: AiOnPageDetailItem): OnPageItem => {
  let icon: React.ElementType = Info; 
  if (aiItem.id === 'titleTag') icon = FileText;
  else if (aiItem.id === 'metaDescription') icon = BookOpen;
  else if (aiItem.id === 'googlePreview') icon = CheckCircle2;

  return {
    id: aiItem.id,
    icon: icon,
    title: aiItem.title,
    statusText: aiItem.statusText,
    statusColorClass: aiItem.statusColorClass,
    badgeVariant: 'outline', 
    content: aiItem.content || undefined,
    details: aiItem.details,
    googleDesktopPreview: aiItem.googleDesktopPreview as GooglePreviewData | undefined, 
    googleMobilePreview: aiItem.googleMobilePreview as GooglePreviewData | undefined, 
  };
};

const getDefaultOnPageAccordionItems = (url?: string): OnPageItem[] => [
  { id: 'titleTag', icon: FileText, title: 'Title Tag', statusText: 'N/A', statusColorClass: 'text-muted-foreground', badgeVariant: 'outline', content: `Example: ${url ? new URL(url).hostname : 'YourWebsite'}.com Title`, details: 'Length: ~60 chars' },
  { id: 'metaDescription', icon: BookOpen, title: 'Meta Description', statusText: 'N/A', statusColorClass: 'text-muted-foreground', badgeVariant: 'outline', content: 'Example: Concise summary of your page content.', details: 'Length: ~155 chars' },
  { id: 'googlePreview', icon: CheckCircle2, title: 'Google Preview', statusText: 'N/A', statusColorClass: 'text-muted-foreground', badgeVariant: 'outline', googleDesktopPreview: { url: url || 'example.com', title: 'Example Title', description: 'Example desktop description.'}, googleMobilePreview: { url: url || 'example.com', title: 'Example Mobile Title', description: 'Example mobile description.'} },
  { id: 'headings', icon: Heading1, title: 'Headings', statusText: 'N/A', statusColorClass: 'text-muted-foreground', headingsAnalysis: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', h1Count: 0, h2Count: 0, h3Count: 0, h4Count: 0, h5Count: 0, h6Count: 0, headings: [] } },
  { id: 'contentAnalysis', icon: FileSearch2, title: 'Content Analysis', statusText: 'N/A', statusColorClass: 'text-muted-foreground', contentAnalysisData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', keywords: [] } },
  { id: 'altAttributes', icon: ImageIcon, title: 'Alt Attributes', statusText: 'N/A', statusColorClass: 'text-muted-foreground', altAttributeAnalysis: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', totalImages: 0, imagesMissingAlts: 0, details: '' } },
  { id: 'inPageLinks', icon: LinkIcon, title: 'In-Page Links', statusText: 'N/A', statusColorClass: 'text-muted-foreground', inPageLinksAnalysis: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', totalLinks: 0, internalLinks: 0, externalLinksFollow: 0, externalLinksNofollow: 0, links: [] } },
];

const getDefaultIndexingAccordionItems = (): OnPageItem[] => [
  { id: 'webFeeds', icon: Rss, title: 'Web Feeds', statusText: 'N/A', statusColorClass: 'text-muted-foreground', webFeedsData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', details: 'Checking...', feeds: []}},
  { id: 'urlResolve', icon: Network, title: 'URL Resolve', statusText: 'N/A', statusColorClass: 'text-muted-foreground', urlResolveData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', details: 'Checking...', resolutions: []}},
  { id: 'robotsTxt', icon: FileCode, title: 'Robots.txt', statusText: 'N/A', statusColorClass: 'text-muted-foreground', robotsTxtData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', robotsTxtUrl: '', findings: []}},
  { id: 'xmlSitemap', icon: FileText, title: 'XML Sitemap', statusText: 'N/A', statusColorClass: 'text-muted-foreground', xmlSitemapData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', sitemapUrl: '', details: ''}},
  { id: 'sitemapValidity', icon: ListChecks, title: 'Sitemaps Validity', statusText: 'N/A', statusColorClass: 'text-muted-foreground', sitemapValidityData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', summary: 'Checking...', checks: []}},
  { id: 'urlParameters', icon: Link2Icon, title: 'URL Parameters', statusText: 'N/A', statusColorClass: 'text-muted-foreground', urlParametersData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', details: 'Checking...'}}
];

const getDefaultTechnicalSeoItems = (): OnPageItem[] => [
  { id: 'robotsTags', icon: Tags, title: 'Robots Tags', statusText: 'N/A', statusColorClass: 'text-muted-foreground', robotsTagsData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', details: 'Checking...', foundTags: [] } },
  { id: 'indexFollow', icon: Target, title: 'Index and Follow', statusText: 'N/A', statusColorClass: 'text-muted-foreground', indexFollowData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', details: 'Checking...' } },
  { id: 'hreflangTags', icon: Languages, title: 'Hreflang Tags', statusText: 'N/A', statusColorClass: 'text-muted-foreground', hreflangTagsData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', details: 'Checking...' } },
  { id: 'brokenLinks', icon: Unlink, title: 'Broken Links', statusText: 'N/A', statusColorClass: 'text-muted-foreground', brokenLinksData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', details: 'Checking...' } },
  { id: 'underscoresInUrls', icon: DraftingCompass, title: 'Underscores in the URLs', statusText: 'N/A', statusColorClass: 'text-muted-foreground', underscoresInUrlsData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', details: 'Checking...' } },
  { id: 'discoveredPages', icon: FileStack, title: 'Discovered Pages', statusText: 'N/A', statusColorClass: 'text-muted-foreground', discoveredPagesData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', count: 0, details: 'Checking...' } },
];

const getDefaultMobileItems = (): OnPageItem[] => [
  { id: 'mobileFriendliness', icon: Smartphone, title: 'Mobile Friendliness', statusText: 'N/A', statusColorClass: 'text-muted-foreground', mobileFriendlinessData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', ratingText: 'N/A', progressValue: 0, details: 'Checking...' } },
  { id: 'mobileRendering', icon: TabletSmartphone, title: 'Mobile Rendering', statusText: 'N/A', statusColorClass: 'text-muted-foreground', mobileRenderingData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', details: 'Checking...' } },
  { id: 'tapTargets', icon: MousePointerClick, title: 'Tap Targets', statusText: 'N/A', statusColorClass: 'text-muted-foreground', tapTargetsData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', details: 'Checking...' } },
];

const getDefaultStructuredDataItems = (): OnPageItem[] => [
    { id: 'schemaOrg', icon: Binary, title: 'Schema.org', statusText: 'N/A', statusColorClass: 'text-muted-foreground', schemaOrgData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', schemaTypes: [], issues: [], warningCount: 0 } },
    { id: 'openGraphProtocol', icon: Share2, title: 'Open Graph Protocol', statusText: 'N/A', statusColorClass: 'text-muted-foreground', openGraphData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', previewData: { title: 'Example Site', description: 'An example site description for Open Graph.', imageUrl: 'https://placehold.co/600x315.png?text=Open+Graph+Preview', url: 'example.com' }, tags: [] } },
];

export default function HomePage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [reportData, setReportData] = React.useState<ReportData | null>(null);
  const [onPageAccordionItems, setOnPageAccordionItems] = React.useState<OnPageItem[]>(getDefaultOnPageAccordionItems());
  const [indexingAccordionItems, setIndexingAccordionItems] = React.useState<OnPageItem[]>(getDefaultIndexingAccordionItems());
  const [technicalSeoAccordionItems, setTechnicalSeoAccordionItems] = React.useState<OnPageItem[]>(getDefaultTechnicalSeoItems());
  const [mobileAccordionItems, setMobileAccordionItems] = React.useState<OnPageItem[]>(getDefaultMobileItems());
  const [structuredDataAccordionItems, setStructuredDataAccordionItems] = React.useState<OnPageItem[]>(getDefaultStructuredDataItems());
  const [error, setError] = React.useState<string | null>(null);
  const [currentUrl, setCurrentUrl] = React.useState<string>('');

  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { url: '' },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setError(null);
    setReportData(null);
    setCurrentUrl(data.url);
    // Reset accordion items to defaults for the new URL
    setOnPageAccordionItems(getDefaultOnPageAccordionItems(data.url)); 
    setIndexingAccordionItems(getDefaultIndexingAccordionItems());
    setTechnicalSeoAccordionItems(getDefaultTechnicalSeoItems());
    setMobileAccordionItems(getDefaultMobileItems());
    setStructuredDataAccordionItems(getDefaultStructuredDataItems());

    try {
      const result = await generateSeoReport({ url: data.url });
      if (result) {
        const augmentedResult: ReportData = {
          ...result,
          urlAnalyzed: data.url,
          analysisTimestamp: new Date().toISOString(),
          passedPercent: result.score > 0 ? Math.min(result.score + 10, 70) : 0, 
          toImprovePercent: result.score > 0 ? 20 : 0, 
          errorsPercent: result.score > 0 ? 10 : 0, 
        };
        setReportData(augmentedResult);

        // --- Process On-Page SEO Details ---
        let newOnPageItems: OnPageItem[] = [];
        if (result.onPageSeoDetails && result.onPageSeoDetails.length > 0) {
          newOnPageItems.push(...result.onPageSeoDetails.map(mapAiOnPageDetailToOnPageItem));
        } else {
          newOnPageItems.push(...getDefaultOnPageAccordionItems(data.url).filter(item => ['titleTag', 'metaDescription', 'googlePreview'].includes(item.id)));
        }
        newOnPageItems.push(mapAiDataToAccordionItem('headings', 'Headings', Heading1, result.headingsAnalysis, result.headingsAnalysis?.statusText, result.headingsAnalysis?.statusColorClass));
        newOnPageItems.push(mapAiDataToAccordionItem('contentAnalysis', 'Content Analysis', FileSearch2, result.contentAnalysis, result.contentAnalysis?.statusText, result.contentAnalysis?.statusColorClass));
        newOnPageItems.push(mapAiDataToAccordionItem('altAttributes', 'Alt Attributes', ImageIcon, result.altAttributeAnalysis, result.altAttributeAnalysis?.statusText, result.altAttributeAnalysis?.statusColorClass));
        newOnPageItems.push(mapAiDataToAccordionItem('inPageLinks', 'In-Page Links', LinkIcon, result.inPageLinksAnalysis, result.inPageLinksAnalysis?.statusText, result.inPageLinksAnalysis?.statusColorClass));
        setOnPageAccordionItems(newOnPageItems);

        // --- Process Indexing Analysis ---
        const newIndexingItems: OnPageItem[] = [];
        if (result.indexingAnalysis) {
          const ia = result.indexingAnalysis;
          newIndexingItems.push(mapAiDataToAccordionItem('webFeeds', 'Web Feeds', Rss, ia.webFeeds));
          newIndexingItems.push(mapAiDataToAccordionItem('urlResolve', 'URL Resolve', Network, ia.urlResolve));
          newIndexingItems.push(mapAiDataToAccordionItem('robotsTxt', 'Robots.txt', FileCode, ia.robotsTxt));
          newIndexingItems.push(mapAiDataToAccordionItem('xmlSitemap', 'XML Sitemap', FileText, ia.xmlSitemap));
          newIndexingItems.push(mapAiDataToAccordionItem('sitemapValidity', 'Sitemaps Validity', ListChecks, ia.sitemapValidity));
          newIndexingItems.push(mapAiDataToAccordionItem('urlParameters', 'URL Parameters', Link2Icon, ia.urlParameters));
        }
        setIndexingAccordionItems(newIndexingItems.length > 0 ? newIndexingItems : getDefaultIndexingAccordionItems());

        // --- Process Technical SEO Analysis ---
        const newTechnicalSeoItems: OnPageItem[] = [];
        if (result.technicalSeoAnalysis) {
          const tsa = result.technicalSeoAnalysis;
          newTechnicalSeoItems.push(mapAiDataToAccordionItem('robotsTags', 'Robots Tags', Tags, tsa.robotsTags));
          newTechnicalSeoItems.push(mapAiDataToAccordionItem('indexFollow', 'Index and Follow', Target, tsa.indexFollow));
          newTechnicalSeoItems.push(mapAiDataToAccordionItem('hreflangTags', 'Hreflang Tags', Languages, tsa.hreflangTags));
          newTechnicalSeoItems.push(mapAiDataToAccordionItem('brokenLinks', 'Broken Links', Unlink, tsa.brokenLinks));
          newTechnicalSeoItems.push(mapAiDataToAccordionItem('underscoresInUrls', 'Underscores in the URLs', DraftingCompass, tsa.underscoresInUrls));
          newTechnicalSeoItems.push(mapAiDataToAccordionItem('discoveredPages', 'Discovered Pages', FileStack, tsa.discoveredPages));
        }
        setTechnicalSeoAccordionItems(newTechnicalSeoItems.length > 0 ? newTechnicalSeoItems : getDefaultTechnicalSeoItems());
        
        // --- Process Mobile Analysis ---
        const newMobileItems: OnPageItem[] = [];
        if (result.mobileAnalysis) {
          const ma = result.mobileAnalysis;
          newMobileItems.push(mapAiDataToAccordionItem('mobileFriendliness', 'Mobile Friendliness', Smartphone, ma.mobileFriendliness));
          newMobileItems.push(mapAiDataToAccordionItem('mobileRendering', 'Mobile Rendering', TabletSmartphone, ma.mobileRendering));
          newMobileItems.push(mapAiDataToAccordionItem('tapTargets', 'Tap Targets', MousePointerClick, ma.tapTargets));
        }
        setMobileAccordionItems(newMobileItems.length > 0 ? newMobileItems : getDefaultMobileItems());

        // --- Process Structured Data Analysis ---
        const newStructuredDataItems: OnPageItem[] = [];
        if (result.structuredDataAnalysis) {
            const sda = result.structuredDataAnalysis;
            newStructuredDataItems.push(mapAiDataToAccordionItem('schemaOrg', 'Schema.org', Binary, sda.schemaOrg, sda.schemaOrg?.statusText, sda.schemaOrg?.statusColorClass));
            newStructuredDataItems.push(mapAiDataToAccordionItem('openGraphProtocol', 'Open Graph Protocol', Share2, sda.openGraph, sda.openGraph?.statusText, sda.openGraph?.statusColorClass));
        }
        setStructuredDataAccordionItems(newStructuredDataItems.length > 0 ? newStructuredDataItems : getDefaultStructuredDataItems());


        toast({ title: "Analysis Complete", description: `SEO report for ${data.url} generated successfully.`, variant: "default" });
      } else {
        throw new Error("Received empty report from AI.");
      }
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred during analysis.';
      setError(errorMessage);
      setOnPageAccordionItems(getDefaultOnPageAccordionItems(currentUrl));
      setIndexingAccordionItems(getDefaultIndexingAccordionItems());
      setTechnicalSeoAccordionItems(getDefaultTechnicalSeoItems());
      setMobileAccordionItems(getDefaultMobileItems());
      setStructuredDataAccordionItems(getDefaultStructuredDataItems());
      toast({ title: "Analysis Failed", description: errorMessage, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    const urlValue = form.getValues("url") || currentUrl;
    if (urlValue) {
      onSubmit({ url: urlValue });
    } else {
      toast({ title: "URL missing", description: "Please enter a URL to refresh the analysis.", variant: "destructive" });
    }
  };

  const handleDownloadPdf = () => {
    if (reportData) { window.print(); } 
    else { toast({ title: "No Report Data", description: "Please generate a report before downloading.", variant: "destructive" }); }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4 md:px-8 printable-area">
      <div className="w-full max-w-3xl mb-6 no-print">
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-end gap-3 p-4 bg-card rounded-lg shadow-md">
              <FormField control={form.control} name="url" render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormLabel className="text-sm text-muted-foreground sr-only">Website URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter website URL (e.g., https://example.com)" {...field} className="text-base py-2 h-10" disabled={isLoading} />
                    </FormControl>
                    <FormMessage className="text-xs"/>
                  </FormItem>
                )} />
              <Button type="submit" className="py-2 h-10 text-sm font-semibold bg-primary hover:bg-primary/90" disabled={isLoading}>
                {isLoading ? (<><LoaderCircle className="mr-2 h-4 w-4 animate-spin" />Analyzing...</>) : ('Analyze')}
              </Button>
            </form>
          </Form>
      </div>
      
      {isLoading && (
        <div className="flex flex-col items-center justify-center text-center p-8 bg-card rounded-lg shadow-md w-full max-w-3xl">
          <LoaderCircle className="h-12 w-12 animate-spin text-primary mb-4" />
          <p className="text-lg font-semibold">Generating your report...</p>
          <p className="text-muted-foreground">This might take a few moments. Please wait.</p>
        </div>
      )}

      {error && !isLoading && (
        <Card className="bg-destructive text-destructive-foreground shadow-md w-full max-w-3xl">
          <CardHeader><CardTitle className="flex items-center"><AlertTriangle className="mr-2 h-5 w-5" />Analysis Error</CardTitle></CardHeader>
          <CardContent><p>{error}</p></CardContent>
        </Card>
      )}

      {(!isLoading && !error) && (
        <main className="w-full max-w-4xl space-y-6">
          {(reportData || currentUrl) && (
            <ReportHeaderCard reportData={reportData} isLoading={isLoading} onRefresh={handleRefresh} onDownloadPdf={handleDownloadPdf} urlInput={form.getValues("url") || currentUrl} />
          )}
          
          {(reportData || currentUrl) && <ReportFilters />}

          <div className={`print:block ${(!reportData && !currentUrl && !isLoading && !error) ? 'hidden' : ''}`}>
            <ReportAccordionSection title="On-Page" items={onPageAccordionItems} defaultOpen={true} />
            <ReportAccordionSection title="Indexing" items={indexingAccordionItems} defaultOpen={false} />
            <ReportAccordionSection title="Technical SEO" items={technicalSeoAccordionItems} defaultOpen={false} />
            <ReportAccordionSection title="Mobile" items={mobileAccordionItems} defaultOpen={false} />
            <ReportAccordionSection title="Structured Data" items={structuredDataAccordionItems} defaultOpen={false} />
          </div>
          
          {!reportData && !currentUrl && !isLoading && !error && (
            <Card className="w-full max-w-3xl shadow-lg">
              <CardHeader><CardTitle className="text-2xl font-semibold text-primary mb-3 text-center">Ready to analyze?</CardTitle></CardHeader>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">Enter a website URL above and click "Analyze" to get your SEO report.</p>
              </CardContent>
            </Card>
          )}
        </main>
      )}
      <footer className="w-full max-w-4xl mt-12 pt-6 border-t border-border text-center text-sm text-muted-foreground no-print">
        <p>&copy; {new Date().getFullYear()} SEOVision. All rights reserved.</p>
        <p>Made by <a href="https://github.com/jobin-512" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">jobin-512</a></p>
      </footer>
    </div>
  );
}

