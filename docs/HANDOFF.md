# Handoff

## Current state

- **Updated:** 2026-09-28
- **Status:** V1 is live on GitHub Pages; the local sprite update has passed a real Supabase feed check.
- **Source:** Public GitHub repository, branch `main`; GitHub Pages publishes the repository root.
- **Pet art:** Reused the 1536×2288 transparent `graytu-pet` V2 atlas. The webpage animates its 7-frame idle row and 4-frame waving row.
- **Cloud check:** On the local page, one button tap changed both shared counters from 25 to 26. No Supabase settings or client credentials were changed.

## Next action

No additional V1 setup is pending. A push to `main` deploys future page and asset updates.

## How to resume

1. Inspect Git status and pull safely if the working tree is clean.
2. Run `python -m http.server 4173` and open `http://localhost:4173` for local preview.
3. Keep the Supabase browser client on its public Publishable key; never add a `service_role` key.

## Local verification

- `node --check app.js` and `git diff --check` pass.
- The local server on port `4173` serves the page, scripts, styles, sprite atlas, and pet metadata.
- Browser layout check at `390×844`: the real cat, feed button, both counters, and footer fit in one screen.
- One local button click succeeded without a page refresh; both shared Supabase counters incremented from 25 to 26.
