
'use client';

import {genkit, GenkitPlugin} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {genkitEval, GenkitMetric} from '@genkit-ai/evaluator';
import {dotprompt, prompt} from '@genkit-ai/dotprompt';

const plugins: GenkitPlugin[] = [googleAI(), dotprompt()];

if (process.env.NODE_ENV === 'development') {
  const devLogger = {
    info: (message: string, ...args: any[]) =>
      console.log(`[Genkit Dev] ${message}`, ...args),
    warn: (message: string, ...args: any[]) =>
      console.warn(`[Genkit Dev] ${message}`, ...args),
    error: (message: string, ...args: any[]) =>
      console.error(`[Genkit Dev] ${message}`, ...args),
    debug: (message: string, ...args: any[]) =>
      console.debug(`[Genkit Dev] ${message}`, ...args),
  };
  plugins.push(
    genkitEval({
      judge: 'googleai/gemini-1.5-flash',
      metrics: [GenkitMetric.Faithfulness, GenkitMetric.AnswerRelevancy],
      embedder: 'googleai/text-embedding-004',
    })
  );
  plugins.push(prompt({logger: devLogger}));
}

export const ai = genkit({
  plugins,
});
