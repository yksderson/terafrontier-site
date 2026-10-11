const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const pages=['index.html','research/index.html','digest/index.html','research/what-ai-is-built-on/index.html','research/ai-infrastructure-apac/index.html'];
let checked=0;
for(const page of pages){
  const html=fs.readFileSync(path.join(root,page),'utf8');
  assert.ok(html.includes('https://solar.terafrontier.com/'),`${page}: Solar navigation`);
  assert.ok(html.includes('https://lab.terafrontier.com/'),`${page}: Lab navigation`);
  assert.ok(!/[ÂÃ]/.test(html),`${page}: UTF-8 text`);
  for(const match of html.matchAll(/<(?:a|img|link)\b[^>]*\b(?:href|src)="([^"]+)"/g)){
    const ref=match[1];assert.ok(!/^(javascript|data):/i.test(ref));
    if(/^(?:https?:|mailto:|tel:|\/\/)/i.test(ref))continue;
    const [pathname,fragment]=ref.split('#');
    let file=pathname?path.resolve(pathname.startsWith('/')?root:path.dirname(path.join(root,page)),'.'+(pathname.startsWith('/')?'':'/')+pathname):path.join(root,page);
    assert.ok(file===root||file.startsWith(root+path.sep));
    if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
    assert.ok(fs.existsSync(file),`${page}: missing ${ref}`);
    if(fragment&&file.endsWith('.html')){const text=fs.readFileSync(file,'utf8');assert.ok(text.includes(`id="${decodeURIComponent(fragment)}"`),`${page}: missing anchor ${ref}`);}
    checked++;
  }
}
console.log(`${pages.length} public pages; ${checked} internal links/assets/anchors verified.`);
