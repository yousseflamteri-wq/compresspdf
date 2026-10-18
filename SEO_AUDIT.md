# SEO Audit – compresspdf.online
**Audit date:** 2026-10-17  
**Auditor:** Technical SEO / Next.js analysis (static build `dist/` + live production checks)  
**Stack confirmed:** Next.js 16.4.0, Turbopack, `output: 'export'`, `distDir: 'dist'`, Cloudflare Pages

---

## 1. Executive Summary

| Area | Score | One-line verdict |
|------|-------|-----------------|
| A. Crawl & Indexation | 6/10 | No og-image.png, no trailing-slash policy, no `_headers`, sitemap missing `<lastmod>` |
| B. On-page metadata | 6/10 | 3 titles too long, 3 descriptions too long, 1 description too short; OG tags use layout defaults on every page |
| C. Keyword strategy | 7/10 | Homepage perfectly aimed; 4 posts cover key long-tails; cannibalization risk is low but real |
| D. Structured data | 7/10 | Valid FAQPage + WebSite + BlogPosting + Breadcrumb; `og:type` should be `article` on posts |
| E. Social previews | 4/10 | `og-image.png` **does not exist** in `public/`; all OG/Twitter tags use layout-level defaults, not page-specific |
| F. Content & E-E-A-T | 6/10 | Posts are solid but thin on word count; "100% Vector" and "150 DPI" claims need caveats; no named author |
| G. Performance / CWV | 6/10 | pdf-lib is dynamically split but the 447 KB chunk is not preloaded; no `_headers` for caching; cdnjs third-party dep |
| H. Mobile & Accessibility | 7/10 | Viewport set, 44px tap targets, good labels; minor colour contrast gap; no `<link rel="manifest">` in HTML |
| I. Internal linking | 8/10 | Excellent mesh between blog posts; footer covers all routes; external links use `noopener noreferrer` |
| J. Off-page & measurement | 4/10 | No GSC/Bing checklist in place; zero backlink signals yet (new site) |
| K. Risks | 7/10 | One false UI claim ("Enable Maximum Compression" checkbox); privacy policy references AdSense not yet wired |

### Top 5 Highest-Impact Actions

1. **Create `public/og-image.png`** — currently missing; every page shows a broken social card. (Critical)
2. **Fix the 3 over-length titles and 3 over-length descriptions** — these are exactly the Ahrefs issues. (High)
3. **Add `public/_headers`** — enable long-term caching for hashed assets and `noindex` for `/_next/` to prevent duplicate crawling. (High)
4. **Set page-specific `og:title` and `og:description`** in each page's metadata export — every page currently inherits the layout-level OG defaults. (High)
5. **Add `<lastmod>` to sitemap.xml** and add trailing-slash consistency (`trailingSlash: true` in `next.config.mjs`). (Medium)

### What Is Already Good

- **Canonical URLs**: Correct absolute canonicals on every page (verified in `dist/` HTML). No noindex leaks.
- **Robots.txt**: Clean, accessible, correct sitemap pointer. `/cdn-cgi/` disallow not needed (Cloudflare obfuscation is off).
- **JSON-LD**: FAQPage, WebSite, BlogPosting, BreadcrumbList all valid and truthful.
- **Internal links**: Posts link to each other and back to homepage; footer is comprehensive.
- **Privacy / trust**: Clear privacy-first messaging; no fake reviews or inflated claims (one caveat below).
- **Keyword focus**: Homepage H1 is literally "Compress PDF Online" — exact-match domain advantage fully exploited.
- **`pdf-lib` is lazily loaded**: The 447 KB pdf-lib chunk (`15311foq9lq0h.js`) is NOT in the initial page HTML — it is dynamically imported by `import('pdf-lib')` inside `compressPdf()`, triggered only on actual use. ✅

---

## 2. Findings Table

