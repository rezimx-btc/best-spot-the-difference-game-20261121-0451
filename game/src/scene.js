"use strict";

/* buildStudyScene(variant) returns the full SVG markup of one panel of
   "The Lantern Keeper's Study". variant "A" is the left picture, "B" the
   right one: the two differ in exactly the seven places listed in
   differences.js. All art is inline SVG authored here; no external assets. */

function studyWall() {
  return '' +
    '<rect x="0" y="0" width="600" height="450" fill="#f6e7c8"/>' +
    '<rect x="0" y="0" width="600" height="450" fill="url(#wallShade)"/>' +
    '<rect x="0" y="374" width="600" height="10" fill="#7a4e28"/>' +
    '<rect x="0" y="384" width="600" height="66" fill="#9c6b3f"/>' +
    '<line x1="0" y1="406" x2="600" y2="406" stroke="#7a4e28" stroke-width="2" opacity="0.55"/>' +
    '<line x1="0" y1="428" x2="600" y2="428" stroke="#7a4e28" stroke-width="2" opacity="0.55"/>';
}

function studyWindow(variant) {
  var moon = '';
  if (variant === 'A') {
    moon = '<circle cx="540" cy="82" r="24" fill="#f7e9b8"/>' +
      '<circle cx="532" cy="76" r="5" fill="#e8d391" opacity="0.8"/>' +
      '<circle cx="548" cy="90" r="4" fill="#e8d391" opacity="0.8"/>';
  } else {
    moon = '<circle cx="540" cy="82" r="24" fill="#f7e9b8"/>' +
      '<circle cx="552" cy="74" r="21" fill="#0e4a5e"/>';
  }
  return '' +
    '<g>' +
    '<rect x="432" y="28" width="152" height="210" rx="6" fill="#6b4226"/>' +
    '<rect x="444" y="40" width="128" height="186" fill="#0e4a5e"/>' +
    '<circle cx="470" cy="66" r="1.8" fill="#f7e9b8"/>' +
    '<circle cx="492" cy="52" r="1.5" fill="#f7e9b8"/>' +
    '<circle cx="462" cy="150" r="1.6" fill="#f7e9b8"/>' +
    '<circle cx="556" cy="150" r="1.8" fill="#f7e9b8"/>' +
    '<circle cx="566" cy="196" r="1.5" fill="#f7e9b8"/>' +
    '<circle cx="480" cy="196" r="1.4" fill="#f7e9b8"/>' +
    moon +
    '<rect x="504" y="40" width="8" height="186" fill="#6b4226"/>' +
    '<rect x="444" y="128" width="128" height="8" fill="#6b4226"/>' +
    '<rect x="426" y="238" width="164" height="10" rx="3" fill="#6b4226"/>' +
    '<path d="M432 28 Q424 130 436 238 L452 238 Q444 130 450 28 Z" fill="#b4503c"/>' +
    '<path d="M584 28 Q592 130 580 238 L564 238 Q572 130 566 28 Z" fill="#b4503c"/>' +
    '</g>';
}

function studyBookshelf(variant) {
  var books = '';
  var shelfBooks = [
    [36, 118, ['#a8442f', '#3f6d4e', '#c98f2e', '#4a6b8a', '#7a4e8a']],
    [36, 178, ['#4a6b8a', '#c98f2e', '#a8442f', '#3f6d4e']],
    [36, 238, ['#7a4e8a', '#3f6d4e', '#c98f2e', '#4a6b8a', '#a8442f', '#3f6d4e']]
  ];
  shelfBooks.forEach(function (shelf, si) {
    var x = shelf[0];
    var y = shelf[1];
    shelf[2].forEach(function (color, bi) {
      if (variant === 'B' && si === 1 && bi === 2) return; // the missing book
      var w = 15 + ((bi * 7 + si * 3) % 9);
      var h = 42 + ((bi * 5 + si * 11) % 12);
      books += '<rect x="' + x + '" y="' + (y + 52 - h) + '" width="' + w + '" height="' + h + '" rx="2" fill="' + color + '"/>' +
        '<rect x="' + x + '" y="' + (y + 52 - h + 6) + '" width="' + w + '" height="3" fill="#00000022"/>';
      x += w + 2;
    });
  });
  return '' +
    '<g>' +
    '<rect x="28" y="58" width="140" height="278" rx="4" fill="#7a4e28"/>' +
    '<rect x="34" y="64" width="128" height="266" fill="#5a3a22"/>' +
    '<rect x="34" y="112" width="128" height="6" fill="#7a4e28"/>' +
    '<rect x="34" y="172" width="128" height="6" fill="#7a4e28"/>' +
    '<rect x="34" y="232" width="128" height="6" fill="#7a4e28"/>' +
    '<rect x="34" y="292" width="128" height="6" fill="#7a4e28"/>' +
    books +
    '<rect x="40" y="292" width="52" height="8" rx="2" fill="#c98f2e"/>' +
    '<rect x="44" y="284" width="44" height="8" rx="2" fill="#a8442f"/>' +
    '<rect x="48" y="276" width="36" height="8" rx="2" fill="#3f6d4e"/>' +
    '</g>';
}

