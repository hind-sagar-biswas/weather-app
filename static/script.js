function success(position) {
	const lat = position.coords.latitude;
	const lon = position.coords.longitude;
	const url = `/weather?lat=${lat}&lon=${lon}`;

	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			const temperature = data.temp;
			const description = data.desc;
			const city = data.city;

			const weatherData = `
      <h2>${city}</h2>
      <p>Temperature: ${temperature} &#8451;</p>
      <p>Description: ${description}</p>
    `;

			const button = document.getElementById("check-btn");
			const cont = button.parentElement;
			const output = document.createElement('div');
			output.id = "weather-data";
			output.innerHTML = weatherData;

			cont.removeChild(button);
			cont.appendChild(output);

		})
		.catch((error) => console.error(error));
}

function error() {
	console.error("Unable to retrieve location.");
}

function checkWeather() {
	navigator.geolocation.getCurrentPosition(success, error);
}

window.onload = function () {
	checkWeather();
	setTimeout(function () {
		var checkDiv = document.getElementById("checkdv_1");
		if (checkDiv) {
			checkDiv.parentNode.removeChild(checkDiv);
		}
	}, 5000);
};