| ID | Area | Issue | Evidence | Severity | Why It Matters | Effort | Recommended Fix |
|----|------|-------|----------|----------|----------------|--------|-----------------|
| F-01 | A | `og-image.png` missing from `public/` | `public/` listing — no file; referenced as `/og-image.png` in `layout.js:36` | **Critical** | Every page shows a broken social card on Twitter/LinkedIn/WhatsApp; Google also previews OG images | S | Create a 1200×630 PNG at `public/og-image.png` |
| F-02 | A | No `public/_headers` file | Directory listing confirms absence | **High** | Hashed assets (`_next/static/chunks/*.js`) served without long-term cache; Google can re-crawl them unnecessarily | M | Add `_headers` with immutable cache for `/_next/static/*` |
| F-03 | A | No trailing-slash policy configured | `next.config.mjs` has no `trailingSlash` option; Cloudflare Pages serves both `/blog` and `/blog/` — the `.html` file approach creates a 200 on both, which can split link equity | **Medium** | Duplicate page signal, split PageRank | S | Add `trailingSlash: true` to `next.config.mjs`; update sitemap URLs to include trailing slash |
| F-04 | A | Sitemap has no `<lastmod>` tags | `public/sitemap.xml` lines 3-43 | **Medium** | Google prioritises recrawl of pages with accurate lastmod; hand-written sitemap will go stale | S | Add `<lastmod>2026-10-14</lastmod>` to all URLs; update when content changes |
| F-05 | A | `www.compresspdf.online` returns HTTP 200 (no redirect) | Verified via `Invoke-WebRequest` — both `compresspdf.online` and `www.compresspdf.online` return 200 | **Medium** | Two versions of the site indexed = duplicate content + split PageRank; canonical tag on each page points to non-www, which mitigates but does not fully resolve it | S | Configure Cloudflare redirect rule: `www` → apex, 301 |
| F-06 | A | `<link rel="manifest">` missing from HTML | `index.html` has no manifest link; `public/manifest.json` exists but is not linked | **Low** | PWA/install prompt won't work; minor trust signal lost | S | Add `<link rel="manifest" href="/manifest.json">` in `layout.js` `<head>` |
| F-07 | A | `manifest.json` has only a 16×16 favicon as icon | `public/manifest.json` lines 10-14: `favicon.png` at `16x16` | **Low** | PWA icon on Android home screen will be tiny/broken; `icon-192.png` and `icon-512.png` exist in public but are unused in manifest | S | Update `manifest.json` to reference `icon-192.png` and `icon-512.png` |
| F-08 | A | No custom 404 page | Build produces `dist/404.html` via Next.js `_not-found` — this is the default Next.js not-found; check it has navigation back to homepage | **Low** | Poor UX on mistyped URLs | S | Verify `src/app/not-found.js` exists and has header/footer; if using default only, create one |
| F-09 | B | Blog post title too long: Post1 (64 chars) | `src/app/blog/how-to-compress-pdf-file-size/page.js:6` | **High** | Will be truncated in SERPs at ~60 chars; Google rewrites it | S | See proposed title in §3 |
| F-10 | B | Blog post title too long: Post3 (72 chars) | `src/app/blog/how-to-compress-pdf-on-iphone/page.js:6` | **High** | Severely truncated | S | See proposed title in §3 |
| F-11 | B | Blog post title too long: Post4 (67 chars) | `src/app/blog/compress-pdf-without-adobe-acrobat/page.js:6` | **High** | Will be truncated | S | See proposed title in §3 |
| F-12 | B | Description too long: Post1 (157 chars) | `src/app/blog/how-to-compress-pdf-file-size/page.js:8-9` | **High** | Truncated at ~155 chars in SERPs | S | See proposed description in §3 |
| F-13 | B | Description too long: Post2 (174 chars) | `src/app/blog/how-to-compress-a-pdf-on-mac/page.js:8-9` | **High** | 19 chars over limit | S | See proposed description in §3 |
| F-14 | B | Description too long: Post3 (162 chars) | `src/app/blog/how-to-compress-pdf-on-iphone/page.js:8-9` | **High** | 7 chars over limit | S | See proposed description in §3 |
| F-15 | B | Description too short: Terms (54 chars) | `src/app/terms/page.js:7` | **Medium** | Too short; Google will pull random text from page instead | S | See proposed description in §3 |
| F-16 | B | All OG tags inherit layout defaults, not page content | Verified in all `dist/*.html` — `og:title` = `"Compress PDF Online – Reduce Size Privately in Browser"` and `og:description` = default on every page | **High** | When a blog post is shared on social media, the OG card shows the homepage blurb, not the article content. This reduces click-through from social. | S | Add per-page `openGraph.title` and `openGraph.description` in each page's `metadata` export |
| F-17 | B | `og:type` is `"website"` on blog posts | `layout.js:29` sets `type: 'website'` globally; individual post metadata does not override | **Medium** | Blog posts should be `"article"` for correct Open Graph representation | S | Add `openGraph: { type: 'article', ... }` in each blog post's metadata |
| F-18 | B | Homepage title contains em-dash rendered as `–` | `dist/index.html` title rendered as garbled `Compress PDF Online Free â€" Reduce PDF Size to 200KB or Less` in raw bytes | **Medium** | The em-dash in `defaultTitle` is a Unicode character. **VERIFIED**: in the actual browser-served HTML it renders correctly (`–`). The display in the raw PowerShell output was a Windows encoding artefact. **NOT A BUG** — mark as verified OK. | — | No action needed |
| F-19 | C | Potential cannibalization: homepage vs. blog/how-to-compress-pdf-file-size | Both target "compress pdf to 200KB"; homepage converts, post informs | **Low** | Google may pick the post over the homepage for informational queries | S | Differentiate intent: homepage = tool ("do it now"), post = guide ("learn how"). Already done well, but add a stronger CTA differentiator. |
| F-20 | D | `BlogPosting` schema uses `Organization` as author, not `Person` | All 4 blog posts, e.g. `src/app/blog/how-to-compress-pdf-file-size/page.js:28-32` | **Low** | Google prefers `Person` for byline rich results; `Organization` is valid but weaker for E-E-A-T signals | M | Create an author page and use `Person` schema with `name`, `url`, `sameAs` |
| F-21 | D | `BlogPosting` schema missing `image` property | All blog posts lack `image` in JSON-LD | **Low** | Google requires `image` for BlogPosting rich results; without it, no article snippet in SERPs | S | Add `image: 'https://compresspdf.online/og-image.png'` to each `BlogPosting` |
| F-22 | E | `og-image.png` referenced but not present | `public/` directory listing | **Critical** | Social cards broken sitewide | S | Create the image (see F-01) |
| F-23 | F | "Allow maximum compression if needed" checkbox claimed in blog post doesn't exist in the tool | `src/app/blog/how-to-compress-pdf-file-size/page.js:170` says "Check the box labeled 'Allow maximum compression if needed'" — no such checkbox exists in `CompressPdfTool.jsx` | **High** | Inaccurate UI claim; hurts trust and helpful-content score | S | Remove the checkbox reference; replace with accurate description of how the raster fallback is automatic |
| F-24 | F | "100% Vector" pill may mislead on Extreme mode | `src/app/page.js:206` displays "100% Vector" badge. In Extreme mode, the tool will rasterize pages (canvas → JPEG), destroying vector text. Low and Recommended modes preserve vectors. | **High** | If a user applies Extreme compression and then sees "100% Vector" on the homepage, they may believe text was preserved when it wasn't | S | Add a qualifier: "100% Vector (Low & Recommended)" or move badge inside the Low/Recommended preset description |
| F-25 | F | "98% reduction" and "14.2 MB → 184 KB" example is correct but context-free | `src/app/page.js:122-136` — verified achievable on scanned phone-photo PDFs, not on digital text PDFs | **Medium** | Users with small text-only PDFs may be confused/disappointed. Potentially a helpful-content flag. | S | Add sub-caption: "Example: scanned phone camera PDF" |
| F-26 | F | Blog posts have no named author and no published date visible in structured data `@type: Person` | All 4 posts use `author: { '@type': 'Organization' }` | **Medium** | E-E-A-T: a faceless organization authoring PDf advice has lower authority than a named expert or team | M | Add an author page; reference it from BlogPosting schema |
| F-27 | F | Privacy policy mentions Google AdSense but no AdSense script is present in the codebase | `src/app/privacy-policy/page.js:38` — no AdSense `<script>` found in layout.js or any other file | **Medium** | If AdSense is planned but not yet live, the policy is premature and could confuse users; if it was removed, update the policy | S | If AdSense not active: replace that section with a general "third-party analytics" note; add AdSense section back when live |
| F-28 | G | pdf-lib (447 KB chunk) is lazy-loaded correctly but NOT preloaded with `<link rel="modulepreload">` | `dist/index.html` — no `modulepreload` for `15311foq9lq0h.js` | **Medium** | When user drops a file, there is a latency hit while the 447 KB chunk downloads before `import('pdf-lib')` resolves. `preloadEngine()` is called on file hover but only triggers `import('pdf-lib')` not `pdf.js`. | S | Add `<link rel="modulepreload" href="/_next/static/chunks/15311foq9lq0h.js">` in `layout.js` (or use Next.js `next/script` with `strategy="lazyOnload"` after interaction) |
| F-29 | G | No `public/_headers` — static assets served without long-term cache headers | Cloudflare Pages requires `public/_headers` for custom headers | **High** | Without `Cache-Control: max-age=31536000, immutable` on hashed chunks, CDN may not cache them permanently, increasing latency | S | Add `public/_headers` (see §6) |
| F-30 | G | pdf.js (pdfjs-dist) loaded from cdnjs at runtime | `src/components/CompressPdfTool.jsx:521` — `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js` | **Medium** | Third-party CDN dependency: if cdnjs is down or slow, raster compression silently fails. Also a privacy/SRI concern. | L | Bundle pdf.js locally or use `integrity` attribute for SRI; add error handling already in place (PDFJS_OFFLINE) — good |
| F-31 | G | No SRI (Subresource Integrity) on cdnjs script | `CompressPdfTool.jsx:521` | **Low** | Without `integrity=""`, the script can be tampered with by CDN; Cloudflare mitigates this somewhat | M | Add `crossOrigin="anonymous" integrity="sha384-..."` when loading pdf.js |
| F-32 | H | No `<link rel="manifest">` in HTML head | `dist/index.html` — no manifest link tag | **Low** | See F-06 | S | See F-06 |
| F-33 | H | `favicon.png` is 146 bytes — likely a 1×1 placeholder | `public/favicon.png` size = 146 bytes (same as `favicon.ico`) — far too small for a real favicon | **Medium** | Browsers will show a blank or broken favicon tab icon | S | Replace with a proper 32×32 PNG favicon |
| F-34 | I | Footer links to `mainSiteUrl` (onlinepdflab.app) without `rel="noopener noreferrer"` — wait, it IS using `noopener noreferrer` | `layout.js:162, 172, 177, 182` — all use `rel="noopener noreferrer"` ✅ | — | Already correct | — | No action |
| F-35 | J | No GSC or Bing Webmaster Tools setup confirmed | Not detectable from code | **High** | Without GSC, no visibility into indexation errors, coverage, or rich result eligibility | S | Submit sitemap to GSC; verify domain property |
| F-36 | A | Ahrefs "page has links to redirect" — internal links point to `onlinepdflab.app` which redirects | `layout.js` footer links to `https://onlinepdflab.app` — if that domain redirects (e.g., to `www.onlinepdflab.app`), Ahrefs flags it | **Medium** | Slight crawl inefficiency; not a ranking issue but Ahrefs flags it | S | Verify the final destination URL of `onlinepdflab.app` and link directly to it; or accept it as external |
| F-37 | A | `distDir: 'dist'` differs from default `out` | `next.config.mjs:4` — Cloudflare Pages build output directory must be set to `dist` in Pages settings | **Low** | If Pages is still configured for `out/`, the deployment would deploy an empty dir. **Assumption**: Cloudflare Pages is configured to match. Verify in CF dashboard. | S | Confirm Cloudflare Pages "Build output directory" = `dist` |

