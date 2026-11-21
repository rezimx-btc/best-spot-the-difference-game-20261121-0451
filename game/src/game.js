"use strict";

/* The Lantern Keeper's Study: game logic.
   Renders both panels from scene.js, handles clicks, the timer, hints,
   the win screen and the little WebAudio sounds. No network, no assets. */

var SVG_NS = "http://www.w3.org/2000/svg";
var VIEW_W = 600;
var VIEW_H = 450;

var lanternState = {
  found: {},
  foundCount: 0,
  misses: 0,
  hintsLeft: 3,
  started: false,
  won: false,
  startMs: 0,
  timerId: null,
  soundOn: true,
  audioCtx: null
};

function lanternPanelSvg(side) {
  return document.querySelector("#panel-" + side + " svg");
}

function lanternRenderPanels() {
  document.querySelector("#panel-left .scene").innerHTML = buildStudyScene("A");
  document.querySelector("#panel-right .scene").innerHTML = buildStudyScene("B");
}

function lanternFormatTime(ms) {
  var total = Math.floor(ms / 1000);
  var m = Math.floor(total / 60);
  var s = total % 60;
  return (m < 10 ? "0" + m : "" + m) + ":" + (s < 10 ? "0" + s : "" + s);
}

function lanternUpdateHud() {
  var remain = LANTERN_TOTAL - lanternState.foundCount;
  document.getElementById("found-count").textContent =
    "Found " + lanternState.foundCount + " / " + LANTERN_TOTAL;
  document.getElementById("remain-count").textContent =
    remain + (remain === 1 ? " remains" : " remain");
  document.getElementById("miss-count").textContent =
    "Misses: " + lanternState.misses;
  var hintBtn = document.getElementById("hint-btn");
  hintBtn.textContent = "Hint (" + lanternState.hintsLeft + " left)";
  hintBtn.disabled = lanternState.hintsLeft <= 0 || lanternState.won;
}

function lanternTick() {
  if (!lanternState.started || lanternState.won) return;
  document.getElementById("timer").textContent =
    lanternFormatTime(Date.now() - lanternState.startMs);
}

function lanternStartTimer() {
  if (lanternState.started) return;
  lanternState.started = true;
  lanternState.startMs = Date.now();
  lanternState.timerId = window.setInterval(lanternTick, 250);
}

function lanternBeep(freq, dur, type, gain) {
  if (!lanternState.soundOn) return;
  try {
    if (!lanternState.audioCtx) {
      var AC = window.AudioContext || window.webkitAudioContext;
      lanternState.audioCtx = new AC();
    }
    var ctx = lanternState.audioCtx;
    var osc = ctx.createOscillator();
    var g = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    g.gain.setValueAtTime(gain, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    osc.connect(g);
    g.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + dur);
  } catch (e) { /* sound is decoration; never break the game */ }
}

function lanternChime() {
  lanternBeep(880, 0.18, "sine", 0.12);
  window.setTimeout(function () { lanternBeep(1318, 0.25, "sine", 0.10); }, 90);
}

function lanternThud() {
  lanternBeep(140, 0.15, "triangle", 0.08);
}

function lanternRingOnPanel(side, diff, cls) {
  var svg = lanternPanelSvg(side);
  if (!svg) return null;
  var ring = document.createElementNS(SVG_NS, "circle");
  ring.setAttribute("cx", String(diff.x));
  ring.setAttribute("cy", String(diff.y));
  ring.setAttribute("r", String(diff.r + 4));
  ring.setAttribute("class", cls);
  svg.appendChild(ring);
  return ring;
}

function lanternMarkFound(diff, silent) {
  lanternState.found[diff.id] = true;
  lanternState.foundCount++;
  lanternRingOnPanel("left", diff, "found-ring");
  lanternRingOnPanel("right", diff, "found-ring");
  lanternUpdateHud();
  if (!silent) lanternChime();
  if (lanternState.foundCount === LANTERN_TOTAL) lanternWin();
}

function lanternMissMark(svg, x, y) {
  var mark = document.createElementNS(SVG_NS, "text");
  mark.setAttribute("x", String(x));
  mark.setAttribute("y", String(y + 8));
  mark.setAttribute("class", "miss-mark");
  mark.textContent = "\u2715";
  svg.appendChild(mark);
  window.setTimeout(function () { if (mark.parentNode) mark.parentNode.removeChild(mark); }, 900);
}

