// Page selectors
const lightning = document.querySelectorAll('.lightning');

/**
 * Each time the lightning animation triggers, rotate the image by random value
 * @author Luke Sheltraw
 * @returns {int}   random angle from 0 to 360deg
 */
function getRandomAngle() {
	return Math.floor(Math.random() * 360);
}

/**
 * Each time the lightning animation triggers, rotate the images by random value
 * @author Luke Sheltraw
 * @returns none
 */
for (let i = 0; i < lightning.length; i += 1) {
	lightning[i].addEventListener('animationiteration', () => {
		lightning[i].style.transform = `translate(-50%, -50%) rotate(${getRandomAngle()}deg)`;
	});
}
