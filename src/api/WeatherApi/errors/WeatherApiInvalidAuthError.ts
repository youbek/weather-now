export class WeatherApiInvalidAuthError extends Error {
  constructor() {
    super(
      "API responded with invalid auth. Is your API key correct in env variables?"
    );

    this.name = "WeatherApiInvalidAuthError";
  }
}
