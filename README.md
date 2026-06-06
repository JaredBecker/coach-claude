# Coach Claude · Knee Rebuild

A single-page tracker for a 12-week patellar-tendon rehab plan with a marathon
baked in at week 5. Tick off exercises, log daily knee pain (level, location,
whether it settled within 24h, run distance, notes), watch the trend, then
export the data as JSON to share back with Coach Claude.

Everything runs client-side. Progress is saved to the browser's `localStorage`
and can be exported / imported as JSON — there is no backend.

## Running it

It's a static site. Open `index.html` directly in a browser, or serve the folder:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

## Project layout

```
index.html        markup + script/style includes
css/styles.css    all styling
js/
  config.js       plan constants, exercise library, 12-week programme, knee zones
  plan.js         date helpers + builds the flat 84-day plan from the config
  state.js        in-memory state + localStorage load/save
  handlers.js     input handlers and widget painters (+ shared painColor)
  render.js       week view, day cards, knee SVG, navigation
  dashboard.js    derived stats and the pain sparkline
  data-io.js      export / import / reset and the shared modal
  app.js          bootstrap — first render
```

The JS files are plain scripts (no bundler) and rely on being loaded in the
order listed in `index.html`; later files depend on globals defined earlier.

## Disclaimer

General training information, **not medical advice**. Keep pain at or under
3/10, settling within 24h. If it climbs or lingers, scale back and check with a
physio.
