const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.jpg':'image/jpeg','.png':'image/png'};
http.createServer((req,res)=>{
 let pathname;
 try { pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname); } catch { res.writeHead(400).end(); return; }
 let file=path.resolve(__dirname,'.'+pathname);
 if(file!==__dirname && !file.startsWith(__dirname+path.sep)){res.writeHead(403).end();return;}
 try { if(fs.statSync(file).isDirectory()) file=path.join(file,'index.html'); } catch {}
 fs.readFile(file,(err,data)=>{
  if(err){res.writeHead(404).end('Not found');return;}
  res.writeHead(200,{'Content-Type':types[path.extname(file)]||'text/plain; charset=utf-8','Cache-Control':'no-store'});res.end(data);
 });
}).listen(4174,'127.0.0.1',()=>console.log('Preview: http://127.0.0.1:4174/research/ai-infrastructure-apac/'));
