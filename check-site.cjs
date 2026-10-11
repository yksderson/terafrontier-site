const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = __dirname;
const pages = ['index.html','digest/index.html','research/index.html',...fs.readdirSync('research',{withFileTypes:true}).filter(e=>e.isDirectory()).map(e=>`research/${e.name}/index.html`)];
for (const page of pages) {
  const html = fs.readFileSync(page,'utf8');
  assert(!html.includes('{{'),`${page}: unresolved template`);
  assert.equal((html.match(/<h1\b/g)||[]).length,1,`${page}: heading`);
  assert.equal((html.match(/property="og:image"/g)||[]).length,1,`${page}: social image`);
  assert(html.includes('name="twitter:card" content="summary_large_image"'),`${page}: sharing card`);
  assert(html.includes('One Substack subscription covers both.'),`${page}: subscription`);
  assert(html.includes('https://www.instagram.com/terafrontier'),`${page}: footer`);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(ids.length,new Set(ids).size,`${page}: duplicate IDs`);
  for (const [,attribute,value] of html.matchAll(/\b(href|src)="([^"]+)"/g)) {
    if (/^https?:/.test(value)) continue;
    const [route,hash] = value.split('#');
    let target = route.startsWith('/') ? path.join(root,route) : path.resolve(path.dirname(path.join(root,page)),route||path.basename(page));
    if (fs.existsSync(target) && fs.statSync(target).isDirectory()) target = path.join(target,'index.html');
    assert(fs.existsSync(target),`${page}: missing ${attribute} ${value}`);
    if (hash && target.endsWith('.html')) assert(fs.readFileSync(target,'utf8').includes(`id="${hash}"`),`${page}: missing anchor ${value}`);
  }
}
assert(fs.existsSync('assets/social-preview.png'));
console.log(`Checked ${pages.length} pages: links, anchors, unique headings/IDs, subscriptions and social metadata.`);
