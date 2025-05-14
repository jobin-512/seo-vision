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
import { AppLogo } from '@/components/app-logo';
import { ScoreCard } from '@/components/score-card';
import { ReportContentCard } from '@/components/report-content-card';
import { LoaderCircle, Link as LinkIcon, FileText, Zap, Download, AlertTriangle, Gauge } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  url: z.string().url({ message: 'Please enter a valid URL (e.g., https://example.com)' }),
});

type FormValues = z.infer<typeof formSchema>;

export default function HomePage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [reportData, setReportData] = React.useState<ReportData | null>(null);
  const [error, setError] = React.useState<string | null>(null);
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
    window.print();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-8 px-4 printable-area">
      <header className="flex flex-col items-center mb-10 no-print">
        <AppLogo className="h-16 w-16 text-primary mb-2" />
        <h1 className="text-4xl font-bold" style={{ color: 'hsl(var(--primary))' }}>SEOVision</h1>
        <p className="text-muted-foreground mt-1">Your AI-Powered SEO Analysis Tool</p>
      </header>

      <main className="w-full max-w-3xl">
        <Card className="shadow-xl mb-8 no-print">
          <CardHeader>
            <CardTitle className="flex items-center text-xl" style={{ color: 'hsl(var(--primary))' }}>
              <LinkIcon className="mr-2 h-6 w-6" />
              Analyze Website SEO
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Website URL</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="https://example.com" 
                          {...field} 
                          className="text-base py-6"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full py-6 text-base font-semibold" 
                  style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    'Analyze SEO'
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {isLoading && (
          <div className="flex flex-col items-center justify-center text-center p-8 bg-card rounded-lg shadow-md">
            <LoaderCircle className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-lg font-semibold">Generating your SEO report...</p>
            <p className="text-muted-foreground">This might take a few moments. Please wait.</p>
          </div>
        )}

        {error && (
          <Card className="bg-destructive text-destructive-foreground shadow-md">
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

        {reportData && (
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
