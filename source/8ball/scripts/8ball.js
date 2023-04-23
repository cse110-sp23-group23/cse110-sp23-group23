// Page selectors
const submitBtn = document.querySelector('.submit-btn');
const questionInput = document.querySelector('.question-input');
const message = document.querySelector('.message');
const eightBall = document.querySelector('.eight-ball');
const ttsToggle = document.querySelector('#tts-button');

const sessionDate = new Date();
const msg = new SpeechSynthesisUtterance();

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
 
// Pick a seeded response from dictionary list based on string hash and current time
function generateResponse(input) {
    const hashVal = hash(input) * sessionDate.getHours();
    const index = (hashVal % responses.length + responses.length) % responses.length; // twice mod to avoid negative
    return responses[index];
}
    
// Clear the message when focusing on the input field
questionInput.addEventListener('focus', () => {
    message.textContent = '';
});

// Trigger shake animation on button click
function shakeBall() {
    eightBall.classList.add('shake');
    setTimeout(() => {
        eightBall.classList.remove('shake');
    }, 600);
}

// Trigger shakeBall() function on click of submit button of enter press
function triggerResponse() {
    if (questionInput.value.trim()) { // if user asked a question
        shakeBall();
        setTimeout(() => {
            let output = generateResponse(questionInput.value.trim());
            message.textContent = output;
            

            textToSpeech(output);



        }, randomTime());
    } else { // if user left input empty
        message.textContent = "Please ask a question!";
    }
}

/**
 * Function that generates a random time interval 
 * between 500ms and 1500ms
 * @author Marc Baeuerle
 * @param   none    
 * @returns {int}   time in miliseconds
 */
function randomTime() {
    let time = Math.random() * (1500 - 500) + 500;
    return time;
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

// Button clicked
submitBtn.addEventListener('click', triggerResponse);

// Enter key pressed
questionInput.addEventListener('keydown', (event) => {
    if (event.keyCode == 13) {
        triggerResponse();
        document.activeElement.blur();
    }
})