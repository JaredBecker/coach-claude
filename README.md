<!-- ───────────────────────────  BANNER  ─────────────────────────── -->
<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:c95c14,100:ff9a4d&height=200&section=header&text=Coach%20Claude&fontSize=70&fontColor=ffffff&fontAlignY=35&desc=Left%20Knee%20Rebuild%20%C2%B7%20patellar%20tendon%20%C2%B7%2012%20weeks&descAlignY=58&descSize=18" alt="Coach Claude — Knee Rebuild" />
</p>

<!-- ───────────────────────────  BADGES  ─────────────────────────── -->
<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/No%20Build-Static-46d7c4?style=for-the-badge" alt="No build step" />
  <img src="https://img.shields.io/badge/Backend-None-6b7059?style=for-the-badge" alt="No backend" />
</p>

<p align="center">
  <b>A single-page rehab tracker for a 12-week patellar-tendon plan — with a marathon baked in at week 5.</b><br>
  Tick off exercises, log your knee pain, watch the trend, then export the JSON to share back with your coach.
</p>

<p align="center">
  <a href="#-features">Features</a> ·
  <a href="#-quick-start">Quick start</a> ·
  <a href="#-project-layout">Layout</a> ·
  <a href="#-how-it-works">How it works</a> ·
  <a href="#-disclaimer">Disclaimer</a>
</p>

---

## ✨ Features

| | |
|---|---|
| 🗓️ **12-week programme** | Five phases — Settle &amp; Prime → Build → Taper → Race → Recover → Rebuild → Spring &amp; Return — auto-expanded into **84 concrete days**. |
| 🏃 **Marathon baked in** | Race day lands on the Saturday of week 5, with run-walk pacing cues. |
| ✅ **Exercise check-off** | Every set tracked per day, each linked to a YouTube how-to. |
| 🩹 **Rich pain logging** | Level (0–10), a tap-the-map knee location, settled-within-24h, run distance and free-text notes. |
| 📊 **Live dashboard** | Sessions logged, adherence %, week-over-week and session-over-session pain trend, plus a 14-session sparkline. |
| 💾 **Local-first** | Everything saves to `localStorage`. No accounts, no servers, no tracking. |
| 🔁 **Export / Import** | One-click JSON export to paste back to Coach Claude — and import to restore. |

---

## 🚀 Quick start

It's a static site — **no build, no dependencies**. Open it directly, or serve the folder:

```bash
# clone
git clone https://github.com/JaredBecker/coach-claude.git
cd coach-claude

# option A — just open it
start index.html      # Windows
open  index.html      # macOS

# option B — serve it (recommended, avoids file:// quirks)
python -m http.server 8000
# → visit http://localhost:8000
```

---

## 📁 Project layout

```
coach-claude/
├── index.html            # markup + asset includes (entry point)
├── css/
│   └── styles.css        # all styling
└── js/
    ├── config.js         # plan constants · exercise library · 12-week programme · knee zones
    ├── plan.js           # date helpers → builds the flat 84-day PLAN
    ├── state.js          # in-memory state + localStorage load/save
    ├── handlers.js       # input handlers + widget painters (shared painColor)
    ├── render.js         # week view · day cards · knee SVG · navigation
    ├── dashboard.js      # derived stats + the pain sparkline
    ├── data-io.js        # export / import / reset + the shared modal
    └── app.js            # bootstrap — first render
```

> The JS files are plain scripts (no bundler) and load in the order listed in `index.html` — later files depend on globals defined earlier.

---

## 🧠 How it works

```
config.js ──▶ plan.js ──▶ state.js ──▶ handlers.js ──▶ render.js ──▶ dashboard.js ──▶ data-io.js ──▶ app.js
  data        84 days     localStorage   user input      day cards     stats           export/import   bootstrap
```

1. **`config.js`** holds the raw plan — exercise library and the 12 weeks of programming.
2. **`plan.js`** expands that into 84 dated days (`PLAN`), resolving exercises, runs and rest.
3. **`state.js`** loads any saved progress from `localStorage` into `STATE`.
4. **`render.js`** paints the current week's day cards; **`dashboard.js`** derives the headline stats and sparkline.
5. Interacting with a card fires a **`handlers.js`** function → mutates `STATE` → saves → repaints.
6. **`data-io.js`** serialises `STATE` into a tidy JSON export (or restores from one).
7. **`app.js`** kicks off the first render.

---

## 🩻 Disclaimer

> [!WARNING]
> **General training information — not medical advice.** Coach Claude is not a doctor.
>
> Hold the pain rule: keep it **at or under 3/10**, settling within 24h, and not trending worse. If it climbs or lingers, scale back and check with your physio. Mild muscle soreness from strength work is fine; sharp joint pain is not.

<p align="center">
  <sub>Built with plain HTML, CSS &amp; vanilla JS · your data lives in your browser and in the JSON you export.</sub>
</p>

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:ff9a4d,100:c95c14&height=100&section=footer" alt="" />
</p>
