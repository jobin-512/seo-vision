'use server';

/**
 * @fileOverview A flow to summarize the performance report of a website.
 *
 * - summarizePerformanceReport - A function that summarizes the performance report of a website.
 * - SummarizePerformanceReportInput - The input type for the summarizePerformanceReport function.
 * - SummarizePerformanceReportOutput - The return type for the summarizePerformanceReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizePerformanceReportInputSchema = z.object({
  performanceData: z
    .string()
    .describe('The performance data of the website in JSON format.'),
});
export type SummarizePerformanceReportInput = z.infer<
  typeof SummarizePerformanceReportInputSchema
>;

const SummarizePerformanceReportOutputSchema = z.object({
  summary: z.string().describe('A summary of the website performance report.'),
  score: z.number().describe('The performance score out of 100.'),
});
export type SummarizePerformanceReportOutput = z.infer<
  typeof SummarizePerformanceReportOutputSchema
>;

export async function summarizePerformanceReport(
  input: SummarizePerformanceReportInput
): Promise<SummarizePerformanceReportOutput> {
  return summarizePerformanceReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizePerformanceReportPrompt',
  input: {schema: SummarizePerformanceReportInputSchema},
  output: {schema: SummarizePerformanceReportOutputSchema},
  prompt: `You are an expert web performance analyst.

You will receive a website's performance data, and your task is to summarize the key metrics and provide an overall performance score out of 100.

Analyze the following performance data:

{{performanceData}}

Based on your analysis, provide a concise summary of the website's performance, highlighting areas for improvement. Also, provide a performance score out of 100.

Summary:

Score: {{score}}`,
});

const summarizePerformanceReportFlow = ai.defineFlow(
  {
    name: 'summarizePerformanceReportFlow',
    inputSchema: SummarizePerformanceReportInputSchema,
    outputSchema: SummarizePerformanceReportOutputSchema,
  },
  async input => {
    const {output} = await prompt({
      ...input,
      score: 75, // TODO: Dynamically calculate this score based on performanceData
    });
    return output!;
  }
);
