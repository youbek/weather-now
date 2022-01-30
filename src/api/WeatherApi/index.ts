import axios from "axios";
import qs from "qs";
import { IOpenWeatherApiResponse } from "./dto/OpenWeather";

import {
  WeatherApiUnhandledError,
  WeatherApiNotFoundError,
  WeatherApiInvalidAuthError,
} from "./errors";

export class WeatherApi {
  private readonly openWeatherHost =
    "https://api.openweathermap.org/data/2.5/weather";
  private readonly openWeather_API_KEY = "d50c554c2cde099a7454467f4bf676aa";

  private async getRequest(query: object = {}) {
    try {
      const result = await axios.get<IOpenWeatherApiResponse>(
        `${this.openWeatherHost}?${qs.stringify({
          ...query,
          appid: this.openWeather_API_KEY,
        })}`
      );

      return result.data;
    } catch (err: any) {
      if (!err.response) {
        throw new WeatherApiUnhandledError();
      }

      const { status } = err.response;

      if (status === 404) {
        throw new WeatherApiNotFoundError();
      }

      if (status === 401) {
        throw new WeatherApiInvalidAuthError();
      }

      throw new WeatherApiUnhandledError();
    }
  }

  async getByCityName(cityName: string, otherQuery: object = {}) {
    const data = await this.getRequest({
      q: cityName,
      ...otherQuery,
    });

    return data;
  }
}
