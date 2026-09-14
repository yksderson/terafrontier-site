# TeraFrontier Website V0.1

This is intentionally a simple static site: HTML + CSS only.

## Run locally
Serve the repository root with any static HTTP server, then open its local address. No build step is required.

## Publish
1. Create a GitHub repository named `terafrontier-site`.
2. Upload all files in this folder.
3. In Cloudflare, create a Pages project from the GitHub repository.
4. Production branch: `main`
5. Build command: `exit 0`
6. Build output directory: `.` (the repository root)
7. After the first deployment, attach `terafrontier.com` under Custom domains.

## Before launch
The subscription button links to TeraFrontier on Substack. The footer links to the supplied Substack, X, LinkedIn, and Instagram profiles. The first essay is still marked coming soon.

## Assets and layout

All four supplied PNG brand assets are preserved unchanged. The hero uses the generated `assets/space-hero-v2.jpg` background (approximately 97 KB). All three displayed emblems use `assets/terafrontier-emblem-web.png`, a transparent display copy, with a shared warm-gold treatment and soft fade. Generation prompts are retained alongside the assets. No external fonts, JavaScript, frameworks, or build step are required.

The page uses a space-banner hero fading into navy, a featured upcoming essay, an open research index, an about section, and a publication status. Navigation remains visible on mobile. Keyboard users have a skip link and explicit focus outlines.

## Design principle
Delete before adding. Keep the site sparse, dark, fast, and serious.

