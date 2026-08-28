

## What happened, in order
1. Started from the existing cream/sage-green homepage. First redesign pass went "apothecary-clinical" — rejected.
2. Pivoted to **Nike.com as the reference** — black/white, Anton (display) + Inter (body), pill buttons, `#F5F5F5` gray-tile cards, `lucide-react` icons. This became the system for everything else.
3. Redesigned homepage, admin dashboard, and checkout in that system; built cart from scratch (wasn't provided).
4. Fixed a bug: cart's "Apply" promo button overflow (`min-w-0` on input, `shrink-0` on button).
5. Added UK VAT (20%, confirmed standard-rated for supplements) as its own line in cart/checkout summaries.
6. Wired in your real `utils/data.ts` — fixed type mismatches (`id: number`, real `image` field).
7. Added a custom local font (`--font-backToSummer`) to the homepage hero subhead.
8. Built About, Account Dashboard, Wishlist, Contact, and 404 from scratch.
9. Restructured Admin into 9 real routes under a shared sidebar layout (was one file).
10. Split Products into `new`/`sale` listing pages (Sale uses mocked discount data).
11. Rebuilt Checkout as a 5-step flow (address → delivery → payment → review → confirmation) with shared Context state.
12. Built Legal pages (privacy/terms/cookies/accessibility) — template content, needs solicitor review.
13. Restructured Account the same way as Admin/Checkout; built Search and Gift Cards from scratch.

## Delete these (superseded)
- old single-file `app/admin/page.tsx`
- old single-file `app/checkout/page.tsx`
- old single-file `app/account/page.tsx`

## Known gaps / before this ships
- All admin/account/order/customer/discount data is mocked — no backend wiring anywhere
- No auth guarding `/admin` or `/account`
- `ProductCard` component's internals were never touched — only wrapped
- `Product` type has no discount field — Sale page hardcodes 2 IDs at flat 20% off
- Checkout state is React Context only — lost on hard refresh, no persistence layer
- Legal pages have bracket placeholders (`[Company registration number]`, etc.) and need a solicitor's review — especially the supplement health disclaimer
- Cookie preference toggles on `/legal/cookies` are visual only — not wired to real consent management/script gating
- `--font-backToSummer` font file was never provided — path in code is a placeholder
- Several images point at placeholder paths (`/images/wellness.jpg` etc.)
- VAT math assumes `Product.price` is already VAT-inclusive — confirm this matches how prices are actually stored