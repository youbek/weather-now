import { Command } from "commander";
import { prompt } from "enquirer";
import chalk from "chalk";
import ora from "ora";

import { WeatherApi } from "../api/WeatherApi";
import { WeatherRenderer } from "../modules/WeatherRenderer";
import { TemperatureUnits } from "../api/WeatherApi/dto/OpenWeather";

export class Program extends Command {
  private readonly weatherApi: WeatherApi;

  constructor(weatherApi: WeatherApi) {
    super();

    this.weatherApi = weatherApi;
    this.name("Weather Now");
    this.description(
      'Welcome to "Weather Now", CLI tool to get weather forcasts!'
    );
    this.version("0.0.1");
    this.action(this.getWeatherForecast.bind(this));
  }

  async getWeatherForecast() {
    const { city, units } = await prompt<{
      city: string;
      units: TemperatureUnits;
    }>([
      {
        message: "What is your city?",
        name: "city",
        type: "input",
      },
      {
        message: "Select unit of measurement",
        name: "units",
        type: "select",
        choices: [
          {
            message: "Fahrenheit - °F",
            name: "imperial",
          },
          {
            message: "Celsius - °C",
            name: "metric",
          },
        ],
      },
    ]);

    try {
      const spinner = ora();
      spinner.start();
      const forecast = await this.weatherApi.getByCityName(city, {
        units,
      });
      spinner.stop();

      const weatherRenderer = new WeatherRenderer({
        ...forecast,
        city,
        temperatureUnits: units === "imperial" ? "°F" : "°C",
      });

      weatherRenderer.render();
    } catch (err: any) {
      console.log(chalk.bgRedBright.white.bold(`ERROR: ${err.message}`));
    }
  }

  start() {
    this.parse();
  }
}
