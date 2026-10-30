/*
 * IDB Programming: A3 — a musical instrument
 *
 * All of the code for your instrument goes in this file. It's split into sections:
 *   settings — the "fixed" parts of your program
 *   state    — the parts of your program that change over time
 *   sound    — the Tone.js instruments and effects
 *   update   — updates the state every 100ms, if necessary
 *   use      — uses the state to make sound and shapes every 100ms, if necessary
 *   controls — what happens when the player uses the pointer
 *   setup    — starts everything
 *
 * The pointer events change the state. update() and use() each run every
 * 100ms, in a loop:
 *   1. update: change the state, e.g. based on time or on the pointer's movement
 *   2. use:    make sound and move shapes, based on the state
 *
 * Shapes come from shape.js: createShape() makes one, and its methods
 * (setPosition, setSize, setColour ...) change it.
 *
 * Tone.js documentation: https://tonejs.github.io/docs/15.1.22/
 */

import { createShape } from "./shape.js";

// ---------- Settings ----------
// Settings variables should contain all of the "fixed" parts of your programs
// For example: which notes you can play, how fast things move, the tempo.

// ---------- State ----------
// State variables are the parts of your program that change over time.
// For example: where the pointer is, how fast it's moving, or whether a drone is on.
let lastX = 0;
let lastY = 0;
let lastTime = 0;
let octave = 4;
let speed = 0;
let isPlaying = false;
let activeShape = null;
let addSize = 0;
let addLightness = 0;

// ---------- Sound ----------
// Make the instruments and plug them into the speakers.
const synth = new Tone.PolySynth(Tone.Synth).toDestination(); // can play several notes at once

const allShapes = [
  {
    id: "star1",
    colour: [220, 65, 65],
    position: [0.2, 0.12],
    size: 250,
    note: "C",
  },
  {
    id: "star2",
    colour: [45, 95, 78],
    position: [0.48, 0.08],
    size: 200,
    note: "D",
  },
  {
    id: "star3",
    colour: [235, 55, 72],
    position: [0.65, 0.19],
    size: 165,
    note: "E",
  },
  {
    id: "star4",
    colour: [52, 90, 72],
    position: [0.71, 0.44],
    size: 250,
    note: "G",
  },
  {
    id: "star5",
    colour: [205, 75, 78],
    position: [0.58, 0.71],
    size: 189,
    note: "A",
  },
  {
    id: "star6",
    colour: [220, 65, 65],
    position: [0.3, 0.74],
    size: 120,
    note: "C",
  },
  {
    id: "star7",
    colour: [45, 95, 78],
    position: [0.17, 0.49],
    size: 150,
    note: "D",
  },
  {
    id: "star8",
    colour: [235, 55, 72],
    position: [0.4, 0.34],
    size: 170,
    note: "E",
  },
  {
    id: "star9",
    colour: [52, 90, 72],
    position: [0.54, 0.45],
    size: 150,
    note: "G",
  },
  {
    id: "star10",
    colour: [205, 75, 78],
    position: [0.38, 0.58],
    size: 135,
    note: "A",
  },
  {
    id: "star11",
    colour: [220, 65, 65],
    position: [0.06, 0.8],
    size: 30,
    note: "C",
  },
  {
    id: "star12",
    colour: [45, 95, 78],
    position: [0.08, 0.15],
    size: 30,
    note: "D",
  },
  {
    id: "star13",
    colour: [235, 55, 72],
    position: [0.05, 0.33],
    size: 30,
    note: "E",
  },
  {
    id: "star14",
    colour: [52, 90, 72],
    position: [0.9, 0.72],
    size: 30,
    note: "G",
  },
  {
    id: "star15",
    colour: [205, 75, 78],
    position: [0.86, 0.2],
    size: 30,
    note: "A",
  },
];

// ---------- Update ----------
// Update the state. This is called every 100ms.
function update() {
  speed *= 0.9;
  addSize = Math.min(60, speed * 20);
  addLightness = Math.min(35, speed * 10);

  setTimeout(update, 100); // call update() again in 100 milliseconds
}

// ---------- Use ----------
// Use the state to make sound and move shapes. This is called every 100ms.
function use() {
  if (activeShape !== null) {
    activeShape.star.setColour(
      activeShape.colour[0],
      activeShape.colour[1],
      Math.min(100, activeShape.colour[2] + addLightness),
    );
    activeShape.star.setSize(activeShape.size + addSize);
  }

  synth.volume.value = Math.min(3, -6 + speed * 4);

  setTimeout(use, 100); // call use() again in 100 milliseconds
}

// ---------- Controls (Event Handlers) ----------
// Runs every time the pointer goes down: a click, a tap or a pen touch.

function pointerMove(event) {
  // Position of the mouse in the X and Y axis
  let currentPosX = event.clientX / window.innerWidth;
  let currentPosY = event.clientY / window.innerHeight;
  // Variable to save current time of position
  let currentTime = event.timeStamp;
  // Distance between last and current position
  let distance = Math.hypot(currentPosX - lastX, currentPosY - lastY);

  // Seconds it took to move between last and current position
  let seconds = (currentTime - lastTime) / 1000;
  // current position becomes to last position
  speed = distance / seconds;
  lastX = currentPosX;
  lastY = currentPosY;
  lastTime = currentTime;

  //console.log("Distance:", distance);
  //console.log(currentPosX, currentPosY);

  if (isPlaying === false) {
    if (speed > 5) {
      octave = 6;
    } else if (speed > 2) {
      octave = 5;
    } else {
      octave = 4;
    }
  }
  console.log("Speed:", speed, "Octave:", octave);
}

function pointerDown(event) {
  Tone.start(); // browsers only allow sound after the player has pressed something
  console.log("Pointer down at", event.clientX, event.clientY);
}

function pointerEnter(event, note) {
  isPlaying = true;
  synth.triggerAttack(note + octave);
  console.log("You entered the circle");
}

function pointerLeave(event, note) {
  isPlaying = false;
  synth.triggerRelease(note + octave);
  console.log("You left the circle");
}

// ---------- Setup ----------
// Setup is run once, at the start of the program. It sets everything up for us!
function setup() {
  update(); // start the update loop
  use(); // start the use loop

  for (const shape of allShapes) {
    shape.star = createShape(shape.id)
      .setColour(shape.colour[0], shape.colour[1], shape.colour[2])
      .setPosition(shape.position[0], shape.position[1])
      .setSize(shape.size);
  }

  // Put your event listener code here
  window.addEventListener("pointerdown", pointerDown);
  window.addEventListener("pointermove", pointerMove);

  allShapes.forEach(function (shape) {
    shape.star.element.addEventListener("pointerenter", (e) => {
      pointerEnter(e, shape.note);
      activeShape = shape;
    });
  });

  allShapes.forEach(function (shape) {
    shape.star.element.addEventListener("pointerleave", (e) => {
      pointerLeave(e, shape.note);
      activeShape = null;
      shape.star.setColour(...shape.colour);
      shape.star.setSize(shape.size);
    });
  });
}

setup(); // Always remember to call setup()!