function lanternClickOnPanel(event) {
  if (lanternState.won) return;
  var svg = event.currentTarget;
  var rect = svg.getBoundingClientRect();
  var x = (event.clientX - rect.left) * VIEW_W / rect.width;
  var y = (event.clientY - rect.top) * VIEW_H / rect.height;
  lanternStartTimer();
  var hit = null;
  var best = Infinity;
  LANTERN_DIFFERENCES.forEach(function (diff) {
    if (lanternState.found[diff.id]) return;
    var d = Math.hypot(diff.x - x, diff.y - y);
    if (d <= diff.r + 6 && d < best) { best = d; hit = diff; }
  });
  if (hit) {
    lanternMarkFound(hit, false);
  } else {
    lanternState.misses++;
    lanternMissMark(svg, x, y);
    lanternThud();
    lanternUpdateHud();
  }
}

function lanternHint() {
  if (lanternState.won || lanternState.hintsLeft <= 0) return;
  var remaining = LANTERN_DIFFERENCES.filter(function (d) { return !lanternState.found[d.id]; });
  if (remaining.length === 0) return;
  var pick = remaining[Math.floor(Math.random() * remaining.length)];
  lanternState.hintsLeft--;
  lanternStartTimer();
  var left = lanternRingOnPanel("left", pick, "hint-ring");
  var right = lanternRingOnPanel("right", pick, "hint-ring");
  window.setTimeout(function () {
    if (left && left.parentNode) left.parentNode.removeChild(left);
    if (right && right.parentNode) right.parentNode.removeChild(right);
  }, 3000);
  lanternUpdateHud();
}

function lanternWin() {
  lanternState.won = true;
  if (lanternState.timerId !== null) window.clearInterval(lanternState.timerId);
  lanternTick();
  var overlay = document.getElementById("win-overlay");
  document.getElementById("win-time").textContent =
    document.getElementById("timer").textContent;
  document.getElementById("win-misses").textContent = String(lanternState.misses);
  overlay.classList.remove("hidden");
  lanternBeep(523, 0.2, "sine", 0.12);
  window.setTimeout(function () { lanternBeep(659, 0.2, "sine", 0.12); }, 140);
  window.setTimeout(function () { lanternBeep(784, 0.35, "sine", 0.12); }, 280);
}

function lanternRestart() {
  lanternState.found = {};
  lanternState.foundCount = 0;
  lanternState.misses = 0;
  lanternState.hintsLeft = 3;
  lanternState.started = false;
  lanternState.won = false;
  if (lanternState.timerId !== null) window.clearInterval(lanternState.timerId);
  lanternState.timerId = null;
  document.getElementById("timer").textContent = "00:00";
  document.getElementById("win-overlay").classList.add("hidden");
  lanternRenderPanels();
  lanternUpdateHud();
}

function lanternApplyDemo() {
  var params = new URLSearchParams(window.location.search);
  var demo = parseInt(params.get("demo") || "0", 10);
  if (!demo || demo < 0) return;
  var n = Math.min(demo, LANTERN_TOTAL);
  lanternStartTimer();
  for (var i = 0; i < n; i++) lanternMarkFound(LANTERN_DIFFERENCES[i], true);
}

function lanternInit() {
  lanternRenderPanels();
  lanternUpdateHud();
  document.querySelectorAll(".panel svg").forEach(function (svg) {
    svg.addEventListener("click", lanternClickOnPanel);
  });
  document.getElementById("hint-btn").addEventListener("click", lanternHint);
  document.getElementById("restart-btn").addEventListener("click", lanternRestart);
  document.getElementById("again-btn").addEventListener("click", lanternRestart);
  document.getElementById("sound-btn").addEventListener("click", function () {
    lanternState.soundOn = !lanternState.soundOn;
    this.textContent = lanternState.soundOn ? "Sound: on" : "Sound: off";
  });
  document.addEventListener("keydown", function (event) {
    var k = event.key.toLowerCase();
    if (k === "h") lanternHint();
    if (k === "r") lanternRestart();
  });
  lanternApplyDemo();
  /* Test hook: lets a headless check read the live state without touching the DOM. */
  window.__lanternGame = lanternState;
}

document.addEventListener("DOMContentLoaded", lanternInit);
