// Implemented by Gemini.
'use server';
/**
 * @fileOverview Calculates an SEO score (out of 100) for a website based on an SEO report.
 *
 * - calculateSeoScore - A function that calculates the SEO score.
 * - CalculateSeoScoreInput - The input type for the calculateSeoScore function.
 * - CalculateSeoScoreOutput - The return type for the calculateSeoScore function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CalculateSeoScoreInputSchema = z.object({
  seoReport: z
    .string()
    .describe('The SEO report of the website, including identified problems and optimization suggestions.'),
});
export type CalculateSeoScoreInput = z.infer<typeof CalculateSeoScoreInputSchema>;

const CalculateSeoScoreOutputSchema = z.object({
  seoScore: z
    .number()
    .describe('The SEO score of the website, out of 100.')
    .min(0)
    .max(100),
  reasoning: z.string().describe('The reasoning behind the calculated SEO score.'),
});
export type CalculateSeoScoreOutput = z.infer<typeof CalculateSeoScoreOutputSchema>;

export async function calculateSeoScore(input: CalculateSeoScoreInput): Promise<CalculateSeoScoreOutput> {
  return calculateSeoScoreFlow(input);
}

const calculateSeoScorePrompt = ai.definePrompt({
  name: 'calculateSeoScorePrompt',
  input: {schema: CalculateSeoScoreInputSchema},
  output: {schema: CalculateSeoScoreOutputSchema},
  prompt: `You are an expert SEO analyst. You are given an SEO report for a website.

You will analyze the report and calculate an SEO score out of 100. You will also provide a brief reasoning for the score.

SEO Report:
{{seoReport}}`,
});

const calculateSeoScoreFlow = ai.defineFlow(
  {
    name: 'calculateSeoScoreFlow',
    inputSchema: CalculateSeoScoreInputSchema,
    outputSchema: CalculateSeoScoreOutputSchema,
  },
  async input => {
    const {output} = await calculateSeoScorePrompt(input);
    return output!;
  }
);
