const escape = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const subscription = 'Research essays and a weekly APAC digest, delivered free by email.';
const launchNote = 'One free Substack subscription covers Research and the weekly Digest.';
const socials = [['Substack','https://terafrontier.substack.com/'],['X','https://x.com/terafrontier'],['LinkedIn','https://www.linkedin.com/company/terafrontier/'],['Instagram','https://www.instagram.com/terafrontier']];
const footer = `<footer><span>© TeraFrontier · Benoit Dubeau</span><nav class="social-links" aria-label="TeraFrontier on other platforms">${socials.map(([name,url])=>`<a href="${url}">${name}</a>`).join('')}</nav></footer>`;
function header(current = '') {
  const links = [['Research','/research/'],['Digest','/digest/'],['About','/#about'],['Subscribe','/#subscribe'],['Log in','/login/']];
  return `<header class="nav"><a class="brand" href="/" aria-label="TeraFrontier home"><span class="brand-mark" aria-hidden="true"></span><span>TERAFRONTIER</span></a><nav aria-label="Main navigation">${links.map(([label,url])=>`<a href="${url}"${label==='Subscribe'?' class="nav-cta"':''}${label===current?' aria-current="page"':''}>${label}</a>`).join('')}</nav></header>`;
}
function finish(html, current = '') {
  const title = html.match(/<title>(.*?)<\/title>/s)[1];
  const description = html.match(/<meta name="description" content="([^"]*)"/)[1];
  const url = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  html = html.replace('{{header}}',header(current)).replace('{{footer}}',footer);
  html = html.replace(/<meta (?:property="og:(?:title|description|url|image[^\"]*)"|name="twitter:[^"]+")[^>]*>/g,'');
  const tags = `<meta property="og:title" content="${title}"><meta property="og:description" content="${description}">${url?`<meta property="og:url" content="${url}">`:''}<meta property="og:image" content="https://terafrontier.com/assets/social-preview.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="TeraFrontier. Energy. Intelligence. Infrastructure."><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${title}"><meta name="twitter:description" content="${description}"><meta name="twitter:image" content="https://terafrontier.com/assets/social-preview.png"><meta name="twitter:image:alt" content="TeraFrontier. Energy. Intelligence. Infrastructure.">`;
  return html.replace('</head>',tags+'\n</head>').replace(/[ \t]+$/gm,'');
}
module.exports = {escape, subscription, launchNote, finish};
