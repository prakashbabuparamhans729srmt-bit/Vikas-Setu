'use server';
/**
 * @fileOverview An AI-powered assistant for providing information about Indian government schemes.
 *
 * - aiSchemeAssistant - A function that handles natural language queries about government schemes.
 * - AISchemeAssistantInput - The input type for the aiSchemeAssistant function.
 * - AISchemeAssistantOutput - The return type for the aiSchemeAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AISchemeAssistantInputSchema = z
  .object({
    query: z.string().describe('The natural language query about government schemes.'),
  })
  .describe('Input schema for the AI Scheme Assistant flow.');
export type AISchemeAssistantInput = z.infer<typeof AISchemeAssistantInputSchema>;

const AISchemeAssistantOutputSchema = z
  .object({
    answer: z.string().describe('The AI-generated answer to the query about government schemes.'),
  })
  .describe('Output schema for the AI Scheme Assistant flow.');
export type AISchemeAssistantOutput = z.infer<typeof AISchemeAssistantOutputSchema>;

const aiSchemeAssistantPrompt = ai.definePrompt({
  name: 'aiSchemeAssistantPrompt',
  input: {schema: AISchemeAssistantInputSchema},
  output: {schema: AISchemeAssistantOutputSchema},
  prompt: `You are an AI-powered assistant named Vikas Setu, specialized in providing information about Indian government schemes (Sarkari Yojanaen), covering both Central and State initiatives.
Your goal is to help citizens quickly understand scheme details and find relevant programs based on their natural language questions.
When answering, be informative, concise, and directly address the user's query. If you identify a specific scheme, provide its key benefits and general eligibility criteria. If the user asks for schemes for a particular demographic or region, list relevant programs.

User Query: {{{query}}}`,
});

const aiSchemeAssistantFlow = ai.defineFlow(
  {
    name: 'aiSchemeAssistantFlow',
    inputSchema: AISchemeAssistantInputSchema,
    outputSchema: AISchemeAssistantOutputSchema,
  },
  async input => {
    const {output} = await aiSchemeAssistantPrompt(input);
    return output!;
  }
);

export async function aiSchemeAssistant(
  input: AISchemeAssistantInput
): Promise<AISchemeAssistantOutput> {
  return aiSchemeAssistantFlow(input);
}
