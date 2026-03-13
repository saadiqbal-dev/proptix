# proptix.ai Website

Static marketing site built with plain HTML/CSS/JS. Desktop‑first. All assets local (no CDNs). The home page is a landing page with videos; videos must not slow down initial load.

## Contents

- Tech + constraints
- Project structure
- CSS architecture (base + page CSS)
- Color system (CSS variables)
- Desktop‑first breakpoints
- Video performance pattern
- Conventions
- Review Folder Workflow
- Deployment (S3, CloudFront cache, CloudFront functions)

## Tech + constraints

- Vanilla HTML5, CSS3, JavaScript (ES6+)
- Local fonts/assets only. No CDN imports
- Accessibility, SEO, and performance as first‑class concerns

## Project structure

```
proptix.ai/
  src/                    # All deployable content (synced to S3)
    index.html            # landing page
    assets/
      css/                # stylesheets (base.css + page-specific)
      js/                 # JavaScript files
      fonts/              # local font files (Poppins)
      img/                # images (webp, svg, jpg)
      videos/             # video files (mp4)
    review-3p9b584n12/    # review folder for staging changes
    [page folders]/       # activate, contact, faq, flip180, etc.
  scripts/
    proptix-url-handler.js  # CloudFront function (handles redirects & clean URLs)
  README.md               # this file
  VIDEO_TUTORIAL.md       # video tutorial documentation
```

## CSS architecture

- `assets/css/base.css` contains:
  - CSS variables for colors, typography, spacing, z‑index, container sizes
  - Modern reset and base element styles
  - Utilities (e.g., `.container`, `.visually-hidden`, spacing helpers)
- Each page gets its own stylesheet (e.g., `home-page.css`) with only page‑specific layout/components. Reuse tokens/utilities from `base.css`.

## Brand colors (primary: `#592E83`)

- `--color-primary: #592E83`
- `--color-accent-1: #CAA8F5`
- `--color-accent-2: #9984D4`
- `--color-surface: #FAF9FC`
- `--color-ink: #0e0a14` (derived for high contrast)
- `--color-bg: #230C33`

## Desktop‑first breakpoints

Base styles target desktop. Use max‑width queries for smaller screens.

```css
/* base: desktop ≥ 1200px */

@media (max-width: 1440px) {
  /* large laptop */
}
@media (max-width: 1200px) {
  /* laptop */
}
@media (max-width: 992px) {
  /* tablet */
}
@media (max-width: 768px) {
  /* large phones */
}
@media (max-width: 480px) {
  /* small phones */
}
```

## Video performance (no‑CDN)

1. Do NOT set `<video src>` directly. Use `data-src` and lazy‑load via `assets/js/script.js`.
2. Always provide `poster`, `width` and `height` to avoid CLS.
3. Use `preload="none"` (or `metadata` only when needed). Autoplay requires `muted` and `playsinline`.

HTML pattern:

```html
<section class="hero">
  <video
    class="lazy-video"
    data-src="assets/media/hero.mp4"
    poster="assets/img/hero-poster.jpg"
    preload="none"
    muted
    playsinline
    loop
  ></video>
  <!-- content ... -->
</section>
<noscript>
  <!-- Fallback for users without JS -->
  <video
    src="assets/media/hero.mp4"
    poster="assets/img/hero-poster.jpg"
    muted
    playsinline
    loop
  ></video>
  <!-- Keep preload off; initial load should remain light -->
</noscript>
```

JS hook:

```html
<script src="assets/js/script.js" defer></script>
```

## Conventions

- filenames: kebab‑case; classes: kebab‑case; CSS variables: `--scope-name`
- commit messages: lowercase, concise (e.g., `feat: add hero section`, `perf: lazy load home video`)
- formatting: Prettier defaults; no inline styles; no `!important` unless justified
- accessibility: proper landmarks, headings, focus styles, alt text, reduced‑motion support

## Local development

- Serve from root: `npx serve src`
- Access pages at `http://localhost:3000/` (matches S3/CloudFront structure)
- Add videos to `src/assets/videos/` and images to `src/assets/img/`

## Performance checklist (landing page)

- hero video lazy‑loaded via `data-src`
- compress videos (H.264/AVC mp4 + optional WebM), aim ≤ 4–6 MB for hero; provide a short loop
- provide a lightweight poster (WebP/JPEG)
- fonts loaded locally with `@font-face`; only required weights

## Review Folder Workflow

The `src/review-3p9b584n12/` folder is used for staging changes before deploying to production. This allows testing changes with stakeholders before making them live.

**Workflow:**
1. **Make changes in `src/review-3p9b584n12/` folder FIRST** (never directly in production root)
2. Test locally: `npx serve src` then access `http://localhost:3000/review-3p9b584n12/`
3. Deploy to S3 (syncs entire `src/` folder including review)
4. Once approved: Copy changes from review folder to production root within `src/`
5. Deploy to S3 again

**Important:** The CloudFront function (`scripts/proptix-url-handler.js`) automatically creates review-folder versions of all redirects, so redirects work in both production and review environments.

## Deployment

All deployment commands use the AWS profile `proptix`. Adjust this value in case your AWS profile has a different name.

### S3 Deployment

**S3 Sync (dry run first):**
```powershell
aws --profile proptix s3 sync src s3://proptix.ai --dryrun --delete --acl private
```

**S3 Sync (actual):**
```powershell
aws --profile proptix s3 sync src s3://proptix.ai --delete --acl private
```

### CloudFront Cache Invalidation

**Invalidate CloudFront Cache (run after sync):**
```powershell
aws --profile proptix cloudfront create-invalidation --distribution-id "E2DBE969K0PRE0" --paths "/*"
```

### CloudFront Function Deployment

The CloudFront function handles URL redirects and clean URLs. Function name: `proptix-url-handler`

**Step 1: Update DEVELOPMENT stage (safe, doesn't affect production):**
```powershell
$config = @{Comment="Combined redirects and clean URLs for proptix.ai"; Runtime="cloudfront-js-1.0"} | ConvertTo-Json -Compress
$configFile = [System.IO.Path]::GetTempFileName() + ".json"
$config | Out-File -FilePath $configFile -Encoding ascii -NoNewline
$codeFile = (Resolve-Path "scripts/proptix-url-handler.js").Path
$ETAG = aws --profile proptix cloudfront describe-function --name "proptix-url-handler" --stage DEVELOPMENT --query 'ETag' --output text
aws --profile proptix cloudfront update-function --name "proptix-url-handler" --function-config file://$configFile --function-code fileb://$codeFile --if-match $ETAG
Remove-Item $configFile
```

**Step 2: Verify DEVELOPMENT stage:**
```powershell
aws --profile proptix cloudfront describe-function --name "proptix-url-handler" --stage DEVELOPMENT
```

**Step 3: Publish to LIVE stage (only after verifying DEVELOPMENT works):**
```powershell
$ETAG = aws --profile proptix cloudfront describe-function --name "proptix-url-handler" --stage DEVELOPMENT --query 'ETag' --output text
aws --profile proptix cloudfront publish-function --name "proptix-url-handler" --if-match $ETAG
```

**Note:** Always run dry run first to see all changes before deploying. The CloudFront function automatically creates review-folder versions of all redirects defined in `scripts/proptix-url-handler.js`.
