# Managing TeraFrontier essays

The website is static HTML and CSS. Article text and source details are stored in `content/`; `node build.cjs` generates article pages, the Research archive and the sitemap. Commit generated pages with their source files. Cloudflare Pages can retain its existing no-build deployment configuration.

## Publish a new essay

1. Add a Markdown file and matching JSON file under `content/`, following Article 01. Use a unique slug, author, description, series and topic.
2. The renderer supports paragraphs, `##` sections, `###` subsections and `[^1]` source references. Source numbers correspond to the JSON sources array.
3. Set `status` to `published`, `published` to the actual publication date in YYYY-MM-DD format, and `revisions` to an empty array. Keep draft content local until ready; a noindex label is not access control.
4. Run `node build.cjs`. The Research archive lists published articles newest first. Update the homepage featured article title, description, date and link when a newer essay should be featured.
5. Preview with `node serve.cjs` at http://127.0.0.1:4174/. Check the text, dates, references and mobile layout.
6. Commit the source files, generated article page, `research/index.html`, `sitemap.xml`, and any homepage changes to the website repository. The existing Cloudflare Pages integration publishes the main branch.

## Revise a published essay

Keep the original publication date. Update the article text or sources and append an entry to `revisions`, in date order:

```json
{"date": "2026-10-15", "summary": "Updated the Malaysia policy example and its source."}
```

Use the actual revision date and an accurate summary. Rebuild and publish the changed files. The page shows the most recent Updated date, a link to What changed, and the complete revision history. There is no Updated label before the first revision. The archive remains sorted by original publication date.

## Files to deploy

Public website pages, CSS, assets, sitemap and robots.txt. Keep `build.cjs`, content files and this guide in the repository for maintenance. Never upload local screenshots, test fixtures or unrelated workspace files as part of a publication.

The article page uses numbered references with a return link to each cited passage. Links go directly to the publisher, with PDF page numbers and source dates where available. A Substack subscription link is included; this process does not send emails or publish to Substack, LinkedIn or X.
