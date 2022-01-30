import emoji, { Emoji } from "node-emoji";
import chalk from "chalk";

import { IOpenWeatherApiResponse } from "../api/WeatherApi/dto/OpenWeather";

interface IForecast extends IOpenWeatherApiResponse {
  city: string;
  temperatureUnits: "°C" | "°F";
}

export class WeatherRenderer {
  private forecast: IForecast;

  constructor(forecast: IForecast) {
    this.forecast = forecast;
  }

  private get mainEmoji(): Emoji {
    const weather = this.forecast.weather[0].main;

    if (weather === "Rain") {
      return emoji.find("🌧");
    } else if (weather === "Drizzle") {
      return emoji.find("☔");
    } else if (weather === "Snow") {
      return emoji.find("🌨");
    } else if (weather === "Extreme") {
      return emoji.find("🌪");
    } else if (weather === "Fog") {
      return emoji.find("🌫");
    } else if (weather === "Clear") {
      return emoji.find("☀");
    } else if (weather === "Clouds") {
      return emoji.find("⛅");
    } else {
      return emoji.find("☁");
    }
  }

  private get temperature(): number {
    return this.forecast.main.temp;
  }

  render() {
    console.log(chalk.green(`Weather in ${this.forecast.city}`));
    console.log(
      `${this.mainEmoji.emoji} ${this.temperature}${this.forecast.temperatureUnits}`
    );
  }
}
