// Page selectors
const submitBtn = document.querySelector('.submit-btn');
const questionInput = document.querySelector('.question-input');
const message = document.querySelector('.message');
const eightBall = document.querySelector('.eight-ball');

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
 
// Pick a random response from the dictionary list
function generateResponse() {
    const index = Math.floor(Math.random() * responses.length);
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

// Trigger shakeBall() function on click of submit button
submitBtn.addEventListener('click', () => {
    if (questionInput.value.trim()) { // if user asked a question
        shakeBall();
        setTimeout(() => {
            message.textContent = generateResponse();
        }, 600);
    } else { // if user left input empty
        message.textContent = "Please ask a question!";
    }
});