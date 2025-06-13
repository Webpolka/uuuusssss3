document.addEventListener("DOMContentLoaded", function () {
	const results = document.getElementById("finish-results");
	let value1 = Number(localStorage.getItem("level-1"));
	let value2 = Number(localStorage.getItem("level-2"));
	let value3 = Number(localStorage.getItem("level-3"));

	let sum = value1 ? value1 : 0 + value2 ? value2 : 0 + value3 ? value3 : 0;

	if (sum) {
		results.innerHTML = sum;
	} else {
		results.innerHTML = 0;
	}

	// Если нужно очищать память браузера после игры то раскомментируй вызов функции
	// resetLocalStorage();

	function resetLocalStorage() {
		localStorage.setItem("level-1", null);
		localStorage.setItem("level-2", null);
		localStorage.setItem("level-3", null);
	}
});