---

## 3. Page-by-Page Metadata Table

> Lengths in parentheses. Rule of thumb: title ≤ 60 chars, description 120–155 chars.

| URL | Current Title (len) | Current Description (len) | Proposed Title | Proposed Description | Target Keyword |
|-----|----|----|---|---|---|
| `/` | Compress PDF Online Free – Reduce PDF Size to 200KB or Less (59) ✅ | Compress PDF files in your browser. Get under 200KB or 100KB for job portals, visa applications, and email with no server uploads. (130) ✅ | *(keep)* | *(keep)* | compress pdf online |
| `/about` | About Us – Compress PDF Online (30) ✅ | Why we built Compress PDF Online: a fast, client-side in-browser PDF compressor that runs completely on your own device hardware. (129) ✅ | About – Compress PDF Online Free | Why we built a free in-browser PDF compressor: zero server uploads, no account, runs entirely on your device. Compress any PDF privately. | about / brand |
| `/contact` | Contact Us – Compress PDF Online (32) ✅ | Contact the team behind Compress PDF Online. Reach out for technical support, error reports on specific PDF files, or business inquiries. (137) ✅ | *(keep)* | *(keep)* | brand |
| `/blog` | PDF Optimization Guides & Tutorials – Compress PDF Online (57) ✅ | Practical, engineering-focused guides on reducing PDF file sizes across macOS, iOS, Windows, and web browsers without paying for expensive subscriptions. (153) ✅ | *(keep)* | *(keep)* | pdf compression guides |
| `/privacy-policy` | Privacy Policy – Compress PDF Online (36) ✅ | Privacy policy for Compress PDF Online. Plain English explanation of how our local file tool works and how cookies are handled. (127) ✅ | *(keep)* | *(keep)* | — |
| `/terms` | Terms of Service – Compress PDF Online (38) ✅ | Simple terms of service for using Compress PDF Online. (54) ❌ SHORT | *(keep)* | **Terms of service for Compress PDF Online – our free in-browser PDF compressor. No server uploads, no account required. Read our usage policy.** (148) | — |
| `/blog/how-to-compress-pdf-file-size` | How to Compress a PDF to Under 200KB or 100KB for Upload Portals (64) ❌ LONG | Need to meet strict 200KB or 100KB upload limits for job portals and visa applications? Learn how to compress vector documents and scanned paperwork cleanly. (157) ❌ LONG | **How to Compress a PDF to Under 200KB or 100KB** (49) | Meet strict portal limits: compress PDF to 200KB or 100KB for job applications and visa forms. Works on scanned and digital documents. (134) | compress pdf to 200kb |
| `/blog/how-to-compress-a-pdf-on-mac` | How to Compress a PDF on Mac Without Preview Blurring Text (58) ✅ | Learn how to compress PDF documents on macOS without losing typography clarity. Understand why Apple Preview Quartz filter degrades text and how to optimize cleanly for free. (174) ❌ LONG | *(keep)* | **Compress a PDF on Mac without blurry text. Learn why Apple Preview's Quartz filter degrades fonts and how to shrink files cleanly using Safari.** (149) | compress pdf on mac |
| `/blog/how-to-compress-pdf-on-iphone` | How to Shrink a PDF on iPhone and iPad Free (No App Store Subscriptions) (72) ❌ LONG | Reduce PDF file size on iOS without paying for weekly App Store subscriptions. Learn how to use mobile Safari local processing and native Files app Quick Actions. (162) ❌ LONG | **How to Compress a PDF on iPhone and iPad for Free** (51) | **Shrink PDF files on iOS without App Store subscriptions. Use mobile Safari or the Files app Quick Actions to compress PDFs free on iPhone and iPad.** (152) | compress pdf on iphone |
| `/blog/compress-pdf-without-adobe-acrobat` | How to Compress a PDF Without Adobe Acrobat Pro (Free Alternatives) (67) ❌ LONG | Stop paying $20/month for Adobe Acrobat Pro subscriptions. Compare Adobe cloud sign-in walls against free, zero-upload in-browser PDF compression. (146) ✅ | **How to Compress a PDF Without Adobe Acrobat (Free)** (52) | *(keep)* | compress pdf without adobe acrobat |

