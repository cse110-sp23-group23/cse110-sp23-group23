// Page selectors
const lightning = document.querySelector('.lightning');

/**
 * Each time the lightning animation triggers, rotate the image by random value
 * @author Luke Sheltraw
 * @returns {int}   random angle from 0 to 360deg
 */
function getRandomAngle() {
    return Math.floor(Math.random() * 360);
}

/**
 * Each time the lightning animation triggers, rotate the image by random value
 * @author Luke Sheltraw
 * @returns none
 */
lightning.addEventListener('animationiteration', () => {
    const angle = getRandomAngle();
    lightning.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
});
    