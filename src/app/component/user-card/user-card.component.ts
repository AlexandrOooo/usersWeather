import { NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Icon, User, UserWeatherInfo } from '../../types/user.interface';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [NgOptimizedImage, FontAwesomeModule],
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
  weather?: Icon;

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
        });
    }
  }
}
