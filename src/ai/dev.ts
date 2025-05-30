
import { config } from 'dotenv';
config();

import '@/ai/flows/generate-seo-report.ts';
import '@/ai/flows/calculate-seo-score.ts';
import '@/ai/flows/summarize-performance-report.ts';
import '@/ai/tools/get-website-traffic-tool.ts'; // Added import for the new tool