---

## 4. Keyword-to-Page Map + New Guide Ideas

### Current Keyword-to-Page Map

| Keyword | Intent | Current Page | Notes |
|---------|--------|-------------|-------|
| compress pdf online | Transactional | `/` (homepage) | Perfect fit — exact-match domain + H1 |
| free pdf compressor | Transactional | `/` | Captured via page content; add to title as "Free" is already there |
| reduce pdf file size | Transactional/Informational | `/` + `/blog/how-to-compress-pdf-file-size` | Split — homepage converts, post educates; low cannibalization risk |
| compress pdf to 200kb | Transactional | `/blog/how-to-compress-pdf-file-size` | Good dedicated page |
| compress pdf to 100kb | Transactional | `/blog/how-to-compress-pdf-file-size` | Same page — fine |
| compress pdf for email | Transactional | `/` (implied) | No dedicated page — homepage `subLabel` mentions "Best for email & sharing" — sufficient |
| compress pdf on mac | Informational | `/blog/how-to-compress-a-pdf-on-mac` | Good dedicated page |
| compress pdf on iphone | Informational | `/blog/how-to-compress-pdf-on-iphone` | Good dedicated page |
| compress pdf without adobe acrobat | Informational | `/blog/compress-pdf-without-adobe-acrobat` | Good dedicated page |

