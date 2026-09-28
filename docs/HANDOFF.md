# Handoff

## Current state

- **Updated:** 2026-09-28
- **Status:** V1 connected and verified against the live Supabase project
- **Source:** Private GitHub repository, branch `main`, initial V1 commit `8dd9c9d`.
- **Last completed:** Granted `anon` select/insert on `public.feed_events`; a local button click inserted one real event and both shared counters read 1.

## Next action

No V1 setup remains. Add Lanlan's original image as `assets/lanlan.png` when available; otherwise the built-in blue cat illustration is used.

## How to resume

1. Inspect Git status and pull safely if the working tree is clean.
2. Run `python -m http.server 4173` and open `http://localhost:4173` for local preview.
3. For a future change, verify one anonymous feed insert and total/today count refresh without granting update/delete access.

## Open questions or risks

- Supabase project URL and public publishable key are in `supabase-config.js`; no secret or service_role key is used.
- One live feed event was added as the end-to-end smoke test, so current shared total and today counts are both 1.
- Cross-device refresh is implemented by 10-second polling; the app was verified against the live shared API but not on a second device.

## Local verification

- `node --check app.js` passes.
- `python -m http.server 4173` serves the page locally.
- Browser check at 390×844: the page fits one screen, the image placeholder renders, and the browser theme preference switches between light and dark.
- With the Supabase placeholder config, a button tap shows the requested failure message, disables the button during the cooldown, and does not add a local or fake count.
- With the live Supabase config, local page loaded the shared counts and one button tap changed both total and today's count from 0 to 1.
