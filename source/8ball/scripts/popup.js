// Page selectors
const closeButton = document.getElementById('close-button');
const openButton = document.getElementById('open-button');

function openPopup() {
	openButton.classList.add('clicked');
	document.getElementById("popup").style.display = "block";
}

function closePopup() {
	openButton.classList.remove('clicked');
	document.getElementById("popup").style.display = "none";
}

closeButton.addEventListener('click', closePopup);
openButton.addEventListener('click', openPopup);