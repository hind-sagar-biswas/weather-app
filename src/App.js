import React from "react";
import Weather from "./Weather";
import "./App.css";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			apiKey: "1c3296cf2d396c47f7abfd8a324b66cb",
			status: "stagnant",
			msg: "Check Weather",
			city: null,
			temp: null,
			icon: null,
			weather: null,
		};
		this.located = this.located.bind(this);
	}

	run = () => {
		if (this.state.status !== "stagnant") return;
		this.setState({ status: "fired", msg: "Getting Location..." });
		this.getLocation();
	};

	getLocation = () => {
		this.progressHandle();
		setTimeout(() => {
			navigator.geolocation.getCurrentPosition(
				this.located,
				this.errorLocating
			);
		}, 3000);
	};

	checkWeather = () => {
		const url = `https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&units=metric&appid=${this.state.apiKey}`;
		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				this.setState({
					status: "fetched",
					temp: data.main.temp,
					weather: data.weather[0].description,
					icon: data.weather[0].icon,
					city: data.name,
				});
			})
			.catch((error) => {
				this.setState({ status: "failed", msg: "Failed to check Weather!" });
				this.setColor("red");
				console.error(error);
			});
	};

	located = (position) => {
		this.lat = position.coords.latitude;
		this.lon = position.coords.longitude;

		this.setState({ msg: "Checking Weather..." });
		this.setColor("#0deb0d");
		this.checkWeather();
	};

	errorLocating = (error) => {
		this.setState({ status: "failed", msg: "Failed to Get Location!" });
		this.setColor("red");
		console.log(error);
	};

	progressHandle = () => {
		let count = 0;
		const progress = setInterval(() => {
			const button = document.querySelector("#check-btn");
			button.style.setProperty("--percentage", `${count}%`);
			count++;

			if (count > 100) {
				clearInterval(progress);
			}
		}, 30);
	};

	setColor = (color) => {
		const button = document.querySelector("#check-btn");
		button.style.setProperty("--percentage", `100%`);
		button.style.setProperty("--color", `${color}`);
		button.style.setProperty("--line", `${color}`);
	};

	render() {
		return (
			<main>
				{this.state.status === "fetched" ? (
					<Weather
						city={this.state.city}
						temp={this.state.temp}
						weather={this.state.weather}
						icon={this.state.icon}
					/>
				) : (
					<button
						onClick={this.run}
						id="check-btn"
					>
						<div id="outer">
							<div id="inner">{this.state.msg}</div>
						</div>
					</button>
				)}
			</main>
		);
	}
}

export default App;
