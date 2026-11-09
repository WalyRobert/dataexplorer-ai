export async function analyzeCsvData(sample:{columns:string[];rows:string[][]},signal:AbortSignal){
 const response=await fetch('/api/analyze',{method:'POST',signal:AbortSignal.any([signal,AbortSignal.timeout(30000)]),headers:{'content-type':'application/json'},body:JSON.stringify(sample)});
 const body=await response.json();if(!response.ok)throw Error(body.error||'Não foi possível analisar a amostra.');
 if(typeof body.result!=='string'||!body.result.trim())throw Error('Resposta inválida.');return body.result as string;
}
