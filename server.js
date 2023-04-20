const path = require("path");
const fs = require("fs");
const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);

// Set static folder
app.use(express.static(path.join(__dirname, "static")));

app.get("/", (req, res) => {
	fs.readFile("index.html", function (err, data) {
		if (err) {
			res.writeHead(404, { "Content-Type": "text/html" });
			return res.end("404 Not Found");
		}
		res.writeHead(200, { "Content-Type": "text/html" });
		res.write(data);
		return res.end();
	});
});

app.get("/weather", async (req, res) => {
	const lat = req.query.lat;
	const lon = req.query.lon;
	logData(lat, lon);

	try {
		const fetch = await import("node-fetch");
		const apiKey = "1c3296cf2d396c47f7abfd8a324b66cb";
		const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

		const response = await fetch.default(url);
		const data = await response.json();

		const temperature = data.main.temp;
		const description = data.weather[0].description;
		const city = data.name;

		const weatherData = {
			city: city,
			temp: temperature,
			desc: description,
		};

		res.status(200).json(weatherData);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Something went wrong" });
	}
});

// For DEBUG PURPOSES
function logData(lat, lon) {
	const date = new Date();
	const formattedDate = `${date.getDate()}/${
		date.getMonth() + 1
	}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()} ${
		date.getHours() < 12 ? "AM" : "PM"
	}`;
	console.log(
		`\n======================\nREQUEST DATA:\n${formattedDate} => ${lat}, ${lon}\n======================\n`
	);
}

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
