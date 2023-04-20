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

app.get("/weather", (req, res) => {
	const lat = req.query.lat;
	const lon = req.query.lon;
	saveLocationForTests(lat, lon);

	fs.readFile("weather.html", function (err, data) {
		if (err) {
			res.writeHead(404, { "Content-Type": "text/html" });
			return res.end("404 Not Found");
		}
		res.writeHead(200, { "Content-Type": "text/html" });
		res.write(data);
		return res.end();
	});
});

// For DEBUG PURPOSES
function saveLocationForTests(lat, lon) {
    console.log("Saving locations: ", lat, lon);
	const date = new Date();
	const formattedDate = `${date.getDate()}/${
		date.getMonth() + 1
	}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()} ${
		date.getHours() < 12 ? "AM" : "PM"
	}`;
	const locationData = `${formattedDate} => ${lat}, ${lon}\n`;
	fs.appendFile("locations.txt", locationData, function (err) {
		if (err) {
			console.error(err);
		}
	});
}

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
