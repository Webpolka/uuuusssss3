class Hack {
	constructor(post, options) {
		// ДЕФОЛТНЫЕ ОПЦИИ
		const defaultConfig = {
			article: {
				neccesary: {
					birthday: "Сегодня 17 мая - день, когда я появилась на свет !",
					adress: "Мой уютный уголок!",
					travel: "Провели выходные в Сосновке. Обожаю это место!",
					pet: "Вернулись с Барни с прогулки. Он устал, я тоже...",
					phone: "Нужен хороший мастер по ремонту. Писать в личку или на +7 987 654-32-10",
				},
				scores: {
					one: "У меня один пароль на всё. Иначе я бы вообще нигде не входила.",
					two: "Отправляюсь в путешествие",
					three: "г. Казань",
					four: "Пиши в телегу или на старую почту: masha.vetrov@oldmail.com или landcorobka@gmail.com",
				},
				useless: {
					first: "Главный повар дома:",
					second: "Новенький маникюр",
				},
			},
			check: {
				birthday: "Дата рождения",
				adress: "Адрес или город проживания",
				phone: "Телефон",
				pet: "Имя домашнего животного",
				travel: "Последнее место, где был пользователь",
				// email: "E-mail (если найдёшь)",
			},
		};
		this.options = Object.assign(defaultConfig, options);

		this.post = post || ".post";
		this.posts = document.querySelectorAll(post);
		this.emailStorage = {};

		this.createConfirm();
		this.sendBtn = document.querySelector("#send");
		this.cancelBtn = document.querySelector("#cancel");
		this.popup = document.querySelector(".popup");

		this.endLevel = document.querySelector("#end-level");
		this.endLevel.addEventListener("click", (e) => this.showBlank(e));

		this.createCounter();
		this.counter = document.querySelector("#counter");

		// Бланк для подсчета ОБЯЗАТЕЛЬНЫХ ЗАДАНИЙ
		this.checkBlank = {
			birthday: null,
			adress: null,
			phone: null,
			pet: null,
			travel: null,
			// email: null,
		};

		// Бланк для подсчета ДОПОЛНИТЕЛЬНЫХ БАЛЛОВ
		this.extraBlank = {
			one: null,
			two: null,
			three: null,
			four: null,
		};

		// Бланк для подсчета БЕСПОЛЕЗНЫХ ЗАДАНИЙ
		this.uselessBlank = {
			first: null,
			second: null,
		};

		this.lastScore = 0;
	}

	// ПРОСЛУШИВАЕМ ВЫДЕЛЕНИЕ МЫШКОЙ
	listener() {
		window.addEventListener("mouseup", (e) => this.getText(e));
		window.addEventListener("mouseup", (e) => this.getTextImage(e));
	}
	// НАХОДИМ ТЕКСТ КЛИКОМ ПО ИЗОБРАЖЕНИЮ
	getTextImage(e) {
		e.preventDefault();
		const posts = document.querySelector(".posts");
		const aboutList = document.querySelector("#about-list");

		if (posts.contains(e.target) || aboutList.contains(e.target)) {
			const postImageTrue = e.target.parentNode.classList.contains("post-image");
			const message = e.target.parentNode.parentNode.querySelector(".post-message");

			if (postImageTrue && message) {
				const virtualNode = document.createElement("div");
				const clone = message.cloneNode(true);

				virtualNode.appendChild(clone);
				let strong = virtualNode.querySelector("strong");
				strong.remove();

				const finallyText = virtualNode
					.querySelector(".post-message")
					.textContent.toString()
					.trim()
					.replace(/\r?\n|\r/g, " ");

				this.addEmailStorage(finallyText);
				this.checkStart(finallyText);
				return finallyText;
			}
		}
		return;
	}

	// НАХОДИМ ТЕКСТ ВЫДЕЛЕНИЕМ МЫШКИ
	getText(e) {
		e.preventDefault();
		// получаем выделенный текст
		const posts = document.querySelectorAll(".posts .post-message_text");
		const aboutList = document.querySelector("#about-list");
		let workingText = null;		

		posts.forEach((message) => {
			if (message.contains(e.target) || aboutList.contains(e.target)) {
				workingText = e.target.textContent;
				if (workingText && workingText.length < 150) {
					this.addEmailStorage(workingText);
					this.checkStart(workingText);
				}
			}
		}, this);
		if (workingText) {
			return workingText;
		}
		return;
	}

	// ДОБАВЛЯЕМ ПОЧТУ В ХРАНИЛИЩЕ
	addEmailStorage(selectedText) {
		let newEmails = this.emailExtract(selectedText);

		if (newEmails) {
			for (let i = 0; i < newEmails.length; i++) {
				this.emailStorage[`email-${i}`] = newEmails[i];
			}
		}
	}

	// НАЧАЛО ПРОВЕРКИ ЧЕК-ЛИСТА
	checkStart(text) {
		if (text) {
			this.popup.classList.add("show");

			const popupWindow = this.popup.querySelector(".popup-message");
			popupWindow.textContent = text;

			this.sendBtn.addEventListener("click", (e) => this.checkEnd(e, text));
			this.cancelBtn.addEventListener("click", (e) => this.cancel(e));
		}
	}

	// ОКОНЧАНИЕ ПРОВЕРКИ ЧЕК-ЛИСТА
	checkEnd(e, text) {
		e.preventDefault();

		this.checkEmail();
		this.checkStrike(text);
		this.checkExtra(text);
		this.checkUseless(text);
		this.cancel();
	}

	// НАХОДИМ КЛЮЧ ДЛЯ ТЕКСТОВОГО ЗНАЧЕНИЯ
	findKeyValueContainingText(object, searchText) {
		for (let key in object) {
			if (object.hasOwnProperty(key)) {
				if (typeof object[key] === "string" && object[key].includes(searchText)) {
					return { key: key, value: object[key] };
				}
			}
		}
		return undefined;
	}

	// ОТРАБАТЫВАЕМ ПОЧТУ (МЕНЯЕМ В ЧЕК ЛИСТЕ И ДОБАВЛЯЕМ В БЛАНК)
	checkEmail() {
		if (this.hasOwnValue(this.emailStorage)) {
			const checkList = document.querySelector("#check-list");
			const all = checkList.querySelectorAll("li span");

			const stringLiteral = Object.entries(this.emailStorage)
				.map(([key, value]) => value)
				.join(", ");

			all.forEach((span) => {
				if (span.textContent.includes("E-mail")) {
					span.textContent = "Доп.информация: " + stringLiteral;
					span.style.color = "red";
				}
			});
			this.extraBlank["four"] = 5;
			this.lastScore = 5;
		}
	}

	// ДОБАВЛЯЕМ ДОП БАЛЛЫ В БЛАНК
	checkExtra(text) {
		const foundEntry = this.findKeyValueContainingText(this.options.article.scores, text);
		if (foundEntry) {
			var key = foundEntry.key;
		} else {
			return;
		}
		this.extraBlank[key] = 5;
		this.lastScore = 5;
	}

	// ЗАНОСИМ БЕСПОЛЕЗНЫЕ В БЛАНК
	checkUseless(text) {
		const foundEntry = this.findKeyValueContainingText(this.options.article.useless, text);
		if (foundEntry) {
			var key = foundEntry.key;
		} else {
			return;
		}
		this.uselessBlank[key] = 1;
		this.lastScore = "БЕСПОЛЕЗНЫЙ ПОСТ";
	}

	// ВЫЧЕРКИВАНИЕ ИЗ ЧЕК-ЛИСТА
	checkStrike(text) {
		const foundEntry = this.findKeyValueContainingText(this.options.article.neccesary, text);
		if (foundEntry) {
			var key = foundEntry.key;
		} else {
			return;
		}
		const checkValue = this.options.check[key];

		this.checkBlank[key] = 10;

		const checkList = document.querySelector("#check-list");
		const all = checkList.querySelectorAll("li span");
		all.forEach((span) => {
			if (span.textContent === checkValue) {
				span.style.textDecoration = "line-through";
				span.style.color = "red";
			}
		});
		this.lastScore = 10;
	}

	// СКЛАДЫВАЕМ БАЛЛЫ И ПОКАЗЫВАЕМ
	showScore() {
		let sum = 0;
		for (const key in this.checkBlank) {
			if (this.checkBlank.hasOwnProperty(key)) {
				const value = this.checkBlank[key];
				if (typeof value === "number") {
					sum += value;
				}
			}
		}
		for (const key in this.extraBlank) {
			if (this.extraBlank.hasOwnProperty(key)) {
				const value = this.extraBlank[key];
				if (typeof value === "number") {
					sum += value;
				}
			}
		}
		// console.clear();
		console.log(sum);
		return sum;
	}

	// КНОПКА ОТМЕНА
	cancel(e) {
		this.popup.classList.remove("show");
		this.sendBtn.parentNode.classList.remove("show");

		// Удаляем прослушиватели с кнопки ОТПРАВИТЬ И ОТМЕНА
		const newSend = this.sendBtn.cloneNode(true); // true для клонирования с потомками
		this.sendBtn.parentNode.replaceChild(newSend, this.sendBtn);

		const newCancel = this.cancelBtn.cloneNode(true); // true для клонирования с потомками
		this.cancelBtn.parentNode.replaceChild(newCancel, this.cancelBtn);

		this.sendBtn = document.querySelector("#send");
		this.cancelBtn = document.querySelector("#cancel");

		this.checkWin();
	}

	// Проверка на выиграш
	checkWin() {
		if (this.counter) {
			this.counter.classList.add("show");
			this.counter.textContent = this.showScore();
		}
		if (this.showScore() === 70) {
			this.showBlank();
			return;
		}
	}

	// НАХОДИМ ПОЧТУ В ТЕКСТЕ
	emailExtract(text) {
		// Регулярное выражение для поиска email-адресов
		const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
		const emails = text.match(emailRegex);
		return emails;
	}

	// ПРОВЕРКА ПУСТОЙ ЛИ ОБЪЕКТ
	hasOwnValue(obj) {
		for (const key in obj) {
			if (obj.hasOwnProperty(key)) {
				if (obj[key]) {
					return true; // Найдено truthy значение
				}
			}
		}
		return false; // Truthy значения не найдены
	}

	// ОКНО С КНОПКАМИ ДЛЯ ПОДТВЕРЖДЕНИЯ ОТПРАВКИ
	createConfirm() {
		let html = `                
        <div class="popup">
    	<div class="popup-inner">
    		<div class="popup-message">ПРИВЕТИК</div>
    		<div class="popup-buttons">
    			<button id="send">ОТПРАВИТЬ</button>
    			<button id="cancel">ОТМЕНА</button>
    		</div>
    	</div>
        </div>`;
		const body = document.querySelector("body");
		body.insertAdjacentHTML("beforeend", html);
	}

	// ФОРМИРУЕМ СПИСОК ДОСТИЖЕНИЙ ДЛЯ ВЫВОДА В БЛАНКЕ ОБРАТНОЙ СВЯЗИ
	concatAchivments(obj) {
		let concated = "";
		for (const key in obj) {
			if (obj.hasOwnProperty(key)) {
				const value = obj[key];
				if (typeof value === "string") {
					const cleanValue = value.replace(" + ", "").replace(/\d+/g, "");

					if (cleanValue != this.options.article.scores.four) {
						concated += "<li>" + value + " баллов</li>";
					} else {
						concated += "<li>E-mail + 5 баллов</li>";
					}
				}
			}
		}
		return concated;
	}

	// СРАВНЕНИЕ ОБЪЕКТОВ ДЛЯ ВЫВОДА ДОСТИЖЕНИЙ В ОКНЕ ОБРАТНОЙ СВЯЗИ
	compareObjects(obj1, obj2) {
		const result = {};
		for (const key in obj1) {
			if (obj1.hasOwnProperty(key)) {
				if (obj2.hasOwnProperty(key) && obj2[key]) {
					result[key] = obj1[key] + " + " + obj2[key];
				}
			}
		}
		return result;
	}

	// ФОРМИРУЕМ И ПОКАЗЫВАЕМ БЛАНК
	showBlank() {
		const score = this.showScore();

		const checkObj = this.compareObjects(this.options.check, this.checkBlank);
		const scoresObj = this.compareObjects(this.options.article.scores, this.extraBlank);

		const scoreEl = document.querySelector("#score");
		const basicEl = document.querySelector("#basic");
		const extraEl = document.querySelector("#extra");
		const tileEl = document.querySelector("#tile");
		const useless = document.querySelector("#useless");

		// ВОТ ДОБАВИЛ ДВЕ КОНСТАНТЫ
		const winContentSucces = document.querySelector("#content-succes");
		const winContentFail = document.querySelector("#content-fail");

		const basicList = this.concatAchivments(checkObj);
		const extraList = this.concatAchivments(scoresObj);

		const basic = basicList ? `${basicList}` : "<li>Ничего</li>";
		const extra = extraList ? `${extraList}` : "<li>Ничего</li>";

		const footerSucces = `
							<p>Письмо от “команды хакеров”</p>
							<p class="small">
								«Хорошая работа. Ты показал(а), что умеешь собирать информацию. <br />
								Жертва даже не подозревает, сколько всего мы о ней узнали. <br />
								Такие, как она — легкая добыча. <br />
							</p>
							<p class="small pn">
								Помни: мы просто копаем то, что она сама выложила. Без взломов. <br />
								Просто открытый интернет.»
							</p>`;
		const footerMiss = `
							<p>Письмо от “команды хакеров”</p>
							<p class="small">
								Ты уже начал(а) искать информацию — это отлично! <br />
								Но чтобы попасть к нам, попробуй быть чуть внимательнее и набери как минимум 30 баллов.																
							</p>
							<p class="small pn">
								Если не вышло с первого раза — ничего страшного, просто попробуй ещё раз.
							</p>`;

		scoreEl.textContent = score;
		basicEl.innerHTML = basic;
		extraEl.innerHTML = extra;

		if (this.hasOwnValue(this.uselessBlank)) {
			useless.innerHTML = "<p class='pb-60'>Ненужная информация. Больше так не делай</p>";
		}

		if (tileEl && winContentSucces && winContentFail)
			if (this.hasOwnValue(this.checkBlank) && Number(this.showScore()) >= 30) {
				tileEl.innerHTML = footerSucces;
				winContentSucces.style.display = "block";
			} else {
				tileEl.innerHTML = footerMiss;
				winContentFail.style.display = "block";
			}
		else {
			console.log('У ВАС ПРОБЛЕМЫ С РАМЕТКОЙ ! НЕТ id="content-fail" ИЛИ id="content-succes" ИЛИ id="tile" !');
		}

		const popup = document.querySelector(".popup-callback");
		popup.classList.add("show");
	}

	// СОЗДАЕМ СЧЕТЧИК БАЛОВ
	createCounter() {
		let html = `
		<div class="counter_wrapper">
		<div class="counter_container">
		<div class="counter" id="counter"></div>
		</div>
		</div>`;
		const body = document.querySelector("body");
		body.insertAdjacentHTML("beforeend", html);
	}
}

