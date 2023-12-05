/* global tone, nn */

const synth = new Tone.Synth().toDestination()
synth.volume.value = 0 // volume in decibals

// using tone.js freeverb to add reverb to the arpeggiated chords in the second/ colored page
const reverb = new Tone.Freeverb().toDestination()
synth.connect(reverb)
reverb.dampening.value = 2000

const delay = new Tone.FeedbackDelay('8n', 0.5).toDestination();
synth.connect(delay)

// BPM of the notes being played in the arrays
Tone.Transport.bpm.value = 120


// general structure: initial variables should go first.................................
const state = {
    counter: 0,
    quad: null, // 0, 1, 2, 3 for quadrants clock-wise starting from top left
    notes: [
        ['C3', 'E3', 'G3', 'B3'],
        ['D3', 'F3', 'A3', 'C3#'],
        ['E3', 'G3', 'B3', 'D3'],
        ['A3', 'C3', 'E3', 'G3']
    ],
    lens: [
        '4n',
        '8n',
        '8n',
        '8n',
    ]
}

const notesTopLeft = ['C3', 'E3', 'G3', 'B3']
const notesTopRight = ['D3', 'F3', 'A3', 'C3#']
const notesBottomRight = ['E3', 'G3', 'B3', 'D3']
const notesBottomLeft= ['A3', 'C3', 'E3', 'G3']


// getting the textbox element

const userInput = document.getElementById('userInput')
console.log(userInput)

const textBox = document.querySelector('.textBox');

// functions........................................

function play (time) {
    if (state.quad !== null) {
        const notes = state.notes[state.quad]
        const n = notes[state.counter % notes.length]
        const l = state.lens[state.quad]
        synth.triggerAttackRelease(n, l, time)
        console.log('just played', n,l)
    }
    state.counter++ 
    // increases state counter by 1 
}

function quadClick (idx) {
    if (state.quad === idx) {
        Tone.Transport.stop()
        console.log('stopped playing')
    } else {
        state.quad = idx;
        Tone.Transport.start()
        console.log('playing quad', state.quad, state.notes[state.quad])
    }

}

function update(e) {
    // This function allows the user to adjust the reverb parameters based on cursor position
    const xPercentage = e.x / nn.width;
    const yPercentage = e.y / nn.height;

    reverb.dampening.value = nn.map(xPercentage, 0, 0.2, 0.1, 0.2); // Adjust dampening based on x position
    reverb.roomSize.value = nn.map(yPercentage, 0, 0.2, 0.1, 0.2); // Adjust room size based on y position

    delay.delayTime.value = nn.map(xPercentage, 0, 0.3, 0, 0.2); 
    delay.feedback.value = nn.map(yPercentage, 0, 0.3, 0.1, 0.2); 
}

// This function is used to modify the current tempo of the notes and lessen it when the character count is
// a multiple of 50.
function updateTempoOnCharacterCount () {
    const characterCount = userInput.value.length

    if (characterCount > 0 && characterCount % 50 === 0) {
        const characterCountMultipleOf50 = Math.floor(characterCount /50)
        const newTempo = Math.max(50, 90 - (characterCountMultipleOf50 * 20))
        Tone.Transport.bpm.value = newTempo

        if (newTempo < 50) {
            Tone.Transport.stop()
        }
    }
}

if (userInput) {
    userInput.addEventListener('input', updateTempoOnCharacterCount) }
    else{
        console.error('could not find the element with id userinput')
    }

// event listeners............................................
nn.on('mousemove', update);

nn.getAll('.button-container > button').forEach((ele, idx) => { 
    ele.on('click', () => quadClick(idx))
    })
  
Tone.Transport.scheduleRepeat(time => play(time), '8n')

 // to capture the user's "permission" to play sound algorithmically
 nn.get('#enter').on('click', async () => {
    await Tone.start() // to restart AudioContext in Tone.js
    nn.get('#curtain').css({ display: 'none' }) // hide curtain
  })
  
userInput.addEventListener('input', updateTempoOnCharacterCount)


