# Neonshore widgets (Sunset Job, sale edition)

Self-contained OBS **Browser Source** widgets: facecam frame, alerts, and live chat.

These files are the sale/neutral edition. Edit names, colors and labels in `widgets/config.js`, or pass the same keys as URL parameters (for example `facecam.html?name=NIGHTOWL&role=VARIETY%20STREAMER`). Colors are hex without `#`.

## Public URLs (after GitHub Pages is enabled)

Enable Pages on this repository: **Settings → Pages → Source = Deploy from a branch → `main` → `/` (root)**.

Then the widgets will be at:

- Facecam — https://trydavidqix.github.io/neonshore-widgets/widgets/facecam.html
- Alerts — https://trydavidqix.github.io/neonshore-widgets/widgets/alerts.html
- Chat — https://trydavidqix.github.io/neonshore-widgets/widgets/chat.html

Recommended Browser Source sizes: facecam **640×360** (or 1920×1080), alerts **1920×1080**, chat **440×620**.

Quick tests: `alerts.html?test=follow,sub,tip,raid&user=nightowl` and `chat.html?demo=1`.

Chat and auto-alerts use a read-only anonymous connection to Twitch (`wss://irc-ws.chat.twitch.tv:443`) only when `channel` is set. No login or token is required.

Bundled fonts (Chakra Petch, Unbounded, Sacramento, JetBrains Mono) are licensed under the SIL Open Font License 1.1; see `widgets/fonts/OFL-1.1.txt`.