// ---------------------------------------------------------------------------------------------------------------------
// ИНИЦИАЛИЗИРУЕМ ЕКЗЕМПЛЯР ИГРЫ - УРОВЕНЬ 1 (ВЫРАЖЕНИЯ ПО КОТОРЫМ ИЩЕМ - МЕНЯТЬ ЗДЕСЬ !!!!)
//----------------------------------------------------------------------------------------------------------------------

const newHack = new Hack(".post", {
	article: {
		neccesary: {
			birthday: "Сегодня 17 мая - день, когда я появилась на свет !",
			adress: "Мой уютный уголок!",
			travel: "Провели выходные в Сосновке. Обожаю это место!",
			pet: "Вернулись с Барни с прогулки. Он устал, я тоже...",
			phone: "Нужен хороший мастер по ремонту. Писать в личку или на +7 987 654-32-10",
		},
		scores: {
			one: "У меня один пароль на всё. Иначе я бы вообще нигде не входила.",
			two: "Отправляюсь в путешествие",
			three: "г. Казань", // чтобы убрать из обслуживания измени содержимое например "город Казань"
			four: "Пиши в телегу или на старую почту: masha.vetrov@oldmail.com или landcorobka@gmail.com",
		},
		useless: {
			first: "Главный повар дома:",
			second: "Новенький маникюр",
		},
	},
	check: {
		birthday: "Дата рождения",
		adress: "Адрес или город проживания",
		phone: "Телефон",
		pet: "Имя домашнего животного",
		travel: "Последнее место, где был пользователь",
		// email: "E-mail (если найдёшь)",
	},
}).listener();
