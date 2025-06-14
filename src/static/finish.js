document.addEventListener("DOMContentLoaded", function () {
	const results = document.getElementById("finish-results");
	let value1 = Number(localStorage.getItem("level-1"));
	let value2 = Number(localStorage.getItem("level-2"));
	let value3 = Number(localStorage.getItem("level-3"));

	if (value1 == NaN) {
		value1 = 0;
	}
	if (value2 == NaN) {
		value2 = 0;
	}
	if (value3 == NaN) {
		value3 = 0;
	}

	let sum = value1 + value2 + value3;

	if (sum) {
		results.innerHTML = sum;
	} else {
		results.innerHTML = 0;
	}

	localStorage.setItem("score", sum);
	
	// закоментирууй resetLevelsLocalStorage чтобы не очищать память уровней по отдельности
	resetLevelsLocalStorage();
	
	function resetLevelsLocalStorage() {
		localStorage.setItem("level-1", 0);
		localStorage.setItem("level-2", 0);
		localStorage.setItem("level-3", 0);
	}

	console.log("score =", sum, "in browser localStorage !");
});
