const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const escape = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const slugify = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const articles = fs.readdirSync(path.join(root, 'content')).filter(f => f.endsWith('.md'));
const publishedArticles = [];
const formatDate = date => new Date(date+'T12:00:00Z').toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'});
const validDate = date => typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date) && !Number.isNaN(Date.parse(date)) && new Date(date).toISOString().slice(0,10) === date;
for (const file of articles) {
  const name = file.slice(0,-3);
  const md = fs.readFileSync(path.join(root,'content',file),'utf8').replace(/\r\n?/g, '\n');
  const meta = JSON.parse(fs.readFileSync(path.join(root,'content',name+'.json'),'utf8'));
  if (!/^[a-z0-9-]+$/.test(meta.slug)) throw Error('Invalid article slug');
  if (!['draft','published'].includes(meta.status)) throw Error('Invalid publication status');
  if (meta.status === 'published' && !validDate(meta.published)) throw Error('A published article needs a valid publication date');
  const revisions = meta.revisions || [];
  for (const [i,revision] of revisions.entries()) {
    if (!validDate(revision.date) || revision.date < meta.published || (i && revision.date < revisions[i-1].date) || !revision.summary?.trim()) throw Error('Revisions need chronological dates and a change summary');
  }
  const title = md.split('\n')[0].replace(/^# /,'');
  const words = md.replace(/\[\^\d+\]/g,'').split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(words/220);
  const refs = new Map();
  const headings = [];
  const inline = s => escape(s).replace(/\[\^(\d+)\]/g, (_, n) => {
    if (!meta.sources[Number(n)-1]) throw Error('Missing source '+n);
    const count = (refs.get(n) || 0)+1;
    refs.set(n,count);
    return `<sup><a class="reference" role="doc-noteref" id="ref-${n}-${count}" href="#source-${n}" aria-label="Source ${n}: ${escape(meta.sources[n-1].publisher)}">[${n}]</a></sup>`;
  });
  const body = md.trim().split(/\n\s*\n/).slice(1).map(block => {
    const figure = block.match(/^:::figure (\d+)$/);
    if (figure) {
      const f = meta.figures?.[Number(figure[1])-1];
      if (!f || !/^\/assets\/[a-z0-9.-]+$/.test(f.src)) throw Error('Invalid figure');
      return `<figure class="article-figure"><a href="${escape(f.src)}" aria-label="View full-size diagram"><img src="${escape(f.src)}" alt="${escape(f.alt)}" width="1536" height="1024" loading="lazy"></a><figcaption>${inline(f.caption)}</figcaption></figure>`;
    }
    const table = block.match(/^:::table (\d+)$/);
    if (table) {
      const t = meta.tables?.[Number(table[1])-1];
      if (!t?.rows?.length) throw Error('Invalid table');
      return `<div class="article-table-wrap" role="region" aria-label="Training and inference comparison" tabindex="0"><table class="article-table"><caption>${inline(t.caption)}</caption><thead><tr>${t.rows[0].map(c=>`<th scope="col">${escape(c)}</th>`).join('')}</tr></thead><tbody>${t.rows.slice(1).map(row=>`<tr>${row.map((c,i)=>i ? `<td>${inline(c)}</td>` : `<th scope="row">${escape(c)}</th>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    }
    const h = block.match(/^(#{2,3}) (.+)$/);
    if (h) {
      const id = slugify(h[2]);
      if (h[1].length === 2) headings.push({id,title:h[2]});
      return `<h${h[1].length} id="${id}" tabindex="-1">${escape(h[2])}</h${h[1].length}>`;
    }
    return `<p>${inline(block.replace(/\n/g,' '))}</p>`;
  }).join('\n');
  const sources = meta.sources.map((s,i) => {
    const n=i+1;
    if (!refs.has(String(n))) throw Error('Unused source '+n);
    if (!s.url.startsWith('https://')) throw Error('Source must use HTTPS');
    const back = Array.from({length:refs.get(String(n))},(_,j)=>`<a class="backref" href="#ref-${n}-${j+1}" aria-label="Return to citation ${n}${j ? ', mention '+(j+1) : ''}">↑ Return to text${j ? ' '+(j+1) : ''}</a>`).join(' ');
    return `<li id="source-${n}" tabindex="-1"><span class="source-publisher">${escape(s.publisher)}</span><a class="source-title" href="${escape(s.url)}">${escape(s.title)}</a><span class="source-detail">${escape(s.date)}${s.note ? '. '+escape(s.note) : ''}</span>${back}</li>`;
  }).join('\n');
  const draft = meta.status === 'draft';
  const latestRevision = revisions.at(-1);
  const date = draft ? 'Draft for review' : `Published <time datetime="${escape(meta.published)}">${formatDate(meta.published)}</time>`;
  const updated = !draft && latestRevision ? `<span>Updated <time datetime="${escape(latestRevision.date)}">${formatDate(latestRevision.date)}</time> · <a href="#revision-history">What changed</a></span>` : '';
  const revisionHistory = !draft && revisions.length ? `<section class="revision-history" aria-labelledby="revision-history"><h2 id="revision-history">Revision history</h2><ul>${revisions.map(r=>`<li><time datetime="${escape(r.date)}">${formatDate(r.date)}</time>: ${escape(r.summary)}</li>`).join('')}</ul></section>` : '';
  const toc = headings.map(h=>`<li><a href="#${h.id}">${escape(h.title)}</a></li>`).join('');
  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escape(title)} | TeraFrontier</title><meta name="description" content="${escape(meta.description)}">
${draft ? '<meta name="robots" content="noindex, nofollow">' : `<link rel="canonical" href="https://terafrontier.com/research/${meta.slug}/">`}
<meta name="theme-color" content="#040c18"><meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(meta.description)}"><meta property="og:type" content="article"><meta name="author" content="${escape(meta.author)}">
${draft ? '' : `<meta property="article:published_time" content="${meta.published}T00:00:00+08:00"><meta property="article:modified_time" content="${latestRevision?.date || meta.published}T00:00:00+08:00"><meta property="og:url" content="https://terafrontier.com/research/${meta.slug}/">`}
<link rel="icon" href="../../assets/terafrontier-emblem-96.jpg"><link rel="stylesheet" href="../../styles.css"><link rel="stylesheet" href="../../article.css"></head>
<body class="article-page"><a class="skip-link" href="#article-body">Skip to article</a>
<header class="nav"><a class="brand" href="../../" aria-label="TeraFrontier home"><span class="brand-mark" aria-hidden="true"></span><span>TERAFRONTIER</span></a><nav aria-label="Main navigation"><a href="../">Research</a><a href="../../digest/">Digest</a><a href="../../#about">About</a><a class="nav-cta" href="https://terafrontier.substack.com/">Subscribe</a></nav></header>
<main><article aria-labelledby="article-title"><header class="article-header"><a class="back-link" href="../">← All research</a><p class="eyebrow">${escape(meta.series || 'ESSAY')} / ${escape(meta.topic || 'RESEARCH')}</p><h1 id="article-title">${escape(title)}</h1><p class="article-deck">${escape(meta.description)}</p><div class="article-meta"><span>By ${escape(meta.author)}</span><span>${date}</span>${updated}<span>${minutes} min read</span></div></header>
<div class="reading-layout"><aside class="contents" aria-label="Article contents"><p class="eyebrow">IN THIS ESSAY</p><ol>${toc}<li><a href="#sources">Sources</a></li></ol></aside><div class="article-body" id="article-body" tabindex="-1">${body}
${revisionHistory}<section class="sources" aria-labelledby="sources"><h2 id="sources" tabindex="-1">Sources</h2><p class="sources-intro">Public sources supporting the article. Publication dates are shown where available.</p><ol>${sources}</ol></section>
<section class="article-subscribe" aria-labelledby="subscribe-title"><p class="eyebrow">STAY ON THE FRONTIER</p><h2 id="subscribe-title">The next essay, in your inbox.</h2><p>Research on the energy, infrastructure and execution behind AI.</p><a class="button" href="https://terafrontier.substack.com/">Subscribe on Substack ↗</a></section><a class="back-link" href="#article-title">Back to top ↑</a>
</div></div></article></main><footer><span>© TeraFrontier · Benoit Dubeau</span><nav class="social-links" aria-label="TeraFrontier on other platforms"><a href="https://terafrontier.substack.com/">Substack</a><a href="https://www.linkedin.com/company/terafrontier/">LinkedIn</a><a href="https://x.com/terafrontier">X</a></nav></footer></body></html>`;
  const out = path.join(root,'research',meta.slug);
  fs.mkdirSync(out,{recursive:true}); fs.writeFileSync(path.join(out,'index.html'),html);
  if (!draft) publishedArticles.push({...meta,title,minutes});
  console.log(`${meta.slug}: ${words} words, ${minutes} min read, ${meta.sources.length} sources (${meta.status})`);
}
publishedArticles.sort((a,b)=>b.published.localeCompare(a.published)||a.slug.localeCompare(b.slug));
const cards = publishedArticles.map(a=>`<li><article class="essay-card"><p class="eyebrow">${escape(a.series || 'ESSAY')} / ${escape(a.topic || 'RESEARCH')}</p><h2><a href="${a.slug}/">${escape(a.title)}</a></h2><p>${escape(a.description)}</p><div class="article-meta"><span><time datetime="${a.published}">${formatDate(a.published)}</time></span><span>${a.minutes} min read</span></div><a class="back-link" href="${a.slug}/">Read the essay →</a></article></li>`).join('\n');
const archive = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Research | TeraFrontier</title><meta name="description" content="Essays on the energy, compute and infrastructure systems behind AI and the next wave of industrial growth."><link rel="canonical" href="https://terafrontier.com/research/"><meta property="og:title" content="Research | TeraFrontier"><meta property="og:type" content="website"><link rel="icon" href="../assets/terafrontier-emblem-96.jpg"><link rel="stylesheet" href="../styles.css"><link rel="stylesheet" href="../article.css"></head><body><a class="skip-link" href="#research-list">Skip to essays</a><header class="nav"><a class="brand" href="../" aria-label="TeraFrontier home"><span class="brand-mark" aria-hidden="true"></span><span>TERAFRONTIER</span></a><nav aria-label="Main navigation"><a href="./" aria-current="page">Research</a><a href="../digest/">Digest</a><a href="../#about">About</a><a class="nav-cta" href="https://terafrontier.substack.com/">Subscribe</a></nav></header><main class="research-archive" id="research-list" tabindex="-1"><header><p class="eyebrow">THE TERAFRONTIER LIBRARY</p><h1>Research</h1><p class="article-deck">Essays on the energy, compute and infrastructure systems behind AI and the next wave of industrial growth.</p></header><ol class="essay-list">${cards}</ol><div class="archive-subscribe"><h2>Explore what makes intelligence possible.</h2><p>Receive new essays by email.</p><a class="button" href="https://terafrontier.substack.com/">Subscribe on Substack ↗</a></div></main><footer><span>© TeraFrontier · Benoit Dubeau</span><nav class="social-links" aria-label="TeraFrontier on other platforms"><a href="https://terafrontier.substack.com/">Substack</a><a href="https://www.linkedin.com/company/terafrontier/">LinkedIn</a><a href="https://x.com/terafrontier">X</a></nav></footer></body></html>`;
fs.mkdirSync(path.join(root,'research'),{recursive:true});
fs.writeFileSync(path.join(root,'research/index.html'),archive);
const urls = [{url:'https://terafrontier.com/'},{url:'https://terafrontier.com/research/'},{url:'https://terafrontier.com/digest/'},...publishedArticles.map(a=>({url:`https://terafrontier.com/research/${a.slug}/`,modified:a.revisions?.at(-1)?.date || a.published}))];
fs.writeFileSync(path.join(root,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(u=>`<url><loc>${u.url}</loc>${u.modified ? `<lastmod>${u.modified}</lastmod>` : ''}</url>`).join('')}</urlset>\n`);

