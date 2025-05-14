
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
  LineChart as LineChartIcon,
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  LineChart,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  Bar,
  LabelList,
  Cell,
} from 'recharts';

const formSchema = z.object({
  url: z.string().url({ message: 'Please enter a valid URL (e.g., https://example.com)' }),
});

type FormValues = z.infer<typeof formSchema>;

const mockVitals = [
  { name: 'LCP', status: 'Improve', value: '2.8s' },
  { name: 'CLS', status: 'Poor', value: '0.32' },
  { name: 'FID', status: 'Good', value: '80ms' },
] as const;

// Default/Fallback Website Traffic Data
const defaultWebsiteTrafficData = [
  { month: 'Jan', visits: 12500 },
  { month: 'Feb', visits: 13800 },
  { month: 'Mar', visits: 15200 },
  { month: 'Apr', visits: 14800 },
  { month: 'May', visits: 16500 },
  { month: 'Jun', visits: 17200 },
];

const trafficChartConfig = {
  visits: {
    label: "Monthly Visits",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

// Sample Data and Config for SEO Distribution Chart
const seoDistributionData = [
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
    const wasHidden = !showFullReport;
    if (wasHidden) {
      setShowFullReport(true);
      setActiveAction("Full Report"); 
      setTimeout(() => {
        window.print();
      }, 100); 
    } else {
      window.print();
    }
  };
  
  const handleActionClick = (actionName: string) => {
    setActiveAction(actionName);
    if (actionName !== "Full Report") {
      setShowFullReport(false);
    } else {
      const newShowFullReport = !showFullReport;
      setShowFullReport(newShowFullReport);
      if (!newShowFullReport) { 
        setActiveAction("Web Vitals"); 
      }
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

  const currentTrafficData = reportData?.websiteTraffic && reportData.websiteTraffic.length > 0 
    ? reportData.websiteTraffic 
    : defaultWebsiteTrafficData;


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
          {((!form.formState.isSubmitted && !reportData) || (reportData && (activeAction === "Web Vitals" || activeAction === "Traffic"))) && !showFullReport && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {mockVitals.map(vital => (
                  <CoreVitalCard key={vital.name} metricName={vital.name} status={vital.status} value={vital.value} />
                ))}
              </div>

              <Card className="shadow-lg rounded-lg">
                <CardContent className="p-4 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-primary">Website Traffic Trend</h3>
                    <div className="h-[200px]">
                      <ChartContainer config={trafficChartConfig} className="w-full h-full">
                        <LineChart 
                          data={currentTrafficData} 
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis 
                            dataKey="month" 
                            tickLine={false} 
                            axisLine={false} 
                            tickMargin={8} 
                            fontSize={12}
                          />
                          <YAxis 
                            tickLine={false} 
                            axisLine={false} 
                            tickMargin={8} 
                            fontSize={12}
                            domain={['dataMin - 1000', 'dataMax + 1000']} 
                            tickFormatter={(value) => new Intl.NumberFormat('en-US', { notation: 'compact', compactDisplay: 'short' }).format(value)}
                          />
                          <ChartTooltip
                            cursor={true}
                            content={<ChartTooltipContent indicator="line" hideLabel />}
                          />
                          <ChartLegend content={<ChartLegendContent />} />
                          <Line 
                            dataKey="visits" 
                            type="monotone" 
                            stroke="var(--color-visits)" 
                            strokeWidth={2} 
                            dot={{ r:4, fill: "var(--color-visits)" }}
                            activeDot={{ r: 6 }} 
                          />
                        </LineChart>
                      </ChartContainer>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-primary">SEO Factor Distribution</h3>
                    <div className="h-[250px]">
                      <ChartContainer config={seoChartConfig} className="w-full h-full">
                        <BarChart 
                          data={seoDistributionData} 
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
                            {seoDistributionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                            <LabelList 
                              dataKey="value" 
                              position="right" 
                              offset={8} 
                              className="fill-foreground" 
                              fontSize={12} 
                            />
                          </Bar>
                        </BarChart>
                      </ChartContainer>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {reportData && activeAction === "Improve" && !showFullReport && (
            <Card className="shadow-lg rounded-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-lg text-[hsl(var(--chart-4))]">
                  <AlertTriangle className="mr-2 h-5 w-5"/>
                  Improvement Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">Based on the analysis, here are some key areas for improvement:</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Optimize images to improve LCP (Largest Contentful Paint). Consider compressing images and using next-gen formats.</li>
                  <li>Specify dimensions for all image elements to reduce CLS (Cumulative Layout Shift).</li>
                  <li>Enhance server response time. Look into server-side caching or upgrading your hosting plan.</li>
                  <li>Minify CSS and JavaScript files to reduce their size.</li>
                  <li>Leverage browser caching for static assets.</li>
                </ul>
                <p className="mt-4 text-sm text-muted-foreground">Refer to the full SEO report for detailed, actionable suggestions tailored to your site.</p>
              </CardContent>
            </Card>
          )}

          {reportData && activeAction === "Errors" && !showFullReport && (
            <Card className="shadow-lg rounded-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-lg text-destructive">
                  <XCircle className="mr-2 h-5 w-5"/>
                  Identified Errors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">The following critical issues were found that might be impacting your site's performance and SEO:</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>3 images are missing 'alt' text, which is crucial for accessibility and image SEO.</li>
                  <li>Found 1 broken internal link pointing to '/about-us/team-old-link'.</li>
                  <li>The page '/services/discontinued-service' returns a 404 (Not Found) error.</li>
                  <li>Mobile usability: Tap targets are too close together on the contact page.</li>
                </ul>
                <p className="mt-4 text-sm text-muted-foreground">A comprehensive list of errors and their specific locations can be found in the full SEO report.</p>
              </CardContent>
            </Card>
          )}
          
          {(!form.formState.isSubmitted || reportData) && (
            <Card className="shadow-lg rounded-lg no-print">
              <CardContent className="p-1 sm:p-2">
                <div className="flex justify-around items-center">
                  <ActionButton 
                    icon={Activity} 
                    label="Web Vitals" 
                    onClick={() => handleActionClick("Web Vitals")} 
                    isActive={activeAction === "Web Vitals"}
                    textColorClassName="text-primary"
                  />
                  <ActionButton 
                    icon={LineChartIcon}
                    label="Traffic" 
                    onClick={() => handleActionClick("Traffic")} 
                    isActive={activeAction === "Traffic"}
                  />
                  <ActionButton 
                    icon={FileText} 
                    label="Full Report" 
                    badgeCount={reportData?.score ? Math.round(reportData.score) : (form.formState.isSubmitted && !isLoading ? 'N/A' : undefined)}
                    onClick={() => handleActionClick("Full Report")} 
                    isActive={activeAction === "Full Report" && showFullReport}
                  />
                  <ActionButton 
                    icon={AlertTriangle} 
                    label="Improve" 
                    badgeCount={reportData ? 9 : undefined} 
                    onClick={() => handleActionClick("Improve")} 
                    isActive={activeAction === "Improve"}
                    isAlert={true}
                  />
                  <ActionButton 
                    icon={XCircle} 
                    label="Errors" 
                    badgeCount={reportData ? 5 : undefined} 
                    onClick={() => handleActionClick("Errors")} 
                    isActive={activeAction === "Errors"}
                    isError={true}
                  />
                  <ActionButton 
                    icon={RefreshCw} 
                    label="Refresh" 
                    onClick={handleRefresh}
                    isActive={activeAction === "Refresh"} 
                  />
                </div>
              </CardContent>
            </Card>
          )}

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
