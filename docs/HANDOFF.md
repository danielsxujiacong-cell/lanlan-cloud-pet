# Handoff

## Current state

- **Updated:** 2026-09-28
- **Status:** V1 source ready; Supabase project setup remains
- **Last completed:** Built and previewed a mobile-first static page with feed feedback, cloud event insertion, shared counts, and system color scheme support.

## Next action

Create the Supabase project, run the SQL in `SETUP.md`, and enter its Project URL and public anon/publishable key in `supabase-config.js`. Add Lanlan's original image as `assets/lanlan.png` when available.

## How to resume

1. Inspect Git status and pull safely if the working tree is clean.
2. Follow `SETUP.md` to connect Supabase and preview the page.
3. Verify a feed appears as a new `feed_events` row and that shared counts update.

## Open questions or risks

- Supabase credentials/project and the original Lanlan image have not been provided yet.
- Supabase setup, live database insertion, and cross-device count updates remain unverified until the project is configured.

## Local verification

- `node --check app.js` passes.
- `python -m http.server 4173` serves the page locally.
- Browser check at 390×844: the page fits one screen, the image placeholder renders, and the browser theme preference switches between light and dark.
- With the Supabase placeholder config, a button tap shows the requested failure message, disables the button during the cooldown, and does not add a local or fake count.
