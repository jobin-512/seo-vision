
'use client';

import * as React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { generateSeoReport, type OnPageDetailItem as AiOnPageDetailItem } from '@/ai/flows/generate-seo-report';
import type { ReportData, OnPageItem, GooglePreviewData } from '@/lib/types';
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle, AlertTriangle, CheckCircle2, Info, FileText, BookOpen } from 'lucide-react';

import ReportHeaderCard from '@/components/report-header-card';
import ReportFilters from '@/components/report-filters';
import ReportAccordionSection from '@/components/report-accordion-section';

const formSchema = z.object({
  url: z.string().url({ message: 'Please enter a valid URL (e.g., https://example.com)' }),
});

type FormValues = z.infer<typeof formSchema>;

const mapAiOnPageDetailToOnPageItem = (aiItem: AiOnPageDetailItem): OnPageItem => {
  let icon: React.ElementType = Info; // Default icon
  if (aiItem.id === 'titleTag') icon = FileText;
  else if (aiItem.id === 'metaDescription') icon = BookOpen;
  else if (aiItem.id === 'googlePreview') icon = CheckCircle2; // Using CheckCircle2 as a placeholder for search/preview

  return {
    id: aiItem.id,
    icon: icon,
    title: aiItem.title,
    statusText: aiItem.statusText,
    statusColorClass: aiItem.statusColorClass,
    badgeVariant: 'outline', // Default, can be refined based on status
    content: aiItem.content,
    details: aiItem.details,
    googleDesktopPreview: aiItem.googleDesktopPreview as GooglePreviewData | undefined, // Cast if structure matches
    googleMobilePreview: aiItem.googleMobilePreview as GooglePreviewData | undefined, // Cast if structure matches
  };
};


// Mock data for On-Page SEO Accordion - Fallback
const mockOnPageItems: OnPageItem[] = [
  {
    id: 'titleTag',
    icon: FileText,
    title: 'Title Tag',
    statusText: 'N/A',
    statusColorClass: 'text-muted-foreground',
    badgeVariant: 'outline',
    content: 'Example: Your Website Title - Engaging and Relevant',
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
      url: 'example.com',
      title: 'Example Website Title - Your Catchy Headline',
      description: 'This is an example of how your website might appear in Google search results on a desktop computer. Make it count!',
    },
    googleMobilePreview: {
      url: 'https://example.com',
      title: 'Example Title - Mobile Friendly',
      description: 'Shorter, punchy description for mobile users. Easy to read on the go.',
    },
  },
];


export default function HomePage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [reportData, setReportData] = React.useState<ReportData | null>(null);
  const [currentOnPageItems, setCurrentOnPageItems] = React.useState<OnPageItem[]>(mockOnPageItems);
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
    setCurrentOnPageItems(mockOnPageItems); // Reset to mock data while loading new
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
          // onPageSeoDetails is now directly from AI of type AiOnPageDetailItem[]
        };
        setReportData(augmentedResult);

        if (result.onPageSeoDetails && result.onPageSeoDetails.length > 0) {
          const transformedItems = result.onPageSeoDetails.map(mapAiOnPageDetailToOnPageItem);
          setCurrentOnPageItems(transformedItems);
        } else {
          setCurrentOnPageItems(mockOnPageItems); // Fallback if AI doesn't provide details
        }

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
      setCurrentOnPageItems(mockOnPageItems); // Reset to mock on error
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
  
  const onPageSectionData = currentOnPageItems;


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

          {/* Always render the accordion section container, but items depend on data */}
          {/* This ensures print styles can target it even if it's "empty" on screen pre-analysis */}
          <div className={`print:block ${(!reportData && !currentUrl && !isLoading && !error) ? 'hidden' : ''}`}>
            <ReportAccordionSection 
              title="On-Page" 
              items={onPageSectionData} 
              defaultOpen={true} 
            />
          </div>
          

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
