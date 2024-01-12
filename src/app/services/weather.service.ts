import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserWeatherInfo } from '../types/user.interface';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import {
  faCloud,
  faSun,
  faSmog,
  faSnowflake,
  faUmbrella,
} from '@fortawesome/free-solid-svg-icons';
import {
  CLOUD_CODES,
  FOG_CODES,
  RAIN_CODES,
  SNOW_CODES,
  SUN_CODES,
} from '../constants/index.constants';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getUserWeather(
    latitude: number,
    longitude: number
  ): Observable<UserWeatherInfo> {
    return this.http.get<UserWeatherInfo>(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m`
    );
  }
  minTemperaturePerDay(weatherTemperature: number[]): number {
    return Math.min(...weatherTemperature.slice(0, 24));
  }
  maxTemperaturePerDay(weatherTemperature: number[]): number {
    return Math.max(...weatherTemperature.slice(0, 24));
  }
  convertCodeToWeather(code: number): IconDefinition {
    if (this.determWeather(code, RAIN_CODES)) {
      return faUmbrella;
    } else if (this.determWeather(code, FOG_CODES)) {
      return faSmog;
    } else if (this.determWeather(code, CLOUD_CODES)) {
      return faCloud;
    } else if (this.determWeather(code, SNOW_CODES)) {
      return faSnowflake;
    } else if (this.determWeather(code, SUN_CODES)) {
      return faSun;
    } else {
      return faSun;
    }
  }
  determWeather(code: number, codes: number[]): boolean {
    return codes.includes(code);
  }
  formatTemperature(temperature: number, scale: string) {
    return `${temperature} ${scale}`;
  }
  createHourlyWeather(date: string[] = [], temperature: number[] = []) {
    const hourlyWeathers = [];
    for (let i = 0; i <= 23; i++) {
      hourlyWeathers.push({
        date: date[i].split('T')[1],
        temperature: temperature[i],
      });
    }
    return hourlyWeathers;
  }
}
