import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { HourlyWeather } from '../../types/user.interface';

@Component({
  selector: 'app-hourly-weather-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hourly-weather-list.component.html',
  styleUrl: './hourly-weather-list.component.scss',
})
export class HourlyWeatherListComponent {
  @Input() hourlyWeatherList: HourlyWeather = [];
  isShowTemperature: boolean = false;

  showTemperature() {
    this.isShowTemperature = !this.isShowTemperature;
  }
  closeWeatherBlock() {
    document.addEventListener('click', (event: MouseEvent) => {
      if (!event || !event.target) {
        return;
      }
      const clickedElement = event.target as Element;
      if (
        clickedElement.closest('.hourlyWeather') ||
        clickedElement.closest('.showWeatherButton')
      ) {
        return;
      }
      this.isShowTemperature = false;
    });
  }
  ngOnInit() {
    this.closeWeatherBlock();
  }
}
