// Page selectors
const closeButton = document.getElementById('close-button');
const openButton = document.getElementById('open-button');
const popup = document.getElementById("popup");

/**
 * Display popup to screen, and remap control of buttons to close it
 * @author Luke Sheltraw
 * @returns none
 */
function openPopup() {
	openButton.classList.add('clicked');
	popup.style.display = "block";
}

/**
 * Hide popup from screen, and remap controls of buttons to open it
 * @author Luke Sheltraw
 * @returns none
 */
function closePopup() {
	openButton.classList.remove('clicked');
	popup.style.display = "none";
}

/**
 * Toggle display of popup by calling respective open/close function
 * based on current values
 * @author Luke Sheltraw
 * @returns none
 */
function togglePopup() {
	if (popup.style.display == "block") {
		closePopup();
	} else {
		openPopup();
	}
}

// Event listeners to trigger above calls
closeButton.addEventListener('click', closePopup);
openButton.addEventListener('click', togglePopup);
document.addEventListener('keydown', (event) => {
    if (event.keyCode == 27) { // esc key
        togglePopup();
    }
});