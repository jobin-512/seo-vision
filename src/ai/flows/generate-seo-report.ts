// This is an AI-powered SEO analysis tool that assesses a website based on various factors, identifying problems and providing optimization suggestions in a comprehensive report.
// It also calculates and displays an SEO score (out of 100) to provide an overall performance assessment of the website.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSeoReportInputSchema = z.object({
  url: z.string().describe('The URL of the website to analyze.'),
});
export type GenerateSeoReportInput = z.infer<typeof GenerateSeoReportInputSchema>;

const GenerateSeoReportOutputSchema = z.object({
  report: z.string().describe('A comprehensive SEO report, including identified problems and optimization suggestions.'),
  score: z.number().describe('An SEO score (out of 100) representing the overall performance of the website.'),
  performanceReport: z.string().describe('Performance report of the website'),
  performanceScore: z.number().describe('A score out of 100 of website performance.'),
});
export type GenerateSeoReportOutput = z.infer<typeof GenerateSeoReportOutputSchema>;

export async function generateSeoReport(input: GenerateSeoReportInput): Promise<GenerateSeoReportOutput> {
  return generateSeoReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSeoReportPrompt',
  input: {schema: GenerateSeoReportInputSchema},
  output: {schema: GenerateSeoReportOutputSchema},
  prompt: `You are an expert SEO analyst. Analyze the website at the given URL and generate a comprehensive SEO report.

  Identify problems and provide optimization suggestions. Also, calculate an SEO score (out of 100) to represent the overall performance of the website. Finally generate a performance report with a performance score out of 100.

  URL: {{{url}}}
`,
});

const generateSeoReportFlow = ai.defineFlow(
  {
    name: 'generateSeoReportFlow',
    inputSchema: GenerateSeoReportInputSchema,
    outputSchema: GenerateSeoReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
