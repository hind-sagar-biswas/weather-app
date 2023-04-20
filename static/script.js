// URL Parse /////////////////////////////////
const currentUrl = window.location.href;
const url = new URL(currentUrl);

function success(position) {
	const lat = position.coords.latitude;
	const lon = position.coords.longitude;

	const link = document.createElement("a");
	link.href = `./weather?lat=${lat}&lon=${lon}`;
	link.id = "check";
	document.getElementById('linker').appendChild(link);
	document.getElementById("check").click();
}

function error() {
	console.error("Unable to retrieve location.");
}

function getWeatherData(lat, lon) {
	const apiKey = "1c3296cf2d396c47f7abfd8a324b66cb";
	const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
	console.log(url);

	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			const temperature = data.main.temp;
			const description = data.weather[0].description;
			const city = data.name;

			const weatherData = `
      <h2>${city}</h2>
      <p>Temperature: ${temperature} &#8451;</p>
      <p>Description: ${description}</p>
    `;

			document.getElementById("weather-data").innerHTML = weatherData;
		})
		.catch((error) => console.error(error));
}

function checkWeather() {
	navigator.geolocation.getCurrentPosition(success, error);
}

window.onload = function () {
	setTimeout(function () {
		var checkDiv = document.getElementById("checkdv_1");
		if (checkDiv) {
			checkDiv.parentNode.removeChild(checkDiv);
		}
	}, 5000);
};
