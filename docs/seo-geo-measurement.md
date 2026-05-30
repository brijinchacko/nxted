# nxted.ai - SEO & GEO measurement and tracking

This doc tracks how nxted.ai performs in classic search **and** in AI answer
engines (ChatGPT, Claude, Perplexity, Gemini, Grok, Google AI Overviews).
Re-run the query baseline **monthly** and log whether nxted is cited.

---

## 1. Off-site setup (operator actions - do these first)

These cannot be done in code. They are the highest-leverage steps.

1. **Bing Webmaster Tools** - claim `nxted.ai`, submit `https://nxted.ai/sitemap.xml`.
   *This is the single most important GEO action: ChatGPT search uses the Bing index.*
2. **Google Search Console** - claim `nxted.ai` (Domain property), submit the sitemap.
3. **Verification tokens** - put the HTML-tag tokens into the server `.env` as:
   - `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=...`
   - `NEXT_PUBLIC_BING_SITE_VERIFICATION=...`
   then rebuild + restart. The verification `<meta>` tags only render when set.
4. **Analytics** - connect GA4 or a privacy-friendly analytic (e.g. Plausible).
5. **Off-site PR** - pursue inclusion in third-party "best data providers"
   listicles (these are themselves heavily cited by AI engines). Code can't do this.

Live endpoints to confirm after each deploy:
- `https://nxted.ai/sitemap.xml`, `/robots.txt` (AI bots allowed), `/llms.txt`, `/llms-full.txt`

---

## 2. The 30-query baseline

Run each query in **ChatGPT (search), Claude, Perplexity, Gemini, Grok** and
Google (AI Overview). For each, record: is nxted mentioned? cited with a link?
which page? Score 0 (absent) / 1 (mentioned) / 2 (cited with link).

### Cluster A - definitional (top-of-funnel)
1. what is egocentric data
2. what is egocentric data for robotics
3. what is physical AI
4. what is physical AI training data
5. what are vision-language-action (VLA) models
6. what is RLHF
7. human evaluation for AI models
8. why do robots need egocentric data

### Cluster B - commercial / buyer-intent
9. best egocentric data providers for robotics
10. best robotics training data company
11. buy robot manipulation data
12. physical AI data provider
13. humanoid robot training data provider
14. teleoperation data collection company
15. RLHF data provider
16. AI training data company UK
17. Scale AI alternative for robot data
18. Appen alternative for physical AI data
19. physical AI data provider India

### Cluster C - defensible niche (nxted's wedge)
20. industrial manipulation dataset
21. electrical assembly robot training data
22. skilled-trade egocentric data
23. CNC / machine-tending demonstration data
24. consented egocentric data
25. DPDP-compliant AI training data
26. data provenance for robotics datasets
27. EU AI Act training data governance

### Cluster D - technical / how-to
28. LeRobot vs RLDS vs HDF5
29. how to collect egocentric data for robots
30. how to write a robotics data collection spec

---

## 3. Tracking log (copy per month)

| Date | Query # | ChatGPT | Claude | Perplexity | Gemini | Grok | Google AIO | Notes |
|------|---------|---------|--------|------------|--------|------|-----------|-------|
| 2026-MM | 1 | 0 | 0 | 0 | 0 | 0 | 0 | baseline |

Aggregate each month: total cited (score 2) / 30 per engine = "citation share".
Watch the trend, not the absolute - GEO compounds over weeks as engines re-crawl.

---

## 4. What's already shipped (code side)

- Per-page unique titles/descriptions + canonicals; keyword-mapped to the brief.
- `robots.txt` explicitly allows AI crawlers; `sitemap.xml` auto-includes posts.
- JSON-LD: Organization, WebSite, Service (Capture + Expert), Dataset (example),
  Article + BreadcrumbList (posts), FAQPage (home, capture, expert, pricing, trust).
- `/llms.txt` and `/llms-full.txt`.
- Direct-answer blocks + FAQ sections (the units AI engines lift).
- 10 cited, original blog posts (Tier 1 buyer-intent + Tier 2 explainers).
- E-E-A-T: author byline, visible Published/Updated dates, inline citations.

## 5. Backlog (not yet built)

- Tier 3-5 posts (technical/how-to, niche, trend) - ~13 more from the brief.
- Named-founder author page once real chartered-engineer credentials are provided
  (currently attributed to "nxted Research Team").
- Optional: markdown tables in posts (needs `remark-gfm`); a real on-site search
  to justify a WebSite SearchAction.
