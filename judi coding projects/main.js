
// !!!!!! pls do not mind the notes, it is for my understanding
// also pls do not mind the ugliness of the page, i am working on making it pretty
//  and functional but i want to fix my audio component first! thanks
// - judi


let counterOne = 0
let counterTwo = 0
let counterThree = 0
let counterFour = 0

let isTransportStartedOne = false;
let isTransportStartedTwo = false;
let isTransportStartedThree = false;
let isTransportStartedFour = false;



// Define separate toggle functions for each quadrant
function toggleOne() {
    if (isTransportStartedOne) {
        Tone.Transport.stop();
        isTransportStartedOne = false;
    } else {
        Tone.Transport.start();
        isTransportStartedOne = true;
    }
}

function toggleTwo() {
    if (isTransportStartedTwo) {
        Tone.Transport.stop();
        isTransportStartedTwo = false;
    } else {
        Tone.Transport.start();
        isTransportStartedTwo = true;
    }
}

function toggleThree() {
    if (isTransportStartedThree) {
        Tone.Transport.stop();
        isTransportStartedThree = false;
    } else {
        Tone.Transport.start();
        isTransportStartedThree = true;
    }
}

function toggleFour() {
    if (isTransportStartedFour) {
        Tone.Transport.stop();
        isTransportStartedFour = false;
    } else {
        Tone.Transport.start();
        isTransportStartedFour = true;
    }
}

// BPM of the notes in the arrays
Tone.Transport.bpm.value = 45;

// a Tone.js synthesizer is created and connected to the default audio destination
const synth = new Tone.Synth().toDestination()
synth.volume.value = 0 // volume in decibals

// these are arrays, use different notes for each quadrant!
const notesTopLeft = ['C3', 'E3', 'G3', 'B3']

const notesTopRight = ['D3', 'F3', 'A3', 'C3s']

const notesBottomRight = ['E3', 'G3', 'B3', 'D3']

const notesBottomLeft= ['A3', 'C3', 'E3', 'G3']

// I have four functions that correspond to each quadrant I will be playing music from

function playOne (time) {
    const notes = notesTopLeft[counterOne % notesTopLeft.length]
    synth.triggerAttackRelease(notes, '4n', time)
    counterOne++; // increase counter by 1
    // this schedules the release of the note after the specified duration

}
 
function playTwo (time) {
    const notesTwo = notesTopRight[counterTwo % notesTopRight.length]
    synth.triggerAttackRelease(notesTwo, '8n', time)
    counterTwo++ // increase counter by 1


}

function playThree (time) {
    const notesThree = notesBottomRight[counterThree % notesBottomRight.length]
    synth.triggerAttackRelease(notesThree, '8n', time)
    counterThree++ // increase counter by 1
}

function playFour (time) {
    const notesFour = notesBottomLeft[counterFour % notesBottomLeft.length]
    synth.triggerAttackRelease(notesFour, '8n', time)
    counterFour++ // increase counter by 1


}

// this code contains functions that run the arrays in a specified amount of 
// time

  
Tone.Transport.scheduleRepeat(time => playOne(time), '8n')
const topLeft= document.getElementById('topLeft');
topLeft.addEventListener('click', toggle);

Tone.Transport.scheduleRepeat(time => playTwo(time), '8n')
const topRight= document.getElementById('topRight');
topRight.addEventListener('click', toggle);

Tone.Transport.scheduleRepeat(time => playThree(time), '8n')
const bottomLeft= document.getElementById('bottomLeft');
bottomLeft.addEventListener('click', toggle);

Tone.Transport.scheduleRepeat(time => playFour(time), '8n')
const bottomRight= document.getElementById('bottomRight');
bottomRight.addEventListener('click', toggle);




// controls the playback of your audio, whether its started or not
// it starts or stops the metronome
function toggle () {
    if (Tone.Transport.state === 'started') {
    Tone.Transport.stop()
    } else {
    Tone.Transport.start()
    }
}
// BPM of the notes in the arrays


 // to capture the user's "permission" to play sound algorithmically
 nn.get('#enter').on('click', async () => {
    await Tone.start() // to restart AudioContext in Tone.js
    nn.get('#curtain').css({ display: 'none' }) // hide curtain
  })

