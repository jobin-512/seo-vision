
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
import type { ReportData } from '@/lib/types';
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle, AlertTriangle } from 'lucide-react';

import ReportHeaderCard from '@/components/report-header-card';
import ReportFilters from '@/components/report-filters';
// Accordion and its items will be added in a future step
// import ReportAccordionSection from '@/components/report-accordion-section';

const formSchema = z.object({
  url: z.string().url({ message: 'Please enter a valid URL (e.g., https://example.com)' }),
});

type FormValues = z.infer<typeof formSchema>;

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
        // Augment with URL and timestamp for the new header card
        const augmentedResult: ReportData = {
          ...result,
          urlAnalyzed: data.url,
          analysisTimestamp: new Date().toISOString(),
          // Mock percentages until AI provides them
          passedPercent: result.score > 0 ? Math.min(result.score + 10, 70) : 0,
          toImprovePercent: result.score > 0 ? 20 : 0,
          errorsPercent: result.score > 0 ? 10 : 0,
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
    // For now, this just triggers print. Detailed content for PDF will need the accordion.
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
      {/* Form is moved to the top, simpler, and always visible for now */}
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
      
      {/* Conditional rendering for loading, error, or report content */}
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

      {/* Main content area for the report */}
      {(!isLoading && !error) && (
        <main className="w-full max-w-4xl space-y-6">
          {/* Show ReportHeaderCard if there is data or if a URL has been submitted (even if data is null initially) */}
          {(reportData || currentUrl) && (
            <ReportHeaderCard
              reportData={reportData}
              isLoading={isLoading}
              onRefresh={handleRefresh}
              onDownloadPdf={handleDownloadPdf}
              urlInput={form.getValues("url") || currentUrl}
            />
          )}
          
          {/* Filters are shown if there is data or a URL is being processed */}
          {(reportData || currentUrl) && <ReportFilters />}

          {/* Placeholder for Accordion Content - to be implemented next */}
          {reportData && (
            <div className="bg-card p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">On-Page</h2>
              <p className="text-muted-foreground">
                Detailed on-page analysis content (e.g., Title Tag, Meta Description, Google Preview) will be displayed here using an accordion structure.
                This requires further updates to the AI flow to provide structured data for each item.
              </p>
              {/* Example of how full report text might be shown if needed */}
              {/* <pre className="text-xs whitespace-pre-wrap bg-muted p-4 rounded-md mt-4">{JSON.stringify(reportData, null, 2)}</pre> */}
            </div>
          )}
          
          {/* Initial state message before any analysis */}
          {!reportData && !currentUrl && !isLoading && !error && (
            <Card className="w-full max-w-3xl shadow-lg">
              <CardContent className="p-10 text-center">
                <h2 className="text-2xl font-semibold text-primary mb-3">Ready to analyze?</h2>
                <p className="text-muted-foreground">
                  Enter a website URL above and click "Analyze" to get your SEO report.
                </p>
              </CardContent>
            </Card>
          )}
        </main>
      )}
    </div>
  );
}
