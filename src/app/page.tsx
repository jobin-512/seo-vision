'use client';

import * as React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { generateSeoReport } from '@/ai/flows/generate-seo-report';
import type { ReportData } from '@/lib/types';
import { ScoreCard } from '@/components/score-card';
import { ReportContentCard } from '@/components/report-content-card';
import { CoreVitalCard } from '@/components/core-vital-card';
import { ActionButton } from '@/components/action-button';
import { 
  LoaderCircle, 
  Link as LinkIcon, 
  FileText, 
  Zap, 
  Download, 
  AlertTriangle, 
  Gauge,
  Activity,
  BarChart2,
  RefreshCw,
  XCircle, // For Errors
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  url: z.string().url({ message: 'Please enter a valid URL (e.g., https://example.com)' }),
});

type FormValues = z.infer<typeof formSchema>;

// Mock data for Core Web Vitals until AI flow is updated
const mockVitals = [
  { name: 'LCP', status: 'Improve', value: '2.8s' },
  { name: 'CLS', status: 'Poor', value: '0.32' },
  { name: 'FID', status: 'Good', value: '80ms' },
] as const; // Added 'as const' for stricter type on status


export default function HomePage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [reportData, setReportData] = React.useState<ReportData | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [showFullReport, setShowFullReport] = React.useState(false);
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
    setShowFullReport(false);

    try {
      const result = await generateSeoReport({ url: data.url });
      if (result) {
        setReportData(result);
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

  const handleDownloadPdf = () => {
    // Ensure full report is shown for printing if it's currently hidden
    const wasHidden = !showFullReport;
    if (wasHidden) {
      setShowFullReport(true);
      // Allow state to update and DOM to re-render before printing
      setTimeout(() => {
        window.print();
        // Optionally hide it again after printing if it was originally hidden
        // setShowFullReport(false); 
      }, 100); 
    } else {
      window.print();
    }
  };

  // Determine active button for action bar
  const [activeAction, setActiveAction] = React.useState<string | null>('Web Vitals');


  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4 printable-area">
      <header className="text-center mb-10 no-print">
        <h1 className="text-4xl font-bold text-primary">Instant Core Web Vitals Check</h1>
      </header>

      <div className="w-full max-w-xl mb-8 no-print">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-end gap-3 p-4 bg-card rounded-lg shadow-md">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel className="text-sm text-muted-foreground">Website URL</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://example.com" 
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
              className="py-2 h-10 text-sm font-semibold" 
              style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Check'
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

      {/* Display content only if not loading, no error, or if reportData exists for "Full Report" view */}
      {(!isLoading && !error) && (
        <main className="w-full max-w-3xl space-y-6">
          {/* Core Web Vitals Small Cards - Show if reportData or for initial view */}
          {(reportData || !form.formState.isSubmitted) && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {mockVitals.map(vital => (
                <CoreVitalCard key={vital.name} metricName={vital.name} status={vital.status} value={vital.value} />
              ))}
            </div>
          )}

          {/* Charts Area - Show if reportData or for initial view */}
          {(reportData || !form.formState.isSubmitted) && (
            <Card className="shadow-lg rounded-lg">
              <CardContent className="p-4">
                <div className="mb-4">
                    <Image data-ai-hint="data chart" src="https://placehold.co/600x100.png" alt="Stacked Bar Chart Placeholder" width={600} height={100} className="rounded w-full h-auto" />
                </div>
                <div>
                    <Image data-ai-hint="bar chart" src="https://placehold.co/600x150.png" alt="Bar Chart Placeholder" width={600} height={150} className="rounded w-full h-auto" />
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Bottom Action Bar - Show if reportData or for initial view */}
          {(reportData || !form.formState.isSubmitted) && (
            <Card className="shadow-lg rounded-lg no-print">
              <CardContent className="p-1 sm:p-2">
                <div className="flex justify-around items-center">
                  <ActionButton 
                    icon={Activity} 
                    label="Web Vitals" 
                    onClick={() => { setActiveAction("Web Vitals"); setShowFullReport(false); }} 
                    isActive={activeAction === "Web Vitals" && !showFullReport}
                    textColorClassName="text-primary"
                  />
                  <ActionButton 
                    icon={BarChart2} 
                    label="Traffic" 
                    onClick={() => { setActiveAction("Traffic"); setShowFullReport(false); }} 
                    isActive={activeAction === "Traffic"}
                    textColorClassName="text-foreground"
                  />
                  <ActionButton 
                    icon={FileText} 
                    label="Full Report" 
                    badgeCount={reportData?.score ? Math.round(reportData.score) : (form.formState.isSubmitted ? 'N/A' : undefined)}
                    onClick={() => { setShowFullReport(prev => !prev); if (!showFullReport) setActiveAction("Full Report"); else setActiveAction(null);}} 
                    isActive={activeAction === "Full Report" && showFullReport}
                    textColorClassName="text-foreground"
                  />
                  <ActionButton 
                    icon={AlertTriangle} 
                    label="Improve" 
                    badgeCount={reportData ? 9 : undefined} // Example count
                    onClick={() => { setActiveAction("Improve"); setShowFullReport(false); }} 
                    isActive={activeAction === "Improve"}
                    isAlert={true}
                  />
                  <ActionButton 
                    icon={XCircle} 
                    label="Errors" 
                    badgeCount={reportData ? 5 : undefined} // Example count
                    onClick={() => { setActiveAction("Errors"); setShowFullReport(false); }} 
                    isActive={activeAction === "Errors"}
                    isError={true}
                  />
                  <ActionButton 
                    icon={RefreshCw} 
                    label="Refresh" 
                    onClick={() => { if (form.getValues("url")) onSubmit(form.getValues()); setActiveAction(null);}}
                    isActive={activeAction === "Refresh"}
                    textColorClassName="text-foreground"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Detailed Text Reports (conditionally shown) */}
          {showFullReport && reportData && (
            <div className="space-y-8 mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ScoreCard title="Overall SEO Score" score={reportData.score} Icon={Gauge} />
                <ScoreCard title="Performance Score" score={reportData.performanceScore} Icon={Zap} />
              </div>
              <ReportContentCard 
                title="Comprehensive SEO Report" 
                content={reportData.report}
                Icon={FileText}
              />
              <ReportContentCard
                title="Website Performance Analysis"
                content={reportData.performanceReport}
                Icon={Zap}
              />
              <div className="text-center mt-8 no-print">
                <Button 
                  onClick={handleDownloadPdf} 
                  variant="outline" 
                  className="py-3 px-6 text-base"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Report as PDF
                </Button>
              </div>
            </div>
          )}
        </main>
      )}
      
      <footer className="text-center mt-12 text-muted-foreground text-sm no-print">
        <p>&copy; {new Date().getFullYear()} SEOVision. All rights reserved.</p>
        <p>Powered by AI</p>
         <p>
          Made by{' '}
          <a
            href="https://github.com/jobin-512"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-primary"
          >
            jobin-512
          </a>
        </p>
      </footer>
    </div>
  );
}
