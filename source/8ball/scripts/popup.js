// Page selectors
const closeButton = document.getElementById('close-button');
const openButton = document.getElementById('open-button');

function openPopup() {
	openButton.classList.add('clicked');
	document.getElementById("popup").style.display = "block";
	openButton.removeEventListener('click', openPopup);
	openButton.addEventListener('click', closePopup);
}

function closePopup() {
	openButton.classList.remove('clicked');
	document.getElementById("popup").style.display = "none";
	openButton.removeEventListener('click', closePopup);
	openButton.addEventListener('click', openPopup);
}

closeButton.addEventListener('click', closePopup);
openButton.addEventListener('click', openPopup);