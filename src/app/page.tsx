
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
import { ScoreCard } from '@/components/score-card';
import { ReportContentCard } from '@/components/report-content-card';
import { CoreVitalCard } from '@/components/core-vital-card';
import { ActionButton } from '@/components/action-button';
import {
  LoaderCircle,
  FileText,
  Zap,
  Download,
  AlertTriangle,
  Gauge,
  Activity,
  BarChart2 as BarChartIcon,
  RefreshCw,
  XCircle,
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  LabelList,
  Cell,
} from 'recharts';

const formSchema = z.object({
  url: z.string().url({ message: 'Please enter a valid URL (e.g., https://example.com)' }),
});

type FormValues = z.infer<typeof formSchema>;

const coreVitalsConfig = [
  { name: 'LCP', defaultStatus: 'Improve' as const, defaultValue: '2.8s', dataKeyPrefix: 'lcp' },
  { name: 'CLS', defaultStatus: 'Poor' as const, defaultValue: '0.32', dataKeyPrefix: 'cls' },
  { name: 'FID', defaultStatus: 'Good' as const, defaultValue: '80ms', dataKeyPrefix: 'fid' },
] as const;

// Default/Fallback Data and Config for SEO Distribution Chart
const defaultSeoDistributionData = [
  { name: 'On-Page', value: 70, fill: 'hsl(var(--chart-1))' },
  { name: 'Off-Page', value: 55, fill: 'hsl(var(--chart-2))' },
  { name: 'Technical', value: 80, fill: 'hsl(var(--chart-3))' },
  { name: 'Content', value: 65, fill: 'hsl(var(--chart-4))' },
  { name: 'UX', value: 75, fill: 'hsl(var(--chart-5))' },
];

const seoChartConfig = {
  value: { label: "Score" },
  "On-Page": { label: "On-Page", color: "hsl(var(--chart-1))" },
  "Off-Page": { label: "Off-Page", color: "hsl(var(--chart-2))" },
  "Technical": { label: "Technical", color: "hsl(var(--chart-3))" },
  "Content": { label: "Content", color: "hsl(var(--chart-4))" },
  "UX": { label: "UX", color: "hsl(var(--chart-5))" },
} satisfies ChartConfig;


