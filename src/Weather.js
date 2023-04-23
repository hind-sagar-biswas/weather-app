import React from "react";

class Weather extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			city: props.city,
			temp: props.temp,
			weather: props.weather,
			icon: props.icon,
		};
	}

	getTemperatureColor = (temperature) => {
		const minTemperature = -10;
		const maxTemperature = 40;
		const temperatureValue =
			(temperature - minTemperature) / (maxTemperature - minTemperature);
		const hue = 240 - temperatureValue * 240;
		return `hsl(${hue}, 80%, 50%)`;
	};

	getSkyColor = (hours) => {
		if (hours < 4 || hours >= 20) {
			// night sky color
			return {
				start: "#090d54",
				end: "#1d70dd",
			};
		} else if (hours <= 6) {
			// morning sky color
			return {
				start: "#ff7630",
				end: "#fedc4e",
			};
		} else if (hours <= 10) {
			// morning sky color
			return {
				start: "#7b97b3",
				end: "#5b7fb6",
			};
		} else if (hours <= 16) {
			// afternoon sky color
			return {
				start: "#011b77",
				end: "#3973b2",
			};
		} else {
			// evening sky color
			return {
				start: "#ffcdad",
				end: "#fe6d86",
			};
		}
	};

	getGradientColor = () => {
		const skyColor = this.getSkyColor(new Date().getHours());
		return `linear-gradient(to bottom, ${skyColor.start}, ${skyColor.end})`;
	};

	getIcon = () => {
		const iconUrl = `http://openweathermap.org/img/wn/${this.state.icon}.png`;
		return (
			<img src={iconUrl} alt={this.state.weather} title={this.state.weather} />
		);
	};

	render() {
		const tempColor = this.getTemperatureColor(this.state.temp);
		const backColor = this.getGradientColor(this.state.temp);
		return (
			<div id="weather-box" style={{ background: backColor }}>
				<div id="weather-data">
					<p>
						<span id="temp" style={{ color: tempColor }}>
							{this.state.temp}
						</span>{" "}
						°C
					</p>
					{this.getIcon()}
					<p>{this.state.weather}</p>
					<h2>{this.state.city}</h2>
				</div>
			</div>
		);
	}
}

export default Weather;
