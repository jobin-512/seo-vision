
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
  type OnPageDetailItem as AiOnPageDetailItem,
  type HeadingsAnalysis as AiHeadingsAnalysisType,
  type ContentAnalysis as AiContentAnalysisType,
  type AltAttributeAnalysis as AiAltAttributeAnalysisType,
  type InPageLinksAnalysis as AiInPageLinksAnalysisType,
  type IndexingAnalysis as AiIndexingAnalysisType,
  type WebFeedsAnalysis as AiWebFeedsAnalysisType,
  type UrlResolveAnalysis as AiUrlResolveAnalysisType,
  type RobotsTxtAnalysis as AiRobotsTxtAnalysisType,
  type XmlSitemapAnalysis as AiXmlSitemapAnalysisType,
  type SitemapValidityAnalysis as AiSitemapValidityAnalysisType,
  type UrlParametersAnalysis as AiUrlParametersAnalysisType
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
  UrlParametersAnalysis
} from '@/lib/types';
import { useToast } from "@/hooks/use-toast";
import { 
  LoaderCircle, AlertTriangle, CheckCircle2, Info, FileText, BookOpen, Heading1, 
  FileSearch2, ImageIcon, Link as LinkIcon, Rss, Network, FileCode, ListChecks, Link2Icon as Link2 
} from 'lucide-react';

import ReportHeaderCard from '@/components/report-header-card';
import ReportFilters from '@/components/report-filters';
import ReportAccordionSection from '@/components/report-accordion-section';

const formSchema = z.object({
  url: z.string().url({ message: 'Please enter a valid URL (e.g., https://example.com)' }),
});

type FormValues = z.infer<typeof formSchema>;