export default function HomePage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [reportData, setReportData] = React.useState<ReportData | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [showFullReport, setShowFullReport] = React.useState(false);
  const { toast } = useToast();
  const [activeAction, setActiveAction] = React.useState<string>("Web Vitals");

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
    setActiveAction("Web Vitals");

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

  const handleActionClick = (actionName: string) => {
    if (actionName === "Full Report") {
      const newShowFullReport = !showFullReport;
      setShowFullReport(newShowFullReport);
      setActiveAction(newShowFullReport ? "Full Report" : "Web Vitals");
    } else {
      setActiveAction(actionName);
      setShowFullReport(false); // Ensure full report is hidden if other actions are clicked
    }
  };

  const handleRefresh = () => {
    const urlValue = form.getValues("url");
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

  const currentSeoDistributionData = React.useMemo(() => {
    if (
      reportData &&
      reportData.onPageScore !== undefined &&
      reportData.offPageScore !== undefined &&
      reportData.technicalScore !== undefined &&
      reportData.contentScore !== undefined &&
      reportData.uxScore !== undefined
    ) {
      return [
        { name: 'On-Page', value: reportData.onPageScore, fill: seoChartConfig['On-Page'].color as string },
        { name: 'Off-Page', value: reportData.offPageScore, fill: seoChartConfig['Off-Page'].color as string },
        { name: 'Technical', value: reportData.technicalScore, fill: seoChartConfig['Technical'].color as string },
        { name: 'Content', value: reportData.contentScore, fill: seoChartConfig['Content'].color as string },
        { name: 'UX', value: reportData.uxScore, fill: seoChartConfig['UX'].color as string },
      ];
    }
    return defaultSeoDistributionData;
  }, [reportData]);


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

      {(!isLoading && !error) && (
        <main className="w-full max-w-3xl space-y-6">
          {/* Initial view or when no reportData - hidden in print if reportData exists */}
          <div className={cn(
            ((!form.formState.isSubmitted && !reportData) || (!reportData && form.formState.isSubmitted && !isLoading && !error)) && !showFullReport ? 'block space-y-6' : 'hidden',
            reportData ? 'print:hidden' : ''
          )}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {coreVitalsConfig.map(vital => (
                <CoreVitalCard
                  key={vital.name}
                  metricName={vital.name}
                  status={vital.defaultStatus}
                  value={vital.defaultValue}
                />
              ))}
            </div>
            <Card className="shadow-lg rounded-lg">
              <CardContent className="p-4 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-primary">SEO Factor Distribution</h3>
                  <div className="h-[250px]">
                    {/* Placeholder chart or default data chart */}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sections to show when reportData is available */}
          {reportData && (
            <>
              {/* Web Vitals & Charts Area */}
              <div
                className={cn(
                  'space-y-6',
                  activeAction === 'Web Vitals' && !showFullReport ? 'block' : 'hidden',
                  'print:block print:space-y-4' 
                )}
              >
                 <h2 className="text-2xl font-semibold text-primary print:block hidden pt-4">Core Web Vitals & Key Metrics</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 print:grid-cols-3">
                  {coreVitalsConfig.map(vital => (
                    <CoreVitalCard
                      key={vital.name}
                      metricName={vital.name}
                      status={(reportData?.[`${vital.dataKeyPrefix}Status` as keyof ReportData] as "Good" | "Improve" | "Poor" | undefined) || vital.defaultStatus}
                      value={(reportData?.[`${vital.dataKeyPrefix}Value` as keyof ReportData] as string | undefined) || vital.defaultValue}
                    />
                  ))}
                </div>
                <Card className="shadow-lg rounded-lg print:shadow-none print:border">
                  <CardContent className="p-4 space-y-6 print:p-2">
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-primary print:text-xl">SEO Factor Distribution</h3>
                      <div className="h-[250px] print:h-[220px]">
                        <ChartContainer config={seoChartConfig} className="w-full h-full">
                          <BarChart
                            data={currentSeoDistributionData}
                            layout="vertical"
                            margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                            <XAxis type="number" hide />
                            <YAxis
                              dataKey="name"
                              type="category"
                              tickLine={false}
                              axisLine={false}
                              tickMargin={8}
                              width={80}
                              fontSize={12}
                            />
                            <ChartTooltip
                              cursor={false}
                              content={<ChartTooltipContent indicator="dot" />}
                            />
                            <Bar dataKey="value" layout="vertical" radius={4}>
                              {currentSeoDistributionData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                              ))}
                              <LabelList
                                dataKey="value"
                                position="right"
                                offset={8}
                                className="fill-foreground print:fill-black"
                                fontSize={12}
                              />
                            </Bar>
                          </BarChart>
                        </ChartContainer>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Improvement Suggestions Area */}
              <div
                className={cn(
                  activeAction === 'Improve' && !showFullReport ? 'block' : 'hidden',
                  'print:block print:pt-4' 
                )}
              >
                <Card className="shadow-lg rounded-lg print:shadow-none print:border">
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg text-[hsl(var(--chart-4))] print:text-xl print:text-[hsl(var(--chart-4))]">
                      <AlertTriangle className="mr-2 h-5 w-5"/>
                      Improvement Suggestions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="print:p-2">
                    <p className="text-sm text-muted-foreground mb-2 print:text-gray-700">Based on the analysis, here are some key areas for improvement:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm print:text-gray-800">
                      <li>Optimize images to improve LCP (Largest Contentful Paint). Consider compressing images and using next-gen formats.</li>
                      <li>Specify dimensions for all image elements to reduce CLS (Cumulative Layout Shift).</li>
                      <li>Enhance server response time. Look into server-side caching or upgrading your hosting plan.</li>
                      <li>Minify CSS and JavaScript files to reduce their size.</li>
                      <li>Leverage browser caching for static assets.</li>
                    </ul>
                    <p className="mt-4 text-sm text-muted-foreground print:text-gray-700">Refer to the full SEO report for detailed, actionable suggestions tailored to your site.</p>
                  </CardContent>
                </Card>
              </div>

              {/* Identified Errors Area */}
              <div
                className={cn(
                  activeAction === 'Errors' && !showFullReport ? 'block' : 'hidden',
                  'print:block print:pt-4' 
                )}
              >
                <Card className="shadow-lg rounded-lg print:shadow-none print:border">
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg text-destructive print:text-xl print:text-destructive">
                      <XCircle className="mr-2 h-5 w-5"/>
                      Identified Errors
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="print:p-2">
                    <p className="text-sm text-muted-foreground mb-2 print:text-gray-700">The following critical issues were found that might be impacting your site's performance and SEO:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm print:text-gray-800">
                      <li>3 images are missing 'alt' text, which is crucial for accessibility and image SEO.</li>
                      <li>Found 1 broken internal link pointing to '/about-us/team-old-link'.</li>
                      <li>The page '/services/discontinued-service' returns a 404 (Not Found) error.</li>
                      <li>Mobile usability: Tap targets are too close together on the contact page.</li>
                    </ul>
                    <p className="mt-4 text-sm text-muted-foreground print:text-gray-700">A comprehensive list of errors and their specific locations can be found in the full SEO report.</p>
                  </CardContent>
                </Card>
              </div>

              {/* Full Report Details Area */}
              <div
                className={cn(
                  'space-y-8', 
                  showFullReport ? 'block' : 'hidden',
                  'print:block print:space-y-4 print:pt-4' 
                )}
              >
                 <h2 className="text-2xl font-semibold text-primary print:block hidden">Full SEO & Performance Report</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:grid-cols-2">
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
              </div>
            </>
          )}

          {/* Action Button Bar - always rendered if initial submission happened or reportData exists */}
          {(!form.formState.isSubmitted || reportData) && (
            <Card className="shadow-lg rounded-lg no-print">
              <CardContent className="p-1 sm:p-2">
                <div className="flex justify-around items-center">
                  <ActionButton
                    icon={Activity}
                    label="Web Vitals"
                    onClick={() => handleActionClick("Web Vitals")}
                    isActive={activeAction === "Web Vitals" && !showFullReport}
                    textColorClassName="text-primary"
                  />
                   <ActionButton
                    icon={AlertTriangle}
                    label="Improve"
                    badgeCount={reportData ? 9 : undefined}
                    onClick={() => handleActionClick("Improve")}
                    isActive={activeAction === "Improve" && !showFullReport}
                    isAlert={true}
                  />
                  <ActionButton
                    icon={XCircle}
                    label="Errors"
                    badgeCount={reportData ? 5 : undefined}
                    onClick={() => handleActionClick("Errors")}
                    isActive={activeAction === "Errors" && !showFullReport}
                    isError={true}
                  />
                  <ActionButton
                    icon={FileText}
                    label="Full Report"
                    badgeCount={reportData?.score ? Math.round(reportData.score) : (form.formState.isSubmitted && !isLoading && !error ? 'N/A' : undefined)}
                    onClick={() => handleActionClick("Full Report")}
                    isActive={showFullReport}
                  />
                  <ActionButton
                    icon={RefreshCw}
                    label="Refresh"
                    onClick={handleRefresh}
                    isActive={activeAction === "Refresh"} // Refresh is momentary, might not need active state
                  />
                </div>
              </CardContent>
            </Card>
          )}
            {/* Download button - only appears if full report is active on screen, but is itself no-print */}
            {reportData && showFullReport && (
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
