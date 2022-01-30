export class WeatherApiUnhandledError extends Error {
  constructor() {
    super("Weather API responded with unhandled error, please try again!");

    this.name = "WeatherApiUnhandledError";
  }
}
