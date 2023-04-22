// Page selectors
const lightning = document.querySelector('.lightning');

// Return random angle for lightning
function getRandomAngle() {
    return Math.floor(Math.random() * 360);
}

// Each time the lightning animation triggers, rotate the image by random value
lightning.addEventListener('animationiteration', () => {
    const angle = getRandomAngle();
    lightning.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
});
    