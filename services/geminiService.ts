import {analyzeText,type AISettings} from './aiClient';
export async function analyzeCsvData(sample:{columns:string[];rows:string[][]},signal:AbortSignal,settings:AISettings){return analyzeText(sample,settings,signal);}
