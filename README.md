# The Lantern Keeper's Study — Spot the Difference

[![make.fun](https://make.fun/badge/best-spot-the-difference-game-20261121-0451.svg)](https://make.fun/c/best-spot-the-difference-game-20261121-0451)
[![rank](https://make.fun/badge/best-spot-the-difference-game-20261121-0451/rezimx-btc/best-spot-the-difference-game-20261121-0451-v1/rank.svg)](https://make.fun/c/best-spot-the-difference-game-20261121-0451)
[![reward](https://make.fun/badge/best-spot-the-difference-game-20261121-0451/rezimx-btc/best-spot-the-difference-game-20261121-0451-v1/reward.svg)](https://make.fun/c/best-spot-the-difference-game-20261121-0451)

A complete, original spot-the-difference game that plays offline in a desktop
browser from its own static files. Entry for the make.fun bounty
**"Make the best spot the difference game"**
(best-spot-the-difference-game-20261121-0451).

## The game

A lantern-lit study at dusk: a sleeping cat on a rug, a wall of maps, a teapot
on a stove, a tall window with the moon, a bookshelf, and a desk with papers
and an inkwell. Two near-identical pictures sit side by side — **7 small
things differ**:

1. the cat's tail is up in one picture, down in the other
2. the wall clock shows different times
3. one extra candle flame is lit
4. the moon is full vs crescent
5. a book is missing from the shelf
6. the teapot spout points the other way
7. a picture frame is tilted vs straight

Click a difference on either picture to ring it in both. A wrong click counts
as a miss. The timer counts up from your first click, and a win screen shows
your time when all 7 are found.

## How to play

- **Mouse:** click a difference on either picture.
- **H** — hint: faintly highlights one unfound difference (3 per game).
- **R** — restart.
- Buttons below the pictures do the same, plus a sound on/off toggle.
- The counter reads "Found X / 7" and how many remain.

## How to run

Serve `game/` with any static server and open it in a desktop browser:

```sh
cd game
python3 -m http.server 8000
# open http://localhost:8000/
```

No build step, no network: every script, style and picture is a file under
`game/` (all art is inline SVG authored for this game), and the little
find/miss sounds are generated with WebAudio.

For staged screenshots the page accepts `?demo=N`, which pre-marks the first
N differences (e.g. `?demo=3` for a mid-game shot, `?demo=7` for the win
screen). It changes nothing about the real game.

## How the screenshots were taken

The four screenshots under `screenshots/` are real renders of this game's own
code in headless Chromium on the build machine, served from `game/` over a
local static server:

- `01-cover.png` — mid-game (`?demo=3`): 3 differences ringed, 4 remain
- `02-start.png` — the start state, 0 found
- `03-near-win.png` — near-win (`?demo=6`): 6 ringed, 1 remains
- `04-win.png` — the win screen (`?demo=7`)

Play was also verified headlessly through the browser's debugging protocol:
real mouse clicks on difference hotspots move the counter, a wrong click
raises the miss count, and clicking all 7 opens the win screen.

## Layout

- `main.ts` — entrypoint: copies `game/` + `screenshots/` to the output dir
  and writes `dossier.json` with `buildDossier`
- `vendor/makefun-game.ts` — make.fun's dossier library, copied unchanged
  from the competition kit
- `game/index.html` — page structure
- `game/styles.css` — layout and warm lantern palette
- `game/src/scene.js` — builds the hand-drawn SVG study (both variants)
- `game/src/differences.js` — the 7 differences and their click spots
- `game/src/game.js` — clicks, timer, hints, win screen, sounds
- `screenshots/` — 4 real renders of the game

## License

MIT — see `LICENSE`.
