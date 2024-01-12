import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyWeatherListComponent } from './hourly-weather-list.component';

describe('HourlyWeatherListComponent', () => {
  let component: HourlyWeatherListComponent;
  let fixture: ComponentFixture<HourlyWeatherListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HourlyWeatherListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HourlyWeatherListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
