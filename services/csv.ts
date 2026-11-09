import type {DataRow} from '../types';
export function rowsFromCells(cells:string[][]):DataRow[]{
 const headers=cells[0]?.map(s=>s.trim().replace(/^\uFEFF/,''));
 if(!headers||headers.length<1||headers.length>50||headers.some(s=>!s)||new Set(headers).size!==headers.length)throw Error('Use 1 a 50 cabeçalhos únicos e não vazios.');
 const records=cells.slice(1).filter(row=>row.some(v=>v.trim()!==''));
 if(!records.length||records.length>5000)throw Error('Use até 5000 linhas de dados, além do cabeçalho.');
 return records.map(row=>{if(row.length!==headers.length)throw Error('Uma linha tem quantidade de campos diferente do cabeçalho.');return Object.fromEntries(headers.map((h,i)=>[h,row[i]]));});
}
export function parseCSV(text:string):DataRow[]{
 // CSV with quoted separators, escaped quotes, CRLF and embedded newlines.
 text=text.replace(/^\uFEFF/,'');
 const count=(delimiter:string)=>{let quoted=false,total=0;for(let i=0;i<text.length;i++){const c=text[i];if(c==='"'){if(quoted&&text[i+1]==='"')i++;else quoted=!quoted;}else if(!quoted&&c==='\n')break;else if(!quoted&&c===delimiter)total++;}return total;};
 const delimiter=[',',';','\t'].sort((a,b)=>count(b)-count(a))[0];
 const rows:string[][]=[];let row:string[]=[],field='',quoted=false,closed=false;
 for(let i=0;i<text.length;i++){
  const c=text[i];
  if(quoted){if(c==='"'){if(text[i+1]==='"'){field+='"';i++;}else {quoted=false;closed=true;}}else field+=c;continue;}
  if(c==='"'){if(field||closed)throw Error('Aspas inválidas no CSV.');quoted=true;}
  else if(c===delimiter){row.push(field);field='';closed=false;}
  else if(c==='\n'||c==='\r'){if(c==='\r'&&text[i+1]==='\n')i++;row.push(field);rows.push(row);row=[];field='';closed=false;}
  else {if(closed)throw Error('Texto após o fechamento de aspas no CSV.');field+=c;}
 }
 if(quoted)throw Error('CSV com aspas não fechadas.');
 if(field||row.length){row.push(field);rows.push(row);}
 return rowsFromCells(rows);
}

export type Dataset={name:string;columns:string[];rows:DataRow[]};
export function parseDataset(text:string,name='dados.csv'):Dataset{
 if(text.length>1024*1024)throw Error('Limite: 1 MB de texto CSV.');
 const rows=parseCSV(text);const columns=Object.keys(rows[0]);
 if(columns.some(c=>c.length>100)||rows.some(row=>Object.values(row).some(v=>String(v??'').length>2000)))throw Error('Cabeçalhos: até 100 caracteres; células: até 2000.');
 return {name,columns,rows};
}
export function prepareSample(dataset:Dataset,columns:string[]){
 if(!columns.length||new Set(columns).size!==columns.length||columns.some(c=>!dataset.columns.includes(c)))throw Error('Selecione ao menos uma coluna válida.');
 const sample={columns,rows:dataset.rows.slice(0,50).map(row=>columns.map(c=>String(row[c]??'')))};
 if(JSON.stringify(sample).length>60000)throw Error('A amostra excede 60 mil caracteres. Selecione menos colunas.');
 return sample;
}
