// Page selectors
const closeButton = document.getElementById('close-button');
const openButton = document.getElementById('open-button');

/**
 * Display popup to screen, and remap control of buttons to close it
 * @author Luke Sheltraw
 * @returns none
 */
function openPopup() {
	openButton.classList.add('clicked');
	document.getElementById("popup").style.display = "block";
	openButton.removeEventListener('click', openPopup);
	openButton.addEventListener('click', closePopup);
}

/**
 * Hide popup from screen, and remap controls of buttons to open it
 * @author Luke Sheltraw
 * @returns none
 */
function closePopup() {
	openButton.classList.remove('clicked');
	document.getElementById("popup").style.display = "none";
	openButton.removeEventListener('click', closePopup);
	openButton.addEventListener('click', openPopup);
}

// Event listeners to trigger above calls
closeButton.addEventListener('click', closePopup);
openButton.addEventListener('click', openPopup);