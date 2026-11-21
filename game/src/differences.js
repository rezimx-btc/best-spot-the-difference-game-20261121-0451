"use strict";

/* The Lantern Keeper's Study: the seven differences between the two pictures.
   Coordinates are in each panel's SVG viewBox space (0 0 600 450).
   x, y is the centre of the difference; r is the click radius around it.
   A click counts as a find when it lands within r + 6 of an unfound centre,
   so a ring always covers the thing it marks. */
var LANTERN_DIFFERENCES = [
  { id: "tail", label: "The cat's tail", x: 262, y: 384, r: 34 },
  { id: "clock", label: "The clock's time", x: 310, y: 72, r: 40 },
  { id: "candle", label: "The middle candle", x: 404, y: 260, r: 20 },
  { id: "moon", label: "The moon", x: 540, y: 82, r: 34 },
  { id: "book", label: "The missing book", x: 126, y: 212, r: 24 },
  { id: "teapot", label: "The teapot's spout", x: 512, y: 316, r: 30 },
  { id: "frame", label: "The tilted picture", x: 236, y: 181, r: 40 }
];

var LANTERN_TOTAL = LANTERN_DIFFERENCES.length;
