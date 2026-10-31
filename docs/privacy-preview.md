# Multilingual privacy policy preview

The website keeps its existing PageShell and site styles. `/privacy` requires an explicit service choice; `/privacy?service=mainland&lang=zh-Hans` and `/privacy?service=persein&lang=en` open a specific variant. Reading language never changes the selected operator. Five languages are available for both operators. Unsupported website languages display English with a visible notice.

Agreed policy source snapshots are in `content/privacy/`. Run `npm run generate:privacy` after editing them; this produces the ten versioned HTML/JSON variants in `public/legal/privacy/v1.0/`. Do not rewrite an already-published legal version; publish a new version for substantive updates. The JSON body is generated from the escaped, repository-owned Markdown, not user content.

`npm run test:privacy` checks routing, operator preservation and language fallback (Node 22.18+ / 24). `npm run build` builds the site. Browser QA additionally covers all ten variants, standalone paths, both viewport sizes, browser Back, retry after a failed request, unsupported-language disclosure, and unchanged home/about appearance.

This branch is for a Vercel preview, not a production-domain promotion. It changes no App consent record, account-deletion implementation or cloud privacy boundary. The supplied text retains feature-activation prerequisites; before production publication, complete the separate factual and technical launch review. The existing /terms route remains outside this privacy-page-only change.