### 10 New Guide Ideas (realistic for a low-authority domain)

These are long-tail, low-competition informational queries that a new domain can realistically win by providing genuinely helpful, specific content.

| # | Target Keyword | Search Intent | Difficulty (Estimate) | Suggested H2 Outline |
|---|---------------|--------------|----------------------|---------------------|
| 1 | **compress pdf on windows** | Informational | Low–Medium | What is the size limit? › Method 1: Edge browser built-in › Method 2: compresspdf.online in Chrome › Method 3: PowerShell PDF compression (for developers) |
| 2 | **compress pdf on android** | Informational | Low | Why Android lacks a native compressor › Method 1: Chrome mobile (compresspdf.online) › Method 2: Google Drive "Reduce file size" quirks › Method 3: Files by Google |
| 3 | **compress pdf for email attachment** | Transactional/Informational | Medium | Email attachment limits by provider (Gmail 25 MB, Outlook 20 MB, Yahoo 25 MB) › Why PDFs with scanned images hit limits › How to compress to under 10 MB in one step |
| 4 | **why is my pdf so large** | Informational | Low | Understanding embedded images vs. vector text › Camera scans explained › Metadata bloat › Hidden layers and revision history |
| 5 | **compress pdf without losing quality** | Informational | Medium | What "quality" means in PDFs (DPI, vector integrity) › When lossy is acceptable › Low vs. Recommended vs. Extreme preset guide |
| 6 | **compress pdf for google drive** | Transactional | Low–Medium | Google Drive storage limits › Why Drive doesn't shrink PDFs › How to compress before uploading › Alternative: Google Drive "Reduce size" via Docs |
| 7 | **how to compress a scanned pdf** | Informational | Low | Why scanned PDFs are huge › DPI and megapixel explanation › How raster fallback compression works › Grayscale vs. colour scans |
| 8 | **compress pdf on chromebook** | Informational | Very Low | ChromeOS limitations › Using Chrome browser tool › Using Android app alternatives (and their risks) |
| 9 | **compress pdf without internet** | Informational | Low | When you need offline compression › Python `pikepdf` guide for developers › macOS Automator script › Windows PDF printer |
| 10 | **pdf file size limit for jobs application** | Informational | Very Low | Workday limit (2–5 MB) › Taleo/Oracle HCM limits › Government portals (200 KB) › Immigration forms (300 KB) › How to check what limit your portal uses |

> **Note on search volumes**: No volume numbers are given as I have no access to live keyword tools. Estimates labeled "Low/Medium" are based on query specificity and competition inferred from the competitor landscape. Treat as directional.

---

## 5. Prioritized Roadmap

### Do Today (< 2 hours)

1. **[F-01 / F-22] Create `public/og-image.png`** (1200×630 px)
   - Design: dark background, compresspdf.online wordmark, tagline, PDF icon
   - Use Figma, Canva, or generate programmatically

2. **[F-09 / F-10 / F-11] Shorten the 3 over-length titles** — copy the proposed titles from §3 into each page's `metadata` export

3. **[F-12 / F-13 / F-14 / F-15] Fix the 3 over-length and 1 too-short descriptions** — use the proposed descriptions from §3

4. **[F-23] Remove the false "checkbox" reference** in `src/app/blog/how-to-compress-pdf-file-size/page.js:170`

### This Week (< 1 day total)

5. **[F-16] Add per-page OG title and description** to every page's `metadata` export so social cards show relevant text

6. **[F-17] Set `og:type: 'article'`** in all 4 blog post metadata exports

7. **[F-29 / F-02] Add `public/_headers`** — full file provided in §6

8. **[F-03] Add `trailingSlash: true`** to `next.config.mjs` and update `public/sitemap.xml` with trailing slashes

9. **[F-04] Add `<lastmod>`** to all sitemap URLs

10. **[F-05] Configure Cloudflare redirect rule**: `www.compresspdf.online/*` → `https://compresspdf.online/$1` (301)

11. **[F-06] Add manifest link** to `layout.js`

12. **[F-07] Fix `manifest.json`** to include proper icons

13. **[F-27] Update Privacy Policy** to accurately reflect what third-party scripts are actually loaded

14. **[F-33] Replace placeholder `favicon.png`** with a real 32×32 icon

### This Month

15. **[F-24] Add qualifying copy** to the "100% Vector" badge — clarify it applies to Low/Recommended presets

16. **[F-25] Add context caption** to the 14.2 MB → 184 KB example

17. **[F-21] Add `image` to BlogPosting schema** in all 4 posts

18. **[F-28] Add `rel="modulepreload"`** hint for pdf-lib chunk to reduce compression latency

19. **[J] Set up Google Search Console** — verify domain, submit `https://compresspdf.online/sitemap.xml`

20. **[J] Set up Bing Webmaster Tools** — submit sitemap

21. **[F-26] Create an Author/Team page** and wire `Person` schema into BlogPosting

22. **Write 2–3 of the new guide posts** from §4 (start with "compress pdf on windows" and "compress pdf for email")

---

## 6. Ready-to-Paste Code

> All snippets are reference implementations. **Do not apply them** — review and deploy manually.

---

### 6.1 `public/og-image.png`
Create a 1200×630 PNG. Suggested design spec:
```
Background: #0f172a (slate-950)
Primary text: "compresspdf.online" in white, 72px, bold
Subtitle: "Compress PDF Online – Free, Private, In-Browser" in #94a3b8, 32px
Accent: Emerald green (#10b981) progress bar graphic
```
*(No code snippet — create in design tool of choice.)*

