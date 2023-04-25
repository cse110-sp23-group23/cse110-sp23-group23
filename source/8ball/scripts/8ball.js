// Page selectors
const submitBtn = document.querySelector('.submit-btn');
const questionInput = document.querySelector('.question-input');
const message = document.querySelector('.message');
const eightBall = document.querySelector('.eight-ball');
const radioButtons = document.querySelectorAll('[name=positivity-index]');
const ttsToggle = document.querySelector('#tts-button');
const medianValueInput = document.getElementById('median-value-timing');
const rangeValueInput = document.getElementById('range-value-timing');
const lightningBolts = document.querySelectorAll('.lightning');

// Constants
const animationLengthMs = 750; // length of ball shaking animation in milliseconds
const soundToggle = document.querySelector('#sound-button');
const audioElement = document.getElementById('audio');

// Objects
const msg = new SpeechSynthesisUtterance();

// Indices where good/bad responses start/end in following dict
const goodIndexEnd = 15;
const badIndexStart = 10;

// Dictionary of possible response for 8Ball
const responses = [
	'It is certain',
	'It is decidedly so',
	'Without a doubt',
	'Yes, definitely',
	'You may rely on it',
	'As I see it, yes',
	'Most likely',
	'Outlook good',
	'Yes',
	'Signs point to yes',
	'Reply hazy try again',
	'Ask again later',
	'Better not tell you now',
	'Cannot predict now',
	'Concentrate and ask again',
	"Don't count on it",
	'My reply is no',
	'My sources say no',
	'Outlook not so good',
	'Very doubtful',
];

const audioFiles = [
	'assets/thunder.wav',
	'assets/thunder2.wav',
	'assets/thunder3.wav',
	'assets/thunder4.wav',
];

/**
 * Return hash code of input string
 * @author Luke Sheltraw
 * @param {string} input    input string
 * @returns {int}           hash of the string
 */
function hash(input) {
	let hashVal = 5381;
	if (input.length === 0) return 0;
	for (let i = 0; i < input.length; i += 1) {
		const char = input.charCodeAt(i);
		hashVal = ((hashVal << 5) + hashVal) + char;
		hashVal &= hashVal;
	}
	return Math.abs(hashVal);
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
		case 1: // 0 to goodIndexEnd
			index = Math.floor(Math.random() * goodIndexEnd);
			break;
		case -1: // badIndexStart to length
			index = Math.floor(Math.random() * (responses.length - badIndexStart)) + badIndexStart;
			break;
		case 0: // all
		default:
			index = Math.floor(Math.random() * responses.length);
	}
	return responses[index];
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
	if (inputBias !== 0) {
		outputBias = inputBias;
	} else if (hash(input) % 7 <= 3) {
		outputBias = 1;
	} else {
		outputBias = -1;
	}
	return convertBiasToResponse(outputBias);
}

/**
 * Uses CSS to shake ball for a given amount of time
 * @author Luke Sheltraw, Prash Katukojwala
 * @param   {int} length    length of time in ms to shake ball
 * @returns none            displays behavior on screen
 */
function shakeBall(length) {
	lightningBolts.forEach((bolt) => bolt.classList.add('lightning-violent'));
	if (soundToggle.checked) {
		audioElement.src = audioFiles[Math.floor(Math.random() * 4)];
		audioElement.play();
	}
	eightBall.style.animation = `shake ${animationLengthMs}ms ease-out ${length / animationLengthMs}`;
	questionInput.disabled = true;
	setTimeout(() => {
		eightBall.style.animation = 'breathing 5s ease-out infinite 1s';
		lightningBolts.forEach((bolt) => bolt.classList.remove('lightning-violent'));
		questionInput.disabled = false;
		audioElement.volume.value = 0.2;
	}, length);
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
	if (voices.length === 0) {
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
	msg.text = text;
	msg.rate = 0.9; // speed of speech
	const selectedVoice = voices.find((voice) => voice.name === document.getElementById('dropdown').value);
	if (selectedVoice) {
		msg.voice = selectedVoice;
	}
	speechSynthesis.speak(msg);
}

/**
 * Function that generates a random time interval
 * using uniform distribution, rounded to account
 * for animation durations
 * @author  Marc Baeuerle, Luke Sheltraw
 * @param   {int} medianTime   expected value
 * @param   {int} rangeTime    maximum distance between values
 * @returns {int}              time in miliseconds
 */
function calcTime(medianTime, rangeTime) {
	const rawTime = medianTime + rangeTime * (Math.random() - 0.5);
	if (rawTime < 0) {
		return 0;
	}
	return Math.ceil(rawTime / animationLengthMs) * animationLengthMs;
}

/**
 * Produce a random time, check current bias status, and print/speak
 * generated response if question is validated
 * @author  Luke Sheltraw
 * @returns none
 */
let currentlyTriggered = false;
function triggerResponse() {
	if (currentlyTriggered) {
		return;
	}
	currentlyTriggered = true;
	message.textContent = '';
	const medianTime = parseInt(medianValueInput.value, 10);
	const rangeTime = parseInt(rangeValueInput.value, 10);
	const time = calcTime(medianTime, rangeTime);
	if (questionInput.value.trim()) { // if user asked a question
		shakeBall(time);
		setTimeout(() => {
			let bias = 0;
			for (let i = 0; i < radioButtons.length; i += 1) { // fetch current val of bias radio buttons
				if (radioButtons[i].checked) {
					bias = radioButtons[i].value;
					break;
				}
			}
			const output = generateResponse(questionInput.value.trim(), parseInt(bias, 10));
			message.textContent = output; // print response
			textToSpeech(output); // say response
			currentlyTriggered = false;
		}, time);
	} else { // if user left input empty
		message.textContent = 'Please ask a question!';
		currentlyTriggered = false;
	}
}

/**
 * Event listeners to trigger response when button, ball, or enter key clicked
 * @author  Luke Sheltraw
 * @returns none    full response on screen through triggerResponse()
 */
submitBtn.addEventListener('click', triggerResponse);
eightBall.addEventListener('click', triggerResponse);
questionInput.addEventListener('keydown', (event) => {
	if (event.key === 'Enter') {
		triggerResponse();
	}
});
