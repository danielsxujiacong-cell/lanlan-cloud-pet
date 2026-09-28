# Project context

## Goal

Make a small, friendly, mobile-first page where anyone can feed Lanlan and see shared cloud counts.

## Scope

- In scope: one feed button, an event per successful feed, total and daily counts, subtle feedback, system light/dark mode.
- Out of scope: accounts, rankings, shops, growth systems, and other V2 features.

## Constraints

- Static files only; no build step or framework.
- Supabase is the source of truth. The browser uses only the public anon/publishable key.
- RLS grants anonymous select and insert on `public.feed_events`; no update/delete access.
- Daily count uses the visitor's local timezone. Counts refresh every 10 seconds.
- Original art was not present at project creation; `assets/lanlan.png` is the intended image path.

## Key decisions

| Date | Decision | Reason |
| --- | --- | --- |
| 2026-09-28 | Use static HTML/CSS/JS and Supabase REST | Keep V1 simple to run and deploy |
| 2026-09-28 | Poll shared counts every 10 seconds | Keep all visitors' counts current without a client library |

## Verification

Record local syntax, HTTP, and mobile viewport checks in `docs/HANDOFF.md`.