---

### 6.2 `src/lib/siteConfig.js` — no changes needed

---

### 6.3 `next.config.mjs` — add `trailingSlash`

**File:** `next.config.mjs`
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  trailingSlash: true,   // ← add this
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

---

### 6.4 `public/_headers` — Cloudflare Pages caching + security

**File:** `public/_headers`
```
# Immutable cache for content-hashed Next.js static assets
/_next/static/*
  Cache-Control: public, max-age=31536000, immutable

# Fonts
/_next/static/media/*
  Cache-Control: public, max-age=31536000, immutable

# HTML pages – short cache, stale-while-revalidate
/*
  Cache-Control: public, max-age=0, must-revalidate
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
```

---

### 6.5 `public/sitemap.xml` — add `<lastmod>` and trailing slashes

**File:** `public/sitemap.xml`
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://compresspdf.online/</loc>
    <lastmod>2026-10-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://compresspdf.online/about/</loc>
    <lastmod>2026-10-14</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://compresspdf.online/contact/</loc>
    <lastmod>2026-10-14</lastmod>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://compresspdf.online/blog/</loc>
    <lastmod>2026-10-14</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://compresspdf.online/blog/how-to-compress-pdf-file-size/</loc>
    <lastmod>2026-10-14</lastmod>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://compresspdf.online/blog/how-to-compress-a-pdf-on-mac/</loc>
    <lastmod>2026-10-14</lastmod>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://compresspdf.online/blog/how-to-compress-pdf-on-iphone/</loc>
    <lastmod>2026-10-14</lastmod>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://compresspdf.online/blog/compress-pdf-without-adobe-acrobat/</loc>
    <lastmod>2026-10-14</lastmod>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://compresspdf.online/privacy-policy/</loc>
    <lastmod>2026-10-14</lastmod>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>https://compresspdf.online/terms/</loc>
    <lastmod>2026-10-14</lastmod>
    <priority>0.4</priority>
  </url>
