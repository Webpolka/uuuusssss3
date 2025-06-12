const liveArray = [
	"t",
	"Владимир, улица Мира, 32",
	"Владимир, ул. Мира, 32",
	"г. Владимир, ул. Мира, д. 32",
	"Город Владимир, улица Мира, дом 32",
	"г. Владимир, улица Мира, дом номер 32",
	"Дом номер 32 по улице Мира во Владимире",
	"Во Владимире, на улице Мира, в доме под номером 32",
	"Улица Мира, 32, город Владимир",
	"во Владимире, на улице Мира, в доме 32",
	"Владимир, Мира, 32",
];
const workArray = [
	"t",
	"Владимир, улица Мира, 32",
	"Владимир, ул. Мира, 32",
	"г. Владимир, ул. Мира, д. 32",
	"Город Владимир, улица Мира, дом 32",
	"г. Владимир, улица Мира, дом номер 32",
	"Дом номер 32 по улице Мира во Владимире",
	"Во Владимире, на улице Мира, в доме под номером 32",
	"Улица Мира, 32, город Владимир",
	"во Владимире, на улице Мира, в доме 32",
	"Владимир, Мира, 32",
];
const contactsArray = [
	"t",
	"+7 (904) 567-32-18, hairdresser.alina.hair@gmail.com",
	"телефон +7 (904) 567-32-18, электронная почта hairdresser.alina.hair@gmail.com",
	"+7 904 567 32 18, hairdresser.alina.hair@gmail.com",
	"телефон 7 (904) 567-32-18, email hairdresser.alina.hair@gmail.com",
	"телефон: 7 (904) 567-32-18, email: hairdresser.alina.hair@gmail.com",
	"телефон: +7 (904) 567-32-18, email: hairdresser.alina.hair@gmail.com",
	"телефон +7 (904) 567-32-18, email hairdresser.alina.hair@gmail.com",
	"89045673218, hairdresser.alina.hair@gmail.com",
	"8 904 567 32 18, hairdresser.alina.hair@gmail.com",
	"телефон 89045673218, электронная почта hairdresser.alina.hair@gmail.com",
	"телефон 8 904 567 32 18, электронная почта hairdresser.alina.hair@gmail.com",
	"телефон: 8 904 567 32 18, электронная почта: hairdresser.alina.hair@gmail.com",
	"телефон: 89045673218, электронная почта: hairdresser.alina.hair@gmail.com",
	"телефон: 8 904 567 32 18, email: hairdresser.alina.hair@gmail.com",
	"телефон: 89045673218, email: hairdresser.alina.hair@gmail.com",
	"тел. 8 904 567 32 18, эл.почта hairdresser.alina.hair@gmail.com",
	"тел. 89045673218, эл.почта hairdresser.alina.hair@gmail.com",
	"тел. 7 (904) 567-32-18, эл.почта hairdresser.alina.hair@gmail.com",
	"тел. +7 (904) 567-32-18, эл.почта hairdresser.alina.hair@gmail.com",
];

const textInputLive = document.getElementById("textInputLive");
const textInputWork = document.getElementById("textInputWork");
const textInputContacts = document.getElementById("textInputContacts");

const submitLiveButton = document.getElementById("submitLiveButton");
const submitWorkButton = document.getElementById("submitWorkButton");
const submitContactsButton = document.getElementById("submitContactsButton");

const body = document.querySelector('body');
const resumePopup = document.querySelector("#resume-popup");

const openResume = document.querySelector('#resume-open');
const closeResume = document.querySelector("#resume-close");

openResume.addEventListener("click", function () {
	resumePopup.classList.add("show");
	body.classList.add('no-scroll');
});
closeResume.addEventListener("click", function () {
	resumePopup.classList.remove("show");
	body.classList.remove('no-scroll');	
});

textInputLive.addEventListener("input", function () {
	const inputValue = textInputLive.value.trim();
	if (liveArray.includes(inputValue)) {
		submitLiveButton.classList.add("green-background");
	} else {
		submitLiveButton.classList.remove("green-background");
	}
});

textInputWork.addEventListener("input", function () {
	const inputValue = textInputWork.value.trim();
	if (workArray.includes(inputValue)) {
		submitWorkButton.classList.add("green-background");
	} else {
		submitWorkButton.classList.remove("green-background");
	}
});

textInputContacts.addEventListener("input", function () {
	const inputValue = textInputContacts.value.trim();
	if (contactsArray.includes(inputValue)) {
		submitContactsButton.classList.add("green-background");
	} else {
		submitContactsButton.classList.remove("green-background");
	}
});