const mapAiDataToAccordionItem = (
  id: string, 
  title: string, 
  icon: React.ElementType, 
  aiData: AiHeadingsAnalysisType | AiContentAnalysisType | AiAltAttributeAnalysisType | AiInPageLinksAnalysisType | AiWebFeedsAnalysisType | AiUrlResolveAnalysisType | AiRobotsTxtAnalysisType | AiXmlSitemapAnalysisType | AiSitemapValidityAnalysisType | AiUrlParametersAnalysisType | undefined,
  defaultStatusText: string = 'N/A',
  defaultStatusColorClass: string = 'text-muted-foreground'
): OnPageItem => {
  
  let statusText = defaultStatusText;
  let statusColorClass = defaultStatusColorClass;

  if (aiData && 'statusText' in aiData && aiData.statusText) {
    statusText = aiData.statusText;
  }
  if (aiData && 'statusColorClass' in aiData && aiData.statusColorClass) {
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

  // On-Page
  if (id === 'headings' && aiData) item.headingsAnalysis = aiData as HeadingsAnalysis;
  if (id === 'contentAnalysis' && aiData) item.contentAnalysisData = aiData as ContentAnalysis;
  if (id === 'altAttributes' && aiData) item.altAttributeAnalysis = aiData as AltAttributeAnalysis;
  if (id === 'inPageLinks' && aiData) item.inPageLinksAnalysis = aiData as InPageLinksAnalysis;
  // Indexing
  if (id === 'webFeeds' && aiData) item.webFeedsData = aiData as WebFeedsAnalysis;
  if (id === 'urlResolve' && aiData) item.urlResolveData = aiData as UrlResolveAnalysis;
  if (id === 'robotsTxt' && aiData) item.robotsTxtData = aiData as RobotsTxtAnalysis;
  if (id === 'xmlSitemap' && aiData) item.xmlSitemapData = aiData as XmlSitemapAnalysis;
  if (id === 'sitemapValidity' && aiData) item.sitemapValidityData = aiData as SitemapValidityAnalysis;
  if (id === 'urlParameters' && aiData) item.urlParametersData = aiData as UrlParametersAnalysis;
  
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
  // On-Page Base
  {
    id: 'titleTag',
    icon: FileText,
    title: 'Title Tag',
    statusText: 'N/A',
    statusColorClass: 'text-muted-foreground',
    badgeVariant: 'outline',
    content: `Example: ${url ? new URL(url).hostname : 'YourWebsite'}.com Title - Engaging and Relevant`,
    details: 'Length: ~60 character(s)',
  },
  {
    id: 'metaDescription',
    icon: BookOpen,
    title: 'Meta Description',
    statusText: 'N/A',
    statusColorClass: 'text-muted-foreground',
    badgeVariant: 'outline',
    content: 'Example: Concise and compelling summary of your page content, encouraging clicks from search results. Aim for around 155 characters.',
    details: 'Length: ~155 character(s)',
  },
  {
    id: 'googlePreview',
    icon: CheckCircle2, 
    title: 'Google Preview',
    statusText: 'N/A',
    statusColorClass: 'text-muted-foreground',
    badgeVariant: 'outline',
    googleDesktopPreview: {
      url: url ? new URL(url).hostname : 'example.com',
      title: `Example ${url ? new URL(url).hostname : 'Website'} Title - Your Catchy Headline`,
      description: 'This is an example of how your website might appear in Google search results on a desktop computer. Make it count!',
    },
    googleMobilePreview: {
      url: url || 'https://example.com',
      title: `Example Title - Mobile Friendly`,
      description: 'Shorter, punchy description for mobile users. Easy to read on the go.',
    },
  },
  // New On-Page Sections
  {
    id: 'headings',
    icon: Heading1,
    title: 'Headings',
    statusText: 'N/A',
    statusColorClass: 'text-muted-foreground',
    badgeVariant: 'outline',
    headingsAnalysis: { 
      statusText: 'N/A', statusColorClass: 'text-muted-foreground',
      h1Count: 0, h2Count: 0, h3Count: 0, h4Count: 0, h5Count: 0, h6Count: 0, headings: [] 
    },
  },
  {
    id: 'contentAnalysis',
    icon: FileSearch2,
    title: 'Content Analysis',
    statusText: 'N/A',
    statusColorClass: 'text-muted-foreground',
    badgeVariant: 'outline',
    contentAnalysisData: { 
      statusText: 'N/A', statusColorClass: 'text-muted-foreground',
      keywords: [{keyword: "example", count: 1}] 
    },
  },
  {
    id: 'altAttributes',
    icon: ImageIcon,
    title: 'Alt Attributes',
    statusText: 'N/A',
    statusColorClass: 'text-muted-foreground',
    badgeVariant: 'outline',
    altAttributeAnalysis: { 
      statusText: 'N/A', statusColorClass: 'text-muted-foreground',
      totalImages: 0, imagesMissingAlts: 0, details: 'No image data yet.' 
    },
  },
  {
    id: 'inPageLinks',
    icon: LinkIcon,
    title: 'In-Page Links',
    statusText: 'N/A',
    statusColorClass: 'text-muted-foreground',
    badgeVariant: 'outline',
    inPageLinksAnalysis: { 
      statusText: 'N/A', statusColorClass: 'text-muted-foreground',
      totalLinks: 0, internalLinks: 0, externalLinksFollow: 0, externalLinksNofollow: 0, 
      links: [{anchorText: "Example", url: "#", type: "Internal", followStatus: "Follow"}] 
    },
  },
];

const getDefaultIndexingAccordionItems = (): OnPageItem[] => [
  {
    id: 'webFeeds',
    icon: Rss,
    title: 'Web Feeds',
    statusText: 'N/A',
    statusColorClass: 'text-muted-foreground',
    webFeedsData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', details: 'Checking for web feeds...', feeds: []}
  },
  {
    id: 'urlResolve',
    icon: Network,
    title: 'URL Resolve',
    statusText: 'N/A',
    statusColorClass: 'text-muted-foreground',
    urlResolveData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', details: 'Checking URL resolutions...', resolutions: []}
  },
  {
    id: 'robotsTxt',
    icon: FileCode,
    title: 'Robots.txt',
    statusText: 'N/A',
    statusColorClass: 'text-muted-foreground',
    robotsTxtData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', robotsTxtUrl: '', findings: ['Checking robots.txt...']}
  },
  {
    id: 'xmlSitemap',
    icon: FileText,  // Using FileText, can change if a more specific sitemap icon is available or preferred
    title: 'XML Sitemap',
    statusText: 'N/A',
    statusColorClass: 'text-muted-foreground',
    xmlSitemapData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', sitemapUrl: '', details: 'Checking XML sitemap...'}
  },
  {
    id: 'sitemapValidity',
    icon: ListChecks,
    title: 'Sitemaps Validity',
    statusText: 'N/A',
    statusColorClass: 'text-muted-foreground',
    sitemapValidityData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', summary: 'Checking sitemap validity...', checks: []}
  },
  {
    id: 'urlParameters',
    icon: Link2,
    title: 'URL Parameters',
    statusText: 'N/A',
    statusColorClass: 'text-muted-foreground',
    urlParametersData: { statusText: 'N/A', statusColorClass: 'text-muted-foreground', details: 'Checking URL parameters...'}
  }
];


export default function HomePage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [reportData, setReportData] = React.useState<ReportData | null>(null);
  const [onPageAccordionItems, setOnPageAccordionItems] = React.useState<OnPageItem[]>(getDefaultOnPageAccordionItems());
  const [indexingAccordionItems, setIndexingAccordionItems] = React.useState<OnPageItem[]>(getDefaultIndexingAccordionItems());
  const [error, setError] = React.useState<string | null>(null);
  const [currentUrl, setCurrentUrl] = React.useState<string>('');

  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setError(null);
    setReportData(null);
    setOnPageAccordionItems(getDefaultOnPageAccordionItems(data.url)); 
    setIndexingAccordionItems(getDefaultIndexingAccordionItems());
    setCurrentUrl(data.url);

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

        // Process On-Page SEO Details
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
        
        const uniqueOnPageItemIds = new Set<string>();
        const finalOnPageItems = newOnPageItems.filter(item => {
            if (!uniqueOnPageItemIds.has(item.id)) {
                uniqueOnPageItemIds.add(item.id);
                return true;
            }
            const existingItem = onPageAccordionItems.find(ci => ci.id === item.id);
            if (existingItem && item.statusText !== 'N/A') { 
                existingItem.statusText = item.statusText;
                existingItem.statusColorClass = item.statusColorClass;
                if(item.headingsAnalysis) existingItem.headingsAnalysis = item.headingsAnalysis;
                if(item.contentAnalysisData) existingItem.contentAnalysisData = item.contentAnalysisData;
                if(item.altAttributeAnalysis) existingItem.altAttributeAnalysis = item.altAttributeAnalysis;
                if(item.inPageLinksAnalysis) existingItem.inPageLinksAnalysis = item.inPageLinksAnalysis;
            }
            return false;
        });
        setOnPageAccordionItems(finalOnPageItems.length > 0 ? finalOnPageItems : getDefaultOnPageAccordionItems(data.url));

        // Process Indexing Analysis Details
        let newIndexingItems: OnPageItem[] = [];
        if (result.indexingAnalysis) {
          const ia = result.indexingAnalysis;
          newIndexingItems.push(mapAiDataToAccordionItem('webFeeds', 'Web Feeds', Rss, ia.webFeeds, ia.webFeeds?.statusText, ia.webFeeds?.statusColorClass));
          newIndexingItems.push(mapAiDataToAccordionItem('urlResolve', 'URL Resolve', Network, ia.urlResolve, ia.urlResolve?.statusText, ia.urlResolve?.statusColorClass));
          newIndexingItems.push(mapAiDataToAccordionItem('robotsTxt', 'Robots.txt', FileCode, ia.robotsTxt, ia.robotsTxt?.statusText, ia.robotsTxt?.statusColorClass));
          newIndexingItems.push(mapAiDataToAccordionItem('xmlSitemap', 'XML Sitemap', FileText, ia.xmlSitemap, ia.xmlSitemap?.statusText, ia.xmlSitemap?.statusColorClass));
          newIndexingItems.push(mapAiDataToAccordionItem('sitemapValidity', 'Sitemaps Validity', ListChecks, ia.sitemapValidity, ia.sitemapValidity?.statusText, ia.sitemapValidity?.statusColorClass));
          newIndexingItems.push(mapAiDataToAccordionItem('urlParameters', 'URL Parameters', Link2, ia.urlParameters, ia.urlParameters?.statusText, ia.urlParameters?.statusColorClass));
        }
        setIndexingAccordionItems(newIndexingItems.length > 0 ? newIndexingItems : getDefaultIndexingAccordionItems());


        toast({
          title: "Analysis Complete",
          description: `SEO report for ${data.url} generated successfully.`,
          variant: "default",
        });
      } else {
        throw new Error("Received empty report from AI.");
      }
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred during analysis.';
      setError(errorMessage);
      setOnPageAccordionItems(getDefaultOnPageAccordionItems(currentUrl)); 
      setIndexingAccordionItems(getDefaultIndexingAccordionItems());
      toast({
        title: "Analysis Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    const urlValue = form.getValues("url") || currentUrl;
    if (urlValue) {
      onSubmit({ url: urlValue });
    } else {
      toast({
        title: "URL missing",
        description: "Please enter a URL to refresh the analysis.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadPdf = () => {
    if (reportData) {
       window.print();
    } else {
      toast({
        title: "No Report Data",
        description: "Please generate a report before downloading.",
        variant: "destructive",
      });
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4 md:px-8 printable-area">
      <div className="w-full max-w-3xl mb-6 no-print">
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-end gap-3 p-4 bg-card rounded-lg shadow-md">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormLabel className="text-sm text-muted-foreground sr-only">Website URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter website URL (e.g., https://example.com)"
                        {...field}
                        className="text-base py-2 h-10"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage className="text-xs"/>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="py-2 h-10 text-sm font-semibold bg-primary hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Analyze'
                )}
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
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Analysis Error
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
          </CardContent>
        </Card>
      )}

      {(!isLoading && !error) && (
        <main className="w-full max-w-4xl space-y-6">
          {(reportData || currentUrl) && (
            <ReportHeaderCard
              reportData={reportData}
              isLoading={isLoading}
              onRefresh={handleRefresh}
              onDownloadPdf={handleDownloadPdf}
              urlInput={form.getValues("url") || currentUrl}
            />
          )}
          
          {(reportData || currentUrl) && <ReportFilters />}

          <div className={`print:block ${(!reportData && !currentUrl && !isLoading && !error) ? 'hidden' : ''}`}>
            <ReportAccordionSection 
              title="On-Page" 
              items={onPageAccordionItems} 
              defaultOpen={true} 
            />
            <ReportAccordionSection 
              title="Indexing" 
              items={indexingAccordionItems} 
              defaultOpen={false} 
            />
          </div>
          
          {!reportData && !currentUrl && !isLoading && !error && (
            <Card className="w-full max-w-3xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-primary mb-3 text-center">Ready to analyze?</CardTitle>
              </CardHeader>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">
                  Enter a website URL above and click "Analyze" to get your SEO report.
                </p>
              </CardContent>
            </Card>
          )}
        </main>
      )}
      <footer className="w-full max-w-4xl mt-12 pt-6 border-t border-border text-center text-sm text-muted-foreground no-print">
        <p>&copy; {new Date().getFullYear()} SEOVision. All rights reserved.</p>
        <p>
          Made by <a href="https://github.com/jobin-512" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">jobin-512</a>
        </p>
      </footer>
    </div>
  );
}