function studyClock(variant) {
  var hourAngle, minuteAngle;
  if (variant === 'A') { hourAngle = 245; minuteAngle = 30; }   /* 8:05 */
  else { hourAngle = 115; minuteAngle = 240; }                  /* 3:40 */
  function hand(angle, len, w, color) {
    var rad = (angle - 90) * Math.PI / 180;
    var x2 = 310 + len * Math.cos(rad);
    var y2 = 72 + len * Math.sin(rad);
    return '<line x1="310" y1="72" x2="' + x2.toFixed(1) + '" y2="' + y2.toFixed(1) +
      '" stroke="' + color + '" stroke-width="' + w + '" stroke-linecap="round"/>';
  }
  var ticks = '';
  for (var k = 0; k < 12; k++) {
    var a = k * 30 * Math.PI / 180;
    var x1 = 310 + 26 * Math.sin(a), y1 = 72 - 26 * Math.cos(a);
    var x2 = 310 + 30 * Math.sin(a), y2 = 72 - 30 * Math.cos(a);
    ticks += '<line x1="' + x1.toFixed(1) + '" y1="' + y1.toFixed(1) + '" x2="' + x2.toFixed(1) + '" y2="' + y2.toFixed(1) + '" stroke="#5a3a22" stroke-width="2"/>';
  }
  return '' +
    '<g>' +
    '<circle cx="310" cy="72" r="34" fill="#5a3a22"/>' +
    '<circle cx="310" cy="72" r="30" fill="#fdf6e3"/>' +
    ticks +
    hand(hourAngle, 15, 4, '#3a2a1a') +
    hand(minuteAngle, 22, 3, '#3a2a1a') +
    '<circle cx="310" cy="72" r="3" fill="#a8442f"/>' +
    '</g>';
}

function studyLantern() {
  return '' +
    '<g>' +
    '<circle cx="250" cy="86" r="46" fill="url(#glow)"/>' +
    '<line x1="250" y1="0" x2="250" y2="52" stroke="#3a2a1a" stroke-width="3"/>' +
    '<path d="M232 52 L268 52 L262 108 L238 108 Z" fill="#3a2a1a"/>' +
    '<rect x="238" y="62" width="24" height="36" rx="4" fill="#ffdf8a" opacity="0.95"/>' +
    '<path d="M250 70 Q246 80 250 88 Q254 80 250 70 Z" fill="#e8821e"/>' +
    '<line x1="238" y1="62" x2="238" y2="98" stroke="#3a2a1a" stroke-width="2"/>' +
    '<line x1="250" y1="62" x2="250" y2="98" stroke="#3a2a1a" stroke-width="2"/>' +
    '<line x1="262" y1="62" x2="262" y2="98" stroke="#3a2a1a" stroke-width="2"/>' +
    '</g>';
}

function studyFrame(variant) {
  var inner = '' +
    '<rect x="204" y="158" width="64" height="46" fill="#dfe8d8"/>' +
    '<path d="M204 204 L228 172 L244 190 L258 176 L268 188 L268 204 Z" fill="#7a9a6a"/>' +
    '<circle cx="254" cy="168" r="6" fill="#e8c96a"/>' +
    '<path d="M204 204 L268 204 L268 196 L204 196 Z" fill="#5a7a8a" opacity="0.6"/>';
  var g = '<g>' +
    '<rect x="196" y="150" width="80" height="62" rx="3" fill="#5a3a22"/>' +
    inner +
    '</g>';
  if (variant === 'B') {
    return '<g transform="rotate(6 236 181)">' + g + '</g>';
  }
  return g;
}

