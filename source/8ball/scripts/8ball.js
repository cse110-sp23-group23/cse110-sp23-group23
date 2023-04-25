// Page selectors
const submitBtn = document.querySelector('.submit-btn');
const questionInput = document.querySelector('.question-input');
const message = document.querySelector('.message');
const eightBall = document.querySelector('.eight-ball');
const positivityValue = document.getElementById('');
const radioButtons = document.getElementsByName('positivity-index');
const ttsToggle = document.querySelector('#tts-button');
const medianValueInput = document.getElementById("median-value-timing");
const rangeValueInput = document.getElementById("range-value-timing");
const lightningBolts = document.getElementsByClassName("lightning");

// Constants
const animationLengthMs = 750; // length of ball shaking animation in milliseconds
const soundToggle = document.querySelector('#sound-button');
const audioElement = document.getElementById("audio");

// Objects
const msg = new SpeechSynthesisUtterance();

// Indices where good/bad responses start/end in following dict
const goodIndexEnd = 15;
const badIndexStart = 10;

// Dictionary of possible response for 8Ball
const responses = [
    "It is certain",
    "It is decidedly so",
    "Without a doubt",
    "Yes, definitely",
    "You may rely on it",
    "As I see it, yes",
    "Most likely",
    "Outlook good",
    "Yes",
    "Signs point to yes",
    "Reply hazy try again",
    "Ask again later",
    "Better not tell you now",
    "Cannot predict now",
    "Concentrate and ask again",
    "Don't count on it",
    "My reply is no",
    "My sources say no",
    "Outlook not so good",
    "Very doubtful"
];

const audioFiles = [
    "assets/thunder.wav",
    "assets/thunder2.wav",
    "assets/thunder3.wav",
    "assets/thunder4.wav"
];

/**
 * Return hash code of input string
 * @author Luke Sheltraw
 * @param {string} input    input string
 * @returns {int}           hash of the string
 */
function hash(input) {
    let hash = 5381;
    if (input.length == 0) return 0;
    for (i = 0; i < input.length; i++) {
        char = input.charCodeAt(i);
        hash = ((hash << 5) + hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash);
}
 
/**
 * Hash input string to determine if response should be positive or negative,
 * and then call to convertBiasToResponse() for string answer
 * @author Luke Sheltraw
 * @param {string} input    question asked in text field
 * @param {int} inputBias   1 represents positive, 0 neutral, and -1 negative
 * @returns {string}        string representing the message to be printed to the 8ball
 */
function generateResponse(input, inputBias) {
    let outputBias;
    if ((hash(input) % 7 <= 3) && (inputBias != "-1")) {
        outputBias = "1";
    } else {
        outputBias = "-1";
    }
    return convertBiasToResponse(outputBias);
}

/**
 * Based on positive/negative bias, return a valid response (possibly inconclusive)
 * @author Luke Sheltraw
 * @param {int} bias   1 represents positive, 0 neutral, and -1 negative
 * @returns {string}        string representing the message to be printed to the 8ball
 */
function convertBiasToResponse(bias) {
    let index;
    switch (bias) {
        case "1": // 0 to goodIndexEnd
            index = Math.floor(Math.random() * goodIndexEnd);
            break;
        case "-1": // badIndexStart to length
            index = Math.floor(Math.random() * (responses.length - badIndexStart)) + badIndexStart;
            break;
        case "0": // all
        default: 
            index = Math.floor(Math.random() * responses.length);
    }
    return responses[index];
}

/**
 * Uses CSS to shake ball for a given amount of time
 * @author Luke Sheltraw, Prash Katukojwala
 * @param   {int} length    length of time in ms to shake ball
 * @returns none            displays behavior on screen
 */
function shakeBall(length) {
    for (let i = 0; i < lightningBolts.length; i++) {
        lightningBolts[i].classList.add('lightning-violent');
    }
    if (soundToggle.checked) {
        const audioIndex = Math.floor(Math.random() * 4);
        audioElement.src = audioFiles[audioIndex];
        audioElement.play();
    }
    eightBall.style.animation = `shake ${animationLengthMs}ms ease-out ${length / animationLengthMs}`;
    questionInput.disabled = true;
    setTimeout(() => {
        eightBall.style.animation ='breathing 5s ease-out infinite 1s';
        for (let i = 0; i < lightningBolts.length; i++) {
            lightningBolts[i].classList.remove('lightning-violent');
        }
        questionInput.disabled = false;
        audioElement.volume.value = 0.2;
    }, length);
}

/**
 * Produce a random time, check current bias status, and print/speak 
 * generated response if question is validated
 * @author  Luke Sheltraw
 * @returns none    
 */
function triggerResponse() {
    message.textContent = '';
    let medianTime = parseInt(medianValueInput.value);
    let rangeTime = parseInt(rangeValueInput.value);
    let time = Math.ceil(randomTime(medianTime - (rangeTime / 2), medianTime + (rangeTime / 2))
        / animationLengthMs) * animationLengthMs; // fetch current vals of timing input and round to multiple of animation length
    if (questionInput.value.trim()) { // if user asked a question
        shakeBall(time);
        setTimeout(() => {
            let bias = 0;
            for (let i = 0; i < radioButtons.length; i++) { // fetch current val of bias radio buttons
                if (radioButtons[i].checked) {
                    bias = radioButtons[i].value;
                }
            }
            let output = generateResponse(questionInput.value.trim(), bias); // pick response
            message.textContent = output; // print response
            textToSpeech(output); // say response
        }, time);
    } else { // if user left input empty
        message.textContent = "Please ask a question!";
    }
}

/**
 * Function that generates a random time interval 
 * between low and high
 * @author  Marc Baeuerle, Luke Sheltraw
 * @param   {int} low   minimum reachable value in ms
 * @param   {int} high  maximum reachable value in ms 
 * @returns {int}       time in miliseconds
 */
function randomTime(low, high) {
    return Math.random() * (high - low) + low;
}

/**
 * For use with textToSpeech(), repeatedly attempts to load voices 
 * list until success
 * @author Luke Sheltraw
 * @returns none    side-effect of modifying voices array with new vals
 */
let voices = [];
function populateVoiceList() {
    voices = speechSynthesis.getVoices();
    if (voices.length == 0) {
        setTimeout(populateVoiceList, 100);
    }
}

// Update list on change
speechSynthesis.onvoiceschanged = populateVoiceList;

/**
 * Text to speech that reads input in 
 * currently selected voice
 * @author  Marc Baeuerle, Luke Sheltraw
 * @param   {String} text   text to be read
 * @returns none            just reads out text
 */
function textToSpeech(text) {
    if (!ttsToggle.checked) {
        return;
    }
    let msg = new SpeechSynthesisUtterance();
    msg.text = text;
    msg.rate = 0.9; // speed of speech
    let selectedVoice = voices.find(voice => voice.name === document.getElementById('dropdown').value);
    if (selectedVoice) {
        msg.voice = selectedVoice;
    } else {
        console.warn("Selected voice not available. Using default voice.");
    }
    speechSynthesis.speak(msg);
    return;
}

/**
 * Event listeners to trigger response when button, ball, or enter key clicked 
 * @author  Luke Sheltraw
 * @returns none    full response on screen through triggerResponse()
 */
submitBtn.addEventListener('click', triggerResponse);
eightBall.addEventListener('click', triggerResponse);
questionInput.addEventListener('keydown', (event) => {
    if (event.keyCode == 13) { // enter key
        triggerResponse();
    }
});