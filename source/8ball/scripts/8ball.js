// Page selectors
const submitBtn = document.querySelector('.submit-btn');
const questionInput = document.querySelector('.question-input');
const message = document.querySelector('.message');
const eightBall = document.querySelector('.eight-ball');
const positivityValue = document.getElementById('');
const radioButtons = document.getElementsByName('positivity-index');
const ttsToggle = document.querySelector('#tts-button');
const minValueInput = document.getElementById("min-value-timing");
const rangeValueInput = document.getElementById("range-value-timing");

// Objects
const sessionDate = new Date();
const msg = new SpeechSynthesisUtterance();

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

// Hash code generator for string 
function hash(input) {
    let hash = 0;
    if (input.length == 0) return hash;
    for (i = 0; i < input.length; i++) {
        char = input.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash;
}
 
// Pick a seeded response from dictionary list based on string hash, current time, and bias
function generateResponse(input, bias) {
    const hashVal = hash(input) * sessionDate.getHours();
    let index;
    switch (bias) {        
        case "1": // 0 to goodIndexEnd
            index = (hashVal % goodIndexEnd + goodIndexEnd) % goodIndexEnd;
            break;
        case "-1": // badIndexStart to length
            index = (hashVal % (responses.length - badIndexStart) + 
                (responses.length - badIndexStart)) % ((responses.length - badIndexStart)) + badIndexStart;
            break;
        case "0": // all
        default:
            index = (hashVal % responses.length + responses.length) % responses.length;
            break;
    }
    return responses[index];
}
    
// Clear the message when focusing on the input field
questionInput.addEventListener('focus', () => {
    message.textContent = '';
});

// Trigger shake animation on button click
function shakeBall(length) {
    eightBall.style.animation = `shake ${length}ms linear 1`;
    setTimeout(() => {
        eightBall.style.animation = 'none';
    }, length);
}

// Trigger shakeBall() function on click of submit button of enter press
function triggerResponse() {
    let time = randomTime(minValueInput.value, parseInt(minValueInput.value) + parseInt(rangeValueInput.value));
    if (questionInput.value.trim()) { // if user asked a question
        shakeBall(time);
        setTimeout(() => {
            let bias = 0;
            for (let i = 0; i < radioButtons.length; i++) {
                if (radioButtons[i].checked) {
                    bias = radioButtons[i].value;
                }
            }
            let output = generateResponse(questionInput.value.trim(), bias);
            message.textContent = output;
            textToSpeech(output);
        }, time);
    } else { // if user left input empty
        message.textContent = "Please ask a question!";
    }
}

/**
 * Function that generates a random time interval 
 * between low and high
 * @author Marc Baeuerle, Luke Sheltraw
 * @param   {int} low   minimum reachable value in ms
 * @param   {int} high  maximum reachable value in ms 
 * @returns {int}   time in miliseconds
 */
function randomTime(low, high) {
    return Math.random() * (high - low) + low;
}


/**
 * Text to speech that reads input in 
 * 'US English Male' voice
 * @author  Marc Baeuerle
 * @param   {String}    text    Text to be read
 * @returns none    just reads out text
 */
function textToSpeech(text) {
    if (!ttsToggle.checked) {
        return;
    }
    msg.text = text;
    msg.rate = 0.9;     //speed of speech
    msg.voice = speechSynthesis.getVoices().find(voice => voice.name === 'Google US English Male');
    speechSynthesis.speak(msg);
    return;
}

/**
 * Event listeners to trigger response when button or enter key clicked 
 * @author  Luke Sheltraw
 * @param   none    takes keyboard/mouse input
 * @returns none    full response on screen through triggerResponse()
 */
submitBtn.addEventListener('click', triggerResponse);
questionInput.addEventListener('keydown', (event) => {
    if (event.keyCode == 13) { // enter key
        triggerResponse();
        document.activeElement.blur(); // lose focus on text box
    }
});