'use server';
/**
 * @fileOverview A Genkit flow for analyzing and summarizing public feedback and ideas.
 *
 * - summarizeFeedback - A function that processes and summarizes public feedback.
 * - FeedbackSummarizerInput - The input type for the summarizeFeedback function.
 * - FeedbackSummarizerOutput - The return type for the summarizeFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FeedbackSummarizerInputSchema = z.object({
  feedbackText: z
    .string()
    .describe('The raw text of public feedback or submitted ideas.'),
  context: z
    .string()
    .optional()
    .describe(
      'Optional context, such as the scheme name or initiative type, to guide the summary.'
    ),
});
export type FeedbackSummarizerInput = z.infer<typeof FeedbackSummarizerInputSchema>;

const FeedbackSummarizerOutputSchema = z.object({
  overallSummary: z
    .string()
    .describe('A concise overall summary of the feedback.'),
  sentimentAnalysis: z.object({
    positive: z
      .string()
      .describe('Key positive points or sentiments identified in the feedback.'),
    negative: z
      .string()
      .describe('Key negative points or concerns identified in the feedback.'),
    neutral: z
      .string()
      .optional()
      .describe('Neutral observations or factual statements in the feedback.'),
  }),
  commonThemes: z
    .array(z.string())
    .describe('A list of recurring themes or topics in the feedback.'),
  keySuggestions: z
    .array(z.string())
    .describe('A list of actionable suggestions or innovative ideas from the feedback.'),
});
export type FeedbackSummarizerOutput = z.infer<typeof FeedbackSummarizerOutputSchema>;

export async function summarizeFeedback(
  input: FeedbackSummarizerInput
): Promise<FeedbackSummarizerOutput> {
  return feedbackSummarizerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'feedbackSummarizerPrompt',
  input: {schema: FeedbackSummarizerInputSchema},
  output: {schema: FeedbackSummarizerOutputSchema},
  prompt: `You are an AI assistant specialized in analyzing public feedback for government initiatives.
Your task is to review the provided feedback text, summarize it, identify sentiment, and extract common themes and key suggestions.

Context: {{{context}}}
Feedback Text: {{{feedbackText}}}

Analyze the feedback and provide a structured output including an overall summary, sentiment analysis (positive, negative, and optional neutral points), common recurring themes, and actionable key suggestions. Focus on clarity, conciseness, and identifying innovative ideas to improve governance.`,
});

const feedbackSummarizerFlow = ai.defineFlow(
  {
    name: 'feedbackSummarizerFlow',
    inputSchema: FeedbackSummarizerInputSchema,
    outputSchema: FeedbackSummarizerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
