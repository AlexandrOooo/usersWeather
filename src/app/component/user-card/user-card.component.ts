import { NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  HourlyWeather,
  User,
  UserWeatherInfo,
} from '../../types/user.interface';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { WeatherService } from '../../services/weather.service';
import { interval } from 'rxjs';
import { HourlyWeatherListComponent } from '../hourly-weather-list/hourly-weather-list.component';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [NgOptimizedImage, FontAwesomeModule, HourlyWeatherListComponent],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  @Input() user?: User;
  @Input() buttonDisabled: boolean = false;

  temperature?: string;
  minTemperature?: string;
  maxTemperature?: string;
  userWeatherInfo?: UserWeatherInfo;
  weather?: IconDefinition;
  hourlyWeather!: HourlyWeather;

  saveUser(user: User): void {
    const users = JSON.parse(localStorage.getItem('users') ?? '[]') as User[];
    if (users.find((existingUser) => existingUser.email === user.email)) {
      return;
    }
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  }

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.setWeather();
    const weatherUpdateInterval = interval(300000);
    weatherUpdateInterval.subscribe(() => this.setWeather());
  }
  setWeather() {
    if (this.user) {
      this.weatherService
        .getUserWeather(
          this.user.location.coordinates.latitude,
          this.user.location.coordinates.longitude
        )
        .subscribe((userWeather: UserWeatherInfo) => {
          const measureScale = userWeather.current_weather_units.temperature;
          this.temperature = this.weatherService.formatTemperature(
            userWeather.current_weather.temperature,
            measureScale
          );

          const minTemperatureNumber = this.weatherService.minTemperaturePerDay(
            userWeather.hourly.temperature_2m
          );
          const maxTemperatureNumber = this.weatherService.maxTemperaturePerDay(
            userWeather.hourly.temperature_2m
          );

          this.minTemperature = this.weatherService.formatTemperature(
            minTemperatureNumber,
            measureScale
          );
          this.maxTemperature = this.weatherService.formatTemperature(
            maxTemperatureNumber,
            measureScale
          );

          this.userWeatherInfo = userWeather;

          this.weather = this.weatherService.convertCodeToWeather(
            userWeather.current_weather.weathercode
          );

          this.hourlyWeather = this.weatherService.createHourlyWeather(
            userWeather.hourly.time,
            userWeather.hourly.temperature_2m
          );
        });
    }
  }
}