function studyMaps() {
  return '' +
    '<g>' +
    '<rect x="330" y="140" width="92" height="62" rx="3" fill="#5a3a22"/>' +
    '<rect x="336" y="146" width="80" height="50" fill="#efe3c0"/>' +
    '<path d="M344 186 Q360 158 378 168 Q392 176 388 190 Q372 196 356 190 Q346 194 344 186 Z" fill="#c9b078"/>' +
    '<path d="M352 176 Q366 166 380 172" stroke="#7a6a4a" stroke-width="1.5" fill="none"/>' +
    '<circle cx="402" cy="154" r="3" fill="#a8442f"/>' +
    '<rect x="300" y="226" width="62" height="48" rx="3" fill="#5a3a22" transform="rotate(-3 331 250)"/>' +
    '<rect x="305" y="231" width="52" height="38" fill="#efe3c0" transform="rotate(-3 331 250)"/>' +
    '<path d="M312 262 Q322 240 340 246 Q348 254 340 264 Q326 268 312 262 Z" fill="#7a9a6a" transform="rotate(-3 331 250)"/>' +
    '</g>';
}

function studyDesk(variant) {
  var flames = '';
  var candleX = [386, 404, 422];
  candleX.forEach(function (cx, i) {
    flames += '<rect x="' + (cx - 3) + '" y="272" width="6" height="30" rx="2" fill="#fdf6e3"/>';
    if (!(variant === 'B' && i === 1)) {
      flames += '<path d="M' + cx + ' 252 Q' + (cx - 5) + ' 261 ' + cx + ' 266 Q' + (cx + 5) + ' 261 ' + cx + ' 252 Z" fill="#f5a623"/>' +
        '<path d="M' + cx + ' 257 Q' + (cx - 2) + ' 261 ' + cx + ' 264 Q' + (cx + 2) + ' 261 ' + cx + ' 257 Z" fill="#ffe9a8"/>';
    } else {
      flames += '<line x1="' + cx + '" y1="266" x2="' + cx + '" y2="272" stroke="#3a2a1a" stroke-width="2"/>';
    }
  });
  return '' +
    '<g>' +
    '<rect x="176" y="300" width="252" height="16" rx="4" fill="#8a5a33"/>' +
    '<rect x="190" y="316" width="12" height="66" fill="#6b4226"/>' +
    '<rect x="404" y="316" width="12" height="66" fill="#6b4226"/>' +
    '<rect x="222" y="286" width="58" height="16" rx="2" fill="#fdf6e3" transform="rotate(-4 251 294)"/>' +
    '<rect x="228" y="278" width="52" height="14" rx="2" fill="#f3ead2" transform="rotate(3 254 285)"/>' +
    '<line x1="236" y1="290" x2="272" y2="288" stroke="#9a8a6a" stroke-width="1.5"/>' +
    '<line x1="236" y1="295" x2="266" y2="293" stroke="#9a8a6a" stroke-width="1.5"/>' +
    '<ellipse cx="332" cy="296" rx="10" ry="6" fill="#2e2a26"/>' +
    '<rect x="326" y="286" width="12" height="10" rx="3" fill="#2e2a26"/>' +
    '<line x1="340" y1="288" x2="356" y2="272" stroke="#d8c9a0" stroke-width="2.5" stroke-linecap="round"/>' +
    flames +
    '<rect x="378" y="298" width="52" height="6" rx="2" fill="#c9a227"/>' +
    '<rect x="382" y="292" width="44" height="6" rx="2" fill="#a8442f"/>' +
    '</g>';
}

