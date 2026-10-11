# TeraFrontier website

Public research, publication status and links to the private Solar and Intelligence Lab workspaces. The site is static HTML and CSS. GitHub stores the source; the existing Cloudflare Pages integration publishes main.

## Work locally

Use Node.js 24 and pnpm 11.25.0, matching the application repositories.

1. Run `pnpm install --frozen-lockfile`.
2. Run `pnpm build` after editing article content or the shared article renderer.
3. Run `pnpm test` to check navigation, internal links, assets, anchors and text encoding.
4. Run `pnpm preview` and open http://127.0.0.1:4174/.
5. Review desktop and mobile layouts. Commit generated pages with their source.

## Publish

Use a review branch and pull request in yksderson/terafrontier-site. Merging into main triggers the existing Pages deployment; a separate Pages project is unnecessary. Confirm the deployed pages after release. The verification workflow checks generated content and links; it does not change the deployment integration.

The website needs no database. Private application records, credentials, screenshots and customer evidence do not belong in this public repository.

## Content and design

See [PUBLISHING.md](PUBLISHING.md) for essays and revision records. The Digest page states its current publication status. Workspace links require sign-in; preliminary screening does not establish project feasibility or available utility capacity.

Preserve the existing brand assets and dark, sparse layout. Keep copy concrete and navigation usable by keyboard and touch. Avoid claiming a planned feature or publication is already available.
