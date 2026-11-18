/* Sunset Job animation engine: every animation is a pure function of time t (seconds),
   so frames can be rendered deterministically (render mode) or played live (browser source). */
window.SJ = (function () {
  const NS = "http://www.w3.org/2000/svg", fns = [];
  const api = { T: 12, on: f => fns.push(f), setT: t => { fns.forEach(f => f(t)); } };
  const TAU = Math.PI * 2;
  api.ease = { out: x => 1 - Math.pow(1 - x, 3), back: x => { const c = 1.9; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2); }, inout: x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2 };
  api.clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
  api.seg = (t, a, b) => api.clamp((t - a) / (b - a));
  api.grid = function (g, o) {           // perspective grid sea, scrolls toward camera, seamless
    const hs = [];
    for (let i = 0; i <= o.nh; i++) { const l = document.createElementNS(NS, "line"); l.setAttribute("x1", 0); l.setAttribute("x2", o.w); g.appendChild(l); hs.push(l); }
    for (let k = -o.nv; k <= o.nv; k++) { const l = document.createElementNS(NS, "line"); l.setAttribute("x1", o.vx + k * 14); l.setAttribute("y1", o.hz); l.setAttribute("x2", o.vx + k * 190); l.setAttribute("y2", o.h + 40); g.appendChild(l); }
    api.on(t => { const ph = ((t / api.T) * o.cycles) % 1;
      hs.forEach((l, i) => { const u = (i + ph) / o.nh; const y = o.hz + (o.h - o.hz) * Math.pow(u, 2.1); l.setAttribute("y1", y); l.setAttribute("y2", y); }); });
  };
  api.sunStripes = function (g, o) {     // horizontal cuts drifting down through the sun, seamless
    const n = 12, rs = []; for (let i = 0; i < n; i++) { const r = document.createElementNS(NS, "rect"); r.setAttribute("x", o.cx - o.r - 5); r.setAttribute("width", 2 * o.r + 10); r.setAttribute("fill", "black"); g.appendChild(r); rs.push(r); }
    const y0 = o.cy - o.r * 0.42, P = o.r * 0.11;
    api.on(t => { const ph = ((t / api.T) * o.cycles) % 1;
      rs.forEach((r, j) => { const y = y0 + (j - 1 + ph) * P; const k = (y - y0) / P; const th = Math.max(0, (2 + 2.6 * k) * o.r / 260);
        r.setAttribute("y", y); r.setAttribute("height", th); }); });
  };
  api.sway = function (el, amp, n, ph) { api.on(t => { el.style.transform = `rotate(${amp * Math.sin(TAU * n * t / api.T + ph)}deg)`; }); };
  api.twinkle = function (els) { els.forEach((e, i) => { const n = 1 + (i % 4), ph = i * 1.7; api.on(t => { e.style.opacity = 0.25 + 0.75 * Math.abs(Math.sin(TAU * n * t / api.T / 2 + ph)); }); }); };
  api.glint = function (els, a, b) {     // chrome light sweep between a and b seconds
    els.forEach(e => api.on(t => { const p = api.seg(t, a, b); e.style.setProperty("--gp", (200 - p * 250) + "%"); }));
  };
  api.flicker = function (el, start, base = 1) {   // neon tube switching on at `start`
    const pat = [[0, 0], [.06, 1], [.1, .15], [.16, 1], [.22, .3], [.26, 1]];
    api.on(t => { const d = t - start; let v = 0; for (const [tt, vv] of pat) if (d >= tt) v = vv; el.style.opacity = v * base; });
  };
  api.ticker = function (inner) {        // seamless: moves exactly one copy-width per loop
    api.on(t => { const w = inner.firstElementChild.getBoundingClientRect().width; inner.style.transform = `translateX(${-((t / api.T) % 1) * w}px)`; });
  };
  api.blink = function (el, n) { api.on(t => { el.style.opacity = (Math.floor(2 * n * t / api.T) % 2) ? 0.15 : 1; }); };
  api.params = new URLSearchParams(location.search);
  api.render = api.params.get("render") === "1";
  api.play = function (loop = true) {    // live playback for browser sources / previews
    if (api.render) return; const t0 = performance.now();
    const f = () => { let t = (performance.now() - t0) / 1000; if (loop) t %= api.T; api.setT(t); requestAnimationFrame(f); }; requestAnimationFrame(f);
  };
  return api;
})();
