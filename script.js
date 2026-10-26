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
const note = "C4"; // the note played when the pointer goes down
const song = ["C4", "C4", "G4", "G4", "A4", "A4", "G4"];
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

// ---------- Controls (Event Handlers) ----------
// Runs every time the pointer goes down: a click, a tap or a pen touch.
// function pointerDown(event) {
//   Tone.start(); // browsers only allow sound after the player has pressed something

//   console.log("Pointer down at", event.clientX, event.clientY);
//   synth.triggerAttackRelease(note, "8n"); // play the note for an eighth note
// }

function pointerEnter(event) {
  //synth.triggerAttack("D4");
  console.log("You clicked on the circle", count);

  if (count < song.length) {
    synth.triggerAttack(song[count]);
     count++
  } else {
    count = 0;
    synth.triggerAttack(song[count]);
    count++
  }
}

function pointerLeave(event) {
  //synth.triggerRelease(song[count]);
  console.log("You left the circle", count);

  synth.triggerRelease(song);

}

// ---------- Setup ----------
// Setup is run once, at the start of the program. It sets everything up for us!
function setup() {
  update(); // start the update loop
  use(); // start the use loop

  // Example: a shape near the middle of the window. Replace it with your own.
  const star1 = createShape("star1");
  star1.setPosition(0.5, 0.5);
  star1.setColour(260, 80, 81);
  star1.setSize(100);
  const star2 = createShape("star2");
  star2.setPosition(0.4, 0.4);
  star2.setColour(327, 74, 80);
  star2.setSize(150);
  const star3 = createShape("star3");
  star3.setPosition(0.3, 0.3);
  star3.setColour(203, 83, 82);
  star3.setSize(125);
  const star4 = createShape("star4");
  star4.setPosition(0.2, 0.2);
  star4.setColour(43, 100, 82);
  star4.setSize(110);

  // Put your event listener code here
  //window.addEventListener("pointerdown", pointerDown);

  let allShapes = [
    { name: star1, colour: [260, 80, 81], size: 100 },
    { name: star2, colour: [327, 74, 80], size: 150 },
    { name: star3, colour: [203, 83, 82], size: 125 },
    { name: star4, colour: [43, 100, 82], size: 110 },
  ];

  allShapes.forEach(function (shape) {
    shape.name.element.addEventListener("pointerenter", (e) => {
      pointerEnter(e);
      shape.name.setColour(
        shape.colour[0],
        shape.colour[1],
        shape.colour[2] + 15,
      );
      shape.name.setSize(shape.size + 25);
    });
  });

  allShapes.forEach(function (shape) {
    shape.name.element.addEventListener("pointerleave", (e) => {
      pointerLeave(e);
      shape.name.setColour(...shape.colour);
      shape.name.setSize(shape.size);
    });
  });
}

setup(); // Always remember to call setup()!
