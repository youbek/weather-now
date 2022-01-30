export class WeatherApiNotFoundError extends Error {
  constructor() {
    super("Weather forecast for search not found!");

    this.name = "WeatherApiNotFoundError";
  }
}
