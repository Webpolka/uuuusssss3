class HackHunter {
	constructor(options) {
		// Default options for current class
		const defaultConfig = {
			liveArray: [
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
			],
			workArray: [
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
			],
			contactsArray: [
				"+7 (904) 567-32-18, alina.hair.studio@gmail.com",
				"телефон +7 (904) 567-32-18, электронная почта alina.hair.studio@gmail.com",
				"+7 904 567 32 18, alina.hair.studio@gmail.com",
				"телефон 7 (904) 567-32-18, email alina.hair.studio@gmail.com",
				"телефон: 7 (904) 567-32-18, email: alina.hair.studio@gmail.com",
				"телефон: +7 (904) 567-32-18, email: alina.hair.studio@gmail.com",
				"телефон +7 (904) 567-32-18, email alina.hair.studio@gmail.com",
				"89045673218, alina.hair.studio@gmail.com",
				"8 904 567 32 18, alina.hair.studio@gmail.com",
				"телефон 89045673218, электронная почта alina.hair.studio@gmail.com",
				"телефон 8 904 567 32 18, электронная почта alina.hair.studio@gmail.com",
				"телефон: 8 904 567 32 18, электронная почта: alina.hair.studio@gmail.com",
				"телефон: 89045673218, электронная почта: alina.hair.studio@gmail.com",
				"телефон: 8 904 567 32 18, email: alina.hair.studio@gmail.com",
				"телефон: 89045673218, email: alina.hair.studio@gmail.com",
				"тел. 8 904 567 32 18, эл.почта alina.hair.studio@gmail.com",
				"тел. 89045673218, эл.почта alina.hair.studio@gmail.com",
				"тел. 7 (904) 567-32-18, эл.почта alina.hair.studio@gmail.com",
				"тел. +7 (904) 567-32-18, эл.почта alina.hair.studio@gmail.com",
			],

			// DOM elements
			inputLiveID: "textInputLive",
			inputWorkID: "textInputWork",
			inputContactsID: "textInputContacts",

			formLiveID: "formLive",
			formWorkID: "formWork",
			formContactsID: "formContacts",

			submitLiveID: "submitLiveButton",
			submitWorkID: "submitWorkButton",
			submitContactsID: "submitContactsButton",

			endLevelID: "end-level",

			resumePopupID: "resume-popup",
			resumeOpenID: "resume-open",
			resumeCloseID: "resume-close",
		};

		this.options = Object.assign(defaultConfig, options);

		this.body = document.querySelector("body");

		this.textInputLive = document.getElementById(this.options.inputLiveID);
		this.textInputWork = document.getElementById(this.options.inputWorkID);
		this.textInputContacts = document.getElementById(this.options.inputContactsID);

		this.formLive = document.getElementById(this.options.formLiveID);
		this.formWork = document.getElementById(this.options.formWorkID);
		this.formContacts = document.getElementById(this.options.formContactsID);

		this.submitLiveButton = document.getElementById(this.options.submitLiveID);
		this.submitWorkButton = document.getElementById(this.options.submitWorkID);
		this.submitContactsButton = document.getElementById(this.options.submitContactsID);

		this.endLevel = document.getElementById(this.options.endLevelID);

		this.resumePopup = document.getElementById(this.options.resumePopupID);
		this.openResume = document.getElementById(this.options.resumeOpenID);
		this.closeResume = document.getElementById(this.options.resumeCloseID);

		this.score = {
			live: 0,
			work: 0,
			contact: 0,
		};

		this.submited = {
			live: 0,
			work: 0,
			contact: 0,
		};
	}

	// Start script
	start() {
		this.inputsListener();
		this.popupListener();
		this.formsListener();
	}

	// Inputs value listener
	inputsListener() {
		// Where does she live ?
		this.textInputLive.addEventListener("input", () => {
			const inputValue = this.textInputLive.value.trim();
			if (this.options.liveArray.includes(inputValue)) {
				this.submitLiveButton.classList.add("success");
				this.score.live = 15;
			} else {
				this.submitLiveButton.classList.remove("success");
				this.score.live = null;
			}
		});

		// Where does she working ?
		this.textInputWork.addEventListener("input", () => {
			const inputValue = this.textInputWork.value.trim();
			if (this.options.workArray.includes(inputValue)) {
				this.submitWorkButton.classList.add("success");
				this.score.work = 15;
			} else {
				this.submitWorkButton.classList.remove("success");
				this.score.work = null;
			}
		});

		// Contacts
		this.textInputContacts.addEventListener("input", () => {
			const inputValue = textInputContacts.value.trim();
			if (this.options.contactsArray.includes(inputValue)) {
				this.submitContactsButton.classList.add("success");
				this.score.contact = 10;
			} else {
				this.submitContactsButton.classList.remove("success");
				this.score.contact = null;
			}
		});
	}

	// Submit forms listener
	formsListener() {
		this.formLive.addEventListener("submit", (e) => {
			e.preventDefault();
			const btn = e.target.querySelector(`#${this.options.submitLiveID}`);
			if (this.score.live == 15 && btn) {
				this.submited.live = 15;
				this.textInputLive.classList.add("no-edit");
				this.submitLiveButton.classList.add("no-edit");
				this.checkWin();
			} else {
				const alertText = `Проверь свой ответ и попробуй ещё раз !`;
				this.alertText(alertText, 1200);
			}
		});

		this.formWork.addEventListener("submit", (e) => {
			e.preventDefault();
			const btn = e.target.querySelector(`#${this.options.submitWorkID}`);
			if (this.score.work == 15 && btn) {
				this.submited.work = 15;
				this.textInputWork.classList.add("no-edit");
				this.submitWorkButton.classList.add("no-edit");
				this.checkWin();
			} else {
				const alertText = `Проверь свой ответ и попробуй ещё раз !`;
				this.alertText(alertText, 1200);
			}
		});

		this.formContacts.addEventListener("submit", (e) => {
			e.preventDefault();
			const btn = e.target.querySelector(`#${this.options.submitContactsID}`);
			if (this.score.contact == 10 && btn) {
				this.submited.contact = 10;
				this.textInputContacts.classList.add("no-edit");
				this.submitContactsButton.classList.add("no-edit");
				this.checkWin();
			} else {
				const alertText = `Проверь свой ответ и попробуй ещё раз !`;
				this.alertText(alertText, 1200);
			}
		});

		this.endLevel.addEventListener("click", () => {
			this.end();
		});
	}

	// End level
	end() {
		const sum = this.submited.live + this.submited.work + this.submited.contact;
		this.addToLocalStorage(sum);
		this.goToWinPage();
	}

	// Check if you win function
	checkWin() {
		const sum = this.submited.live + this.submited.work + this.submited.contact;
		if (sum >= 10 && sum < 25) {
			const alertText = `Вы собрали 1/3 необходимой информации. Так держать !`;
			this.alertText(alertText, 1200);
			return;
		}
		if (sum >= 25 && sum < 40) {
			const alertText = `Вы собрали 2/3 необходимой информации. Так держать !`;
			this.alertText(alertText, 1200);
			return;
		}
		if (sum == 40) {
			const alertText = `Вы собрали всю необходимую информации. Поздравляю !`;
			this.alertText(alertText, 1200);

			this.addToLocalStorage(sum);
			this.goToWinPage();
		}
	}

	// Adding scores to browser memory
	addToLocalStorage(sum) {
		localStorage.setItem("level-3", sum);
	}

	// Redirect to win page
	goToWinPage() {
		window.location.href = "finish.html";
	}

	// Popup Open/Close Listener
	popupListener() {
		this.openResume.addEventListener("click", () => {
			this.resumePopup.classList.add("show");
			this.body.classList.add("no-scroll");
		});
		this.closeResume.addEventListener("click", () => {
			this.resumePopup.classList.remove("show");
			this.body.classList.remove("no-scroll");
		});
	}

	// Show alert about input fields
	alertText(content, delay) {
		let element = document.createElement("div");
		let body = document.querySelector("body");
		body.append(element);
		element.innerHTML = content;
		element.className = "alertText";
		element.classList.add("active");

		setTimeout(() => {
			element.classList.remove("active");
		}, delay);
		setTimeout(() => {
			element.remove();
		}, delay + 1000);
	}
}

// -------------------------------------- Start HackHunter Class ------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
	const level3 = new HackHunter();
	level3.start();
});
