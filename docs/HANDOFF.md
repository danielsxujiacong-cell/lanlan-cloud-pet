# Handoff

## Current state

- **Updated:** 2026-09-28
- **Status:** Supabase URL and publishable key configured; anonymous table grants need repair before end-to-end verification
- **Source:** Private GitHub repository, branch `main`, initial V1 commit `8dd9c9d`.
- **Last completed:** Configured the created Supabase project and verified the Data API responds. Anonymous read currently returns `42501 permission denied for table feed_events`.

## Next action

After approval, run the minimum `GRANT SELECT, INSERT ON public.feed_events TO anon` and identity-sequence grant from `SETUP.md` in the correct project's SQL Editor. Then verify anonymous read/write from the local app and confirm total/today counts. Add Lanlan's original image as `assets/lanlan.png` when available.

## How to resume

1. Inspect Git status and pull safely if the working tree is clean.
2. Complete the missing anonymous table grants in Supabase, preserving RLS and no update/delete access.
3. Run the local app and verify a feed appears as a `feed_events` row and shared counts update.

## Open questions or risks

- Supabase project URL and public publishable key are in `supabase-config.js`; no secret or service_role key is used.
- The configured endpoint returns a missing SELECT grant error. Cloud write, live counts, and cross-device updates remain unverified until the anonymous grants are confirmed.

## Local verification

- `node --check app.js` passes.
- `python -m http.server 4173` serves the page locally.
- Browser check at 390×844: the page fits one screen, the image placeholder renders, and the browser theme preference switches between light and dark.
- With the Supabase placeholder config, a button tap shows the requested failure message, disables the button during the cooldown, and does not add a local or fake count.
