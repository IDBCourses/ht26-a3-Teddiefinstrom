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
const note = "C"; // the note played when the pointer goes down
// let song =
// ["C4", "C4", "G4", "G4", "A4", "A4", "G4",
//   "F4", "F4", "E4", "E4", "D4", "D4", "C4",
//   "G4", "G4", "F4", "F4", "E4", "E4", "D4",
//   "G4", "G4", "F4", "F4", "E4", "E4", "D4",
//   "C4", "C4", "G4", "G4", "A4", "A4", "G4",
//   "F4", "F4", "E4", "E4", "D4", "D4", "C4"
// ];

let song =
["C", "C", "G", "G", "A", "A", "G",
  "F", "F", "E", "E", "D", "D", "C",
  "G", "G", "F", "F", "E", "E", "D",
  "G", "G", "F", "F", "E", "E", "D",
  "C", "C", "G", "G", "A", "A", "G",
  "F", "F", "E", "E", "D", "D", "C"
];
let count = 0;
// ---------- State ----------
// State variables are the parts of your program that change over time.
// For example: where the pointer is, how fast it's moving, or whether a drone is on.

// ---------- Sound ----------
// Make the instruments and plug them into the speakers.
const synth = new Tone.PolySynth(Tone.Synth).toDestination(); // can play several notes at once
// ---------- Update ----------
// Update the state. This is called every 100ms.
function update() {
  setTimeout(update, 100); // call update() again in 100 milliseconds
}

// ---------- Use ----------
// Use the state to make sound and move shapes. This is called every 100ms.
function use() {
  setTimeout(use, 100); // call use() again in 100 milliseconds
}

console.log(note + "4");
// ---------- Controls (Event Handlers) ----------
// Runs every time the pointer goes down: a click, a tap or a pen touch.
// function pointerDown(event) {
//   Tone.start(); // browsers only allow sound after the player has pressed something

//   console.log("Pointer down at", event.clientX, event.clientY);
//   synth.triggerAttackRelease(note, "8n"); // play the note for an eighth note
// }

function pointerEnter(event, octave) {
  //synth.triggerAttack("D4");
  console.log("You clicked on the circle", count);

  if (count < song.length) {
    synth.triggerAttackRelease(song[count] + octave, "4n");
    count++;
  } else {
    count = 0;
    synth.triggerAttackRelease(song[count] + octave, "4n");
    count++;
  }
}

function pointerLeave(event) {

  //synth.triggerRelease(song[count]);
  console.log("You left the circle", count);


}

// ---------- Setup ----------
// Setup is run once, at the start of the program. It sets everything up for us!
function setup() {
  update(); // start the update loop
  use(); // start the use loop

  // Example: a shape near the middle of the window. Replace it with your own.
  // const star1 = createShape("star1");
  // star1.setPosition(0.1, 0.5)
  // .setColour(260, 80, 81)
  // .setSize(100);
  // const star2 = createShape("star2");
  // star2.setPosition(0.25, 0.5)
  // .setColour(327, 74, 80)
  // .setSize(150);
  // const star3 = createShape("star3");
  // star3.setPosition(0.43, 0.5)
  // .setColour(203, 83, 82)
  // .setSize(125);
  // const star4 = createShape("star4");
  // star4.setPosition(0.6, 0.5)
  // .setColour(43, 100, 82)
  // .setSize(110);
  // const star5 = createShape("star5");
  // star5.setPosition(0.75, 0.5)
  // .setColour(158, 55, 78)
  // .setSize(135);

  // Put your event listener code here
  //window.addEventListener("pointerdown", pointerDown);

  // let allShapes = [
  //   { name: star1, colour: [260, 80, 81], size: 100 },
  //   { name: star2, colour: [327, 74, 80], size: 150 },
  //   { name: star3, colour: [203, 83, 82], size: 125 },
  //   { name: star4, colour: [43, 100, 82], size: 110 },
  //   { name: star5, colour: [158, 55, 78], size: 135 },
  // ];

  let allShapes = [
    // Octave 6
    { id: "star1", colour: [220, 65, 65], position: [0.1, 0.16], size: 135, octave: 6},
    { id: "star2", colour: [45, 95, 78], position: [0.25, 0.16], size: 135, octave: 6 },
    { id: "star3", colour: [235, 55, 72], position: [0.43, 0.16], size: 135, octave: 6 },
    { id: "star4", colour: [52, 90, 72], position: [0.6, 0.16], size: 135, octave: 6 },
    { id: "star5", colour: [205, 75, 78], position: [0.75, 0.16], size: 135, octave: 6 },

    // Octave 4
    { id: "star6", colour: [220, 65, 65], position: [0.1, 0.45], size: 100, octave: 4 },
    { id: "star7", colour: [45, 95, 78], position: [0.25, 0.45], size: 150, octave: 4  },
    { id: "star8", colour: [235, 55, 72], position: [0.43, 0.45], size: 125, octave: 4  },
    { id: "star9", colour: [52, 90, 72], position: [0.6, 0.45], size: 110, octave: 4  },
    { id: "star10", colour: [205, 75, 78], position: [0.75, 0.45], size: 135, octave: 4  },

      // Octave 2
    { id: "star11", colour: [220, 65, 65], position: [0.1, 0.72], size: 100, octave: 3 },
    { id: "star12", colour: [45, 95, 78], position: [0.25, 0.72], size: 150, octave: 3 },
    { id: "star13", colour: [235, 55, 72], position: [0.43, 0.72], size: 125, octave: 3 },
    { id: "star14", colour: [52, 90, 72], position: [0.6, 0.72], size: 110, octave: 3 },
    { id: "star15", colour: [205, 75, 78], position: [0.75, 0.72], size: 135, octave: 3 },
  ];

  for (const shape of allShapes) {
    shape.star = createShape(shape.id)
      .setColour(shape.colour[0], shape.colour[1], shape.colour[2])
      .setPosition(shape.position[0], shape.position[1])
      .setSize(shape.size);
  }

  allShapes.forEach(function (shape) {
    shape.star.element.addEventListener("pointerenter", (e) => {
      pointerEnter(e, shape.octave);
      shape.star.setColour(
        shape.colour[0],
        shape.colour[1],
        shape.colour[2] + 15,
      );
      shape.star.setSize(shape.size + 25);
    });
  });

  allShapes.forEach(function (shape) {
    shape.star.element.addEventListener("pointerleave", (e) => {
      pointerLeave(e);
      shape.star.setColour(...shape.colour);
      shape.star.setSize(shape.size);
    });
  });
}

setup(); // Always remember to call setup()!
