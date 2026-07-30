# Driftpilot component map

- `layout/` owns site chrome: navigation and footer.
- `shared/` owns reusable page fragments, including heroes, CTA bands, FAQ, JSON-LD, cards, Calendly, and reveal behavior.
- `forms/` owns client form interfaces; server validation and delivery remain in `src/lib/actions/` and `src/lib/`.
- `ui/` owns low-level class recipes and reusable primitives.
- `home/` owns homepage-specific sections.

Keep routing files as composition layers. Do not make components fetch content directly; pages obtain data through accessors and pass it down.
