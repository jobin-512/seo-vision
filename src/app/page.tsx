
'use client';

import * as React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { generateSeoReport } from '@/ai/flows/generate-seo-report';
import type { ReportData, OnPageItem } from '@/lib/types';
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle, AlertTriangle, CheckCircle2, Info, FileText, BookOpen, Settings, ShieldCheck, BarChart2 as BarChartIcon, LineChart as LineChartIcon, XCircle } from 'lucide-react';

import ReportHeaderCard from '@/components/report-header-card';
import ReportFilters from '@/components/report-filters';
import ReportAccordionSection from '@/components/report-accordion-section';

const formSchema = z.object({
  url: z.string().url({ message: 'Please enter a valid URL (e.g., https://example.com)' }),
});

type FormValues = z.infer<typeof formSchema>;

// Mock data for On-Page SEO Accordion
const mockOnPageItems: OnPageItem[] = [
  {
    id: 'titleTag',
    icon: FileText,
    title: 'Title Tag',
    statusText: 'Outdated',
    statusColorClass: 'text-warning', // Or 'text-muted-foreground' for more neutral 'Outdated'
    badgeVariant: 'outline',
    content: 'Referrals Real Estate Agents in New Jersey, Greenville, SC & Dallas, TX',
    details: 'Length: 71 character(s) (519 pixels)',
  },
  {
    id: 'metaDescription',
    icon: BookOpen,
    title: 'Meta Description',
    statusText: 'Outdated',
    statusColorClass: 'text-warning',
    badgeVariant: 'outline',
    content: 'Find the best referral real estate agents in Greenville, Austin, TX, NJ and across the US and Canada with Referrals Real Estate Agents. We make it easy to connect with top-rated agents for buying, selling, renting or investing.',
    details: 'Length: 227 character(s) (1299 pixels)',
  },
  {
    id: 'googlePreview',
    icon: CheckCircle2, // Placeholder, could be MagnifyingGlass or similar
    title: 'Google Preview',
    statusText: 'Outdated', // Assuming this also applies here
    statusColorClass: 'text-warning',
    badgeVariant: 'outline',
    googleDesktopPreview: {
      url: 'referralsrealestateagents.com',
      title: 'Referrals Real Estate Agents in New Jersey, Greenville, SC & Dallas,...',
      description: 'Find the best referral real estate agents in Greenville, Austin, TX, NJ and across the US and Canada with Referrals Real Estate Agents. We make it easy to ...',
    },
    googleMobilePreview: {
      url: 'https://referralsrealestateagents.com',
      title: 'Referrals Real Estate Agents in New Jersey, Greenville, SC & Dallas...',
      description: 'Find the best referral real estate agents in Greenville, Austin, TX, NJ and across the US and Canada with Referrals Real...',
    },
  },
  // Add more items as needed, e.g., Headings, Image SEO, etc.
];


export default function HomePage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [reportData, setReportData] = React.useState<ReportData | null>(null);
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
    setCurrentUrl(data.url);

    try {
      const result = await generateSeoReport({ url: data.url });
      if (result) {
        const augmentedResult: ReportData = {
          ...result,
          urlAnalyzed: data.url,
          analysisTimestamp: new Date().toISOString(),
          passedPercent: result.score > 0 ? Math.min(result.score + 10, 70) : 0, // Example logic
          toImprovePercent: result.score > 0 ? 20 : 0, // Example logic
          errorsPercent: result.score > 0 ? 10 : 0, // Example logic
          onPageSeoDetails: result.onPageSeoDetails || mockOnPageItems, // Use AI data or fallback to mock
        };
        setReportData(augmentedResult);
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
  
  const onPageSectionData = reportData?.onPageSeoDetails || (currentUrl ? mockOnPageItems : []);


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

          {(reportData || currentUrl ) && onPageSectionData.length > 0 && (
             <div className="print:block"> {/* Ensure this section is printed */}
              <ReportAccordionSection 
                title="On-Page" 
                items={onPageSectionData} 
                defaultOpen={true} 
              />
            </div>
          )}
          
          {/* Fallback content for when there's no specific report data but a URL might have been analyzed */}
          {!reportData && currentUrl && !isLoading && !error && (
             <ReportAccordionSection 
                title="On-Page" 
                items={mockOnPageItems} 
                defaultOpen={true} 
              />
          )}

          {/* Initial state message before any analysis */}
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
      {/* Footer */}
      <footer className="w-full max-w-4xl mt-12 pt-6 border-t border-border text-center text-sm text-muted-foreground no-print">
        <p>&copy; {new Date().getFullYear()} SEOVision. All rights reserved.</p>
        <p>
          Made by <a href="https://github.com/jobin-512" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">jobin-512</a>
        </p>
      </footer>
    </div>
  );
}
