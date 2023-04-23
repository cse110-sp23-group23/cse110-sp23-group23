const closeButton = document.getElementById('close-button');
const openButton = document.getElementById('open-button');

function openPopup() {
	document.getElementById("popup").style.display = "block";
}

function closePopup() {
	document.getElementById("popup").style.display = "none";
}

closeButton.addEventListener('click', closePopup);
openButton.addEventListener('click', openPopup);