</urlset>
```
> Note: Remove `/about` and add the `trailingSlash` versions after enabling `trailingSlash: true` in next.config.mjs. Also drop `<changefreq>` on static pages — it is largely ignored by Google.

---

### 6.6 `src/app/layout.js` — add manifest link + fix OG template

**Add inside the `<head>` block** (around line 64):
```jsx
<link rel="manifest" href="/manifest.json" />
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
<link rel="icon" href="/favicon.png" sizes="32x32" type="image/png" />
<link rel="apple-touch-icon" href="/icon-192.png" />
```

**The `metadata` export in `layout.js`** does not need a per-page OG override — instead, add `openGraph` and `twitter` to each page's own `metadata` export (see 6.7–6.9).

---

### 6.7 `src/app/terms/page.js` — fix short description

**Replace:**
```js
export const metadata = {
  title: {
    absolute: `Terms of Service – ${siteName}`,
  },
  description: `Simple terms of service for using ${siteName}.`,
```
**With:**
```js
export const metadata = {
  title: {
    absolute: `Terms of Service – ${siteName}`,
  },
  description: `Terms of service for ${siteName} – our free in-browser PDF compressor. No server uploads, no account required. Read our usage policy.`,
```

---

### 6.8 Blog post: `/blog/how-to-compress-pdf-file-size/page.js`

**Replace the metadata export:**
```js
export const metadata = {
  title: {
    absolute: 'How to Compress a PDF to Under 200KB or 100KB',
  },
  description:
    'Meet strict portal limits: compress PDF to 200KB or 100KB for job applications and visa forms. Works on scanned and digital documents, free in-browser.',
  alternates: {
    canonical: `${siteUrl}/blog/how-to-compress-pdf-file-size`,
  },
  openGraph: {
    title: 'How to Compress a PDF to Under 200KB or 100KB',
    description:
      'Meet strict portal limits: compress PDF to 200KB or 100KB for job applications and visa forms. Free, no uploads.',
    url: `${siteUrl}/blog/how-to-compress-pdf-file-size`,
    type: 'article',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Compress a PDF to Under 200KB or 100KB',
    description: 'Meet strict portal limits free, no server uploads.',
    images: ['/og-image.png'],
  },
};
```
**Also remove the incorrect UI claim** on line 170 — replace:
```jsx
{/* OLD — remove this entire li */}
<li>
  <strong>Enable Maximum Compression Fallback:</strong> Check the box labeled <em>&quot;Allow maximum compression if needed&quot;</em>. If stubborn embedded font subsets or non-standard color profiles prevent the vector engine from reaching 200 KB, the engine switches to a raster fallback pass, rebuilding pages as web-optimized images.
</li>
```
**With:**
```jsx
<li>
  <strong>Automatic Raster Fallback:</strong> If the vector compression pass cannot shrink the file below 200 KB (for example, with scanned documents that have no compressible images), the tool automatically falls back to a raster rebuild pass — rendering each page to a JPEG canvas — to hit the size target.
</li>
```

---

### 6.9 Blog post: `/blog/how-to-compress-a-pdf-on-mac/page.js`

**Replace the metadata export:**
```js
export const metadata = {
  title: {
    absolute: 'How to Compress a PDF on Mac Without Preview Blurring Text',
  },
  description:
    'Compress a PDF on Mac without blurry text. Learn why Apple Preview\'s Quartz filter degrades fonts and how to shrink files cleanly using Safari.',
  alternates: {
    canonical: `${siteUrl}/blog/how-to-compress-a-pdf-on-mac`,
  },
  openGraph: {
    title: 'How to Compress a PDF on Mac Without Preview Blurring Text',
    description:
      'Fix blurry Mac PDFs. Learn why Apple Preview degrades fonts and compress cleanly for free.',
    url: `${siteUrl}/blog/how-to-compress-a-pdf-on-mac`,
    type: 'article',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compress PDF on Mac Without Blurry Text',
    description: 'Fix Apple Preview font degradation – compress cleanly in Safari.',
    images: ['/og-image.png'],
  },
};
```

---

### 6.10 Blog post: `/blog/how-to-compress-pdf-on-iphone/page.js`

**Replace the metadata export:**
```js
export const metadata = {
  title: {
    absolute: 'How to Compress a PDF on iPhone and iPad for Free',
  },
  description:
    'Shrink PDF files on iOS without App Store subscriptions. Use mobile Safari or the Files app Quick Actions to compress PDFs free on iPhone and iPad.',
  alternates: {
    canonical: `${siteUrl}/blog/how-to-compress-pdf-on-iphone`,
  },
  openGraph: {
    title: 'How to Compress a PDF on iPhone and iPad for Free',
    description:
      'No App Store subscriptions. Compress PDFs free on iOS using Safari or Files app Quick Actions.',
    url: `${siteUrl}/blog/how-to-compress-pdf-on-iphone`,
    type: 'article',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compress PDF on iPhone Free – No App Store',
    description: 'Shrink PDFs in Safari on iOS without subscriptions.',
    images: ['/og-image.png'],
  },
};
```

---

### 6.11 Blog post: `/blog/compress-pdf-without-adobe-acrobat/page.js`

**Replace the metadata export:**
```js
export const metadata = {
  title: {
    absolute: 'How to Compress a PDF Without Adobe Acrobat (Free)',
  },
  description:
    'Stop paying $20/month for Adobe Acrobat Pro. Compare Adobe cloud sign-in walls against free, zero-upload in-browser PDF compression.',
  alternates: {
    canonical: `${siteUrl}/blog/compress-pdf-without-adobe-acrobat`,
  },
  openGraph: {
    title: 'How to Compress a PDF Without Adobe Acrobat (Free)',
    description:
      'Skip the $20/month Adobe subscription. Compress PDFs free, no cloud uploads required.',
    url: `${siteUrl}/blog/compress-pdf-without-adobe-acrobat`,
    type: 'article',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compress PDF Without Adobe Acrobat (Free)',
    description: 'No subscription, no cloud uploads. Compress PDFs free in your browser.',
    images: ['/og-image.png'],
  },
};
```

---

### 6.12 `public/manifest.json` — fix icons

```json
{
  "name": "Compress PDF Online",
  "short_name": "CompressPDF",
  "description": "Free in-browser PDF compressor. Reduce file size without server uploads.",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#0f172a",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

---

### 6.13 `src/app/page.js` — qualify the "100% Vector" badge context

On page.js line 204–207, replace the "100% Vector" floating pill:
```jsx
{/* Floating Pill: 100% Vector - with qualifier */}
<div className="absolute top-4 left-4 z-20 inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-bold text-slate-800 shadow-2xs">
  <span className="h-2 w-2 rounded-full border-2 border-slate-800" />
  <span>100% Vector (Low &amp; Recommended)</span>
</div>
```

On page.js line 122, add a caption under the "14.2 MB → 184 KB" example:
```jsx
<span className="text-[11px] font-medium text-slate-500 block">
  Original
</span>
{/* Add this: */}
<span className="text-[9px] text-slate-400 block">Scanned phone PDF</span>
```

---

### 6.14 `src/app/privacy-policy/page.js` — update AdSense section

If AdSense is not currently active, replace section 2 with:
```jsx
<section>
  <h2 className="text-base font-bold text-slate-900 mb-2">2. Analytics and Advertising</h2>
  <p>
    To keep this website free, we may use anonymous analytics and advertising services.
    Third-party partners may use cookies to serve ads based on your browsing history.
    You can opt out of personalised advertising at{' '}
    <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer"
       className="text-green-700 font-medium underline">
      Google Ad Settings
    </a>.
  </p>
  <p className="mt-2">
    We will update this section with specific service names as they are added.
  </p>
</section>
```

---

### 6.15 BlogPosting JSON-LD — add `image` property

In each blog post, add `image` to `articleJsonLd`:
```js
const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: guideTitle,
  description: guideDescription,
  image: `${siteUrl}/og-image.png`,   // ← add this line
  datePublished: '2026-10-14',
  dateModified: '2026-10-14',
  // ... rest unchanged
};
```

---

### 6.16 GSC & Bing Webmaster Tools Setup Checklist

**Google Search Console:**
1. Add property: Domain property `compresspdf.online` (preferred) → verify via DNS TXT record in Cloudflare
2. Submit sitemap: `https://compresspdf.online/sitemap.xml`
3. Monitor: Coverage report weekly; URL Inspection for new posts after deploy
4. Track: Core Web Vitals, rich results (FAQPage), manual actions

**Bing Webmaster Tools:**
1. Import from GSC (easiest) at `https://www.bing.com/webmasters/`
2. Submit sitemap separately
3. Enable IndexNow (Cloudflare has a native IndexNow integration — enable in Cloudflare Search Indexing)

**What to monitor weekly:**
- GSC Coverage: `Excluded` tab — watch for "Discovered, not indexed" creeping up
- GSC Performance: Filter by `/blog/*` — confirm post pages gaining impressions
- GSC Core Web Vitals: LCP target < 2.5s, CLS < 0.1, INP < 200ms

---

### 6.17 Realistic, Non-Spammy Link Building

> New exact-match domain, no existing authority. Focus on earned links only.

1. **Product directories**: Submit to AlternativeTo.net, ProductHunt (as a new launch), Hacker News "Show HN"
2. **Community answers**: Answer PDF questions on Reddit (`r/pdf`, `r/techsupport`, `r/MacOS`) — link only when directly relevant and helpful
3. **Tool roundups**: Reach out to bloggers who write "best free PDF tools" roundups — 5–10 targeted, personalised emails
4. **Blog guest posts**: Write a genuinely useful post on a document-management, remote-work, or student productivity blog; mention the tool in context
5. **Sister-site cross-link**: Ensure `onlinepdflab.app` has a clear, prominent link to `compresspdf.online` on its homepage and tools page — this is the fastest first backlink
6. **Forum signatures**: MacRumors, Reddit tech communities — add as a resource in relevant threads organically

---

## 7. Technical Detail: What Ahrefs Flagged

Based on the Ahrefs issues list provided:

| Ahrefs Issue | Root Cause | Pages Affected | Fix |
|---|---|---|---|
| **3 meta descriptions too long** | Post1 (157), Post2 (174), Post3 (162) | `/blog/how-to-compress-pdf-file-size`, `/blog/how-to-compress-a-pdf-on-mac`, `/blog/how-to-compress-pdf-on-iphone` | Use proposed descriptions in §3 |
| **1 meta description too short** | Terms (54 chars) | `/terms` | Use proposed description in §3 |
| **1 title too long** | Post1 (64), Post3 (72), Post4 (67) — three actual, Ahrefs may be counting differently | See above | Use proposed titles in §3 |
| **Page has links to redirect** | `onlinepdflab.app` likely redirects www→apex or http→https | `layout.js` footer (all pages) | Verify final URL of sister site; link directly to canonical URL |
| **3XX redirect** | Likely `http://compresspdf.online` → `https://` (Cloudflare auto-redirect), or `www` → apex — these are correct 301s and not harmful | Infrastructure level | No action needed if the redirect is http→https; verify it is not an indexable page being redirected |
| **External 3XX redirect** | `onlinepdflab.app` → `www.onlinepdflab.app` or similar | All pages linking to sister site | Update href to the final resolved URL |
| **robots.txt flagged in earlier crawl** | Likely a transient Ahrefs crawl timing issue when the file was being deployed | `public/robots.txt` | Current robots.txt is correct; verify live accessibility at `https://compresspdf.online/robots.txt` ✅ (verified accessible) |

---

## 8. Claims Verification vs. Source Code

| Marketing Claim | Location | Code Verification | Verdict |
|---|---|---|---|
| "No uploads" / "files never leave your computer" | Homepage FAQ, about page | `CompressPdfTool.jsx` — processes entirely via `file.arrayBuffer()` and canvas APIs. No `fetch` to any server for the PDF content. | ✅ **True** |
| "100% Vector" | `page.js:206` | In Low and Recommended modes, `runPass()` only recompresses images via DCTDecode/FlateDecode. Vector/font streams are not touched. In Extreme with raster fallback, pages are rendered to JPEG canvas — vectors ARE destroyed. | ⚠️ **Conditionally true** — add qualifier |
| "150 DPI" | `page.js:211` / blog/mac post | Raster mode uses `scale` values (0.75–1.6) applied to the PDF's native viewport — the effective DPI depends on the source PDF. 150 DPI is a rough approximation, not a guaranteed output. | ⚠️ **Estimate** — qualify |
| "Up to 98% compression" | `page.js:135` | The (-98%) badge is a hardcoded UI example. Actual compression ratio is file-dependent. A digital text PDF may see 0–20% reduction. | ⚠️ **Not always true** — the "Example: scanned phone PDF" caption is needed |
| "14.2 MB → 184 KB" | `page.js:122-132` | A hardcoded UI illustration. Achievable on multi-page scanned phone-camera PDFs. Not achievable on text-only PDFs. | ⚠️ **Needs context caption** |
| "Under 200KB" (Extreme preset) | `CompressPdfTool.jsx:73`, `targetBytes: TARGET_BYTES` | `TARGET_BYTES = 200 * 1024`. The code tries to hit this but has `targetMissed` flag — it cannot guarantee this on all files. | ⚠️ **Best-effort, not guaranteed** — the code correctly exposes `targetMissed`; the UI shows an appropriate warning. OK. |
| "400MB max file size" | `CompressPdfTool.jsx:18`, `MAX_FILE_BYTES = 400 * 1024 * 1024` | ✅ Verified | ✅ **True** |
| "No account, no watermarks" | About page, blog posts | ✅ No auth code, no watermark code found anywhere | ✅ **True** |

---

*End of SEO Audit. All findings are based on source code analysis of `src/`, built HTML in `dist/`, and live HTTP checks performed on 2026-10-17. Competitive SERP analysis was not performed (no live browser access for SERP scraping); that section is omitted rather than fabricated.*