function studyStove(variant) {
  var spout;
  if (variant === 'A') {
    spout = '<path d="M496 322 Q482 314 478 300 L486 296 Q492 308 500 312 Z" fill="#4a6b8a"/>';
  } else {
    spout = '<path d="M544 322 Q558 314 562 300 L554 296 Q548 308 540 312 Z" fill="#4a6b8a"/>';
  }
  var handle;
  if (variant === 'A') {
    handle = '<path d="M544 312 Q560 312 560 326 Q560 338 544 336" stroke="#4a6b8a" stroke-width="5" fill="none"/>';
  } else {
    handle = '<path d="M496 312 Q480 312 480 326 Q480 338 496 336" stroke="#4a6b8a" stroke-width="5" fill="none"/>';
  }
  return '' +
    '<g>' +
    '<rect x="460" y="330" width="120" height="52" rx="6" fill="#3a3a3a"/>' +
    '<rect x="468" y="338" width="104" height="36" rx="4" fill="#2e2e2e"/>' +
    '<circle cx="500" cy="356" r="4" fill="#c9a227"/>' +
    '<circle cx="540" cy="356" r="4" fill="#c9a227"/>' +
    '<rect x="472" y="382" width="8" height="14" fill="#2e2e2e"/>' +
    '<rect x="560" y="382" width="8" height="14" fill="#2e2e2e"/>' +
    '<ellipse cx="520" cy="330" rx="26" ry="15" fill="#4a6b8a"/>' +
    '<rect x="514" y="306" width="12" height="10" rx="4" fill="#3f5d76"/>' +
    '<circle cx="520" cy="304" r="4" fill="#c9a227"/>' +
    spout + handle +
    '</g>';
}

function studyRugAndCat(variant) {
  var tail;
  if (variant === 'A') {
    tail = '<path d="M252 398 Q236 386 242 368 Q246 356 258 360" stroke="#b96f33" stroke-width="11" stroke-linecap="round" fill="none"/>';
  } else {
    tail = '<path d="M252 400 Q236 408 222 404 Q212 401 214 394" stroke="#b96f33" stroke-width="11" stroke-linecap="round" fill="none"/>';
  }
  return '' +
    '<g>' +
    '<ellipse cx="300" cy="408" rx="165" ry="24" fill="#a8442f"/>' +
    '<ellipse cx="300" cy="408" rx="140" ry="17" fill="#c96f4a"/>' +
    '<ellipse cx="300" cy="408" rx="112" ry="11" fill="#a8442f"/>' +
    tail +
    '<ellipse cx="296" cy="400" rx="52" ry="16" fill="#d98e4a"/>' +
    '<ellipse cx="296" cy="394" rx="40" ry="10" fill="#e8a35e"/>' +
    '<circle cx="342" cy="392" r="15" fill="#d98e4a"/>' +
    '<path d="M332 380 L336 368 L344 378 Z" fill="#d98e4a"/>' +
    '<path d="M348 378 L354 368 L358 380 Z" fill="#d98e4a"/>' +
    '<path d="M336 380 L338 372 L342 378 Z" fill="#e8a35e"/>' +
    '<path d="M350 378 L354 372 L356 380 Z" fill="#e8a35e"/>' +
    '<path d="M336 392 Q340 395 344 392" stroke="#3a2a1a" stroke-width="1.8" fill="none" stroke-linecap="round"/>' +
    '<circle cx="352" cy="388" r="1.6" fill="#3a2a1a"/>' +
    '<path d="M344 398 Q348 400 352 398" stroke="#b96f33" stroke-width="1.5" fill="none" stroke-linecap="round"/>' +
    '<path d="M258 392 Q268 388 278 392" stroke="#b96f33" stroke-width="1.5" fill="none" opacity="0.7"/>' +
    '<path d="M262 402 Q272 398 282 402" stroke="#b96f33" stroke-width="1.5" fill="none" opacity="0.7"/>' +
    '</g>';
}

function buildStudyScene(variant) {
  return '' +
    '<svg viewBox="0 0 600 450" xmlns="http://www.w3.org/2000/svg" role="img" ' +
    'aria-label="The Lantern Keeper\'s Study, picture ' + variant + '">' +
    '<defs>' +
    '<radialGradient id="glow" cx="50%" cy="50%" r="50%">' +
    '<stop offset="0%" stop-color="#ffdf8a" stop-opacity="0.55"/>' +
    '<stop offset="100%" stop-color="#ffdf8a" stop-opacity="0"/>' +
    '</radialGradient>' +
    '<linearGradient id="wallShade" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0%" stop-color="#000000" stop-opacity="0"/>' +
    '<stop offset="100%" stop-color="#7a4e28" stop-opacity="0.12"/>' +
    '</linearGradient>' +
    '</defs>' +
    studyWall() +
    studyWindow(variant) +
    studyBookshelf(variant) +
    studyClock(variant) +
    studyLantern() +
    studyFrame(variant) +
    studyMaps() +
    studyDesk(variant) +
    studyStove(variant) +
    studyRugAndCat(variant) +
    '</svg>';
}
