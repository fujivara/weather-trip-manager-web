import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  weatherList = new Subject();
  todayWeather = new Subject();

  constructor (private http: HttpClient) {}

  getWeatherList (city: string, startDate: string, endDate: string) {
    const path = 'VisualCrossingWebServices/rest/services/timeline';
    this.http.get(`
      ${environment.WEATHER_API_BASE_URL}/${path}/${city}/${startDate}/${endDate}?key=${environment.WEATHER_API_KEY}
    `).subscribe((weather) => {
      this.weatherList.next(weather);
    });
  }

  getTodayWeather (city: string, startDate: string) {
    const path = 'VisualCrossingWebServices/rest/services/timeline';
    const params = 'unitGroup=metric&include=days';
    this.http.get(`
      ${environment.WEATHER_API_BASE_URL}/${path}/${city}/today?${params}&key=${environment.WEATHER_API_KEY}
    `).subscribe((weather) => {
      this.todayWeather.next({ weather, city, startDate });
    });
  }

  validateTripDates (startDate: string, endDate: string): boolean {
    const today = new Date();
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    const fifteenDaysFromNow = new Date(today);
    fifteenDaysFromNow.setDate(today.getDate() + 15);

    if (
      startDateObj < today || endDateObj < today ||
      startDateObj >= fifteenDaysFromNow || endDateObj > fifteenDaysFromNow
    ) {
      return false;
    }

    return startDateObj <= endDateObj;
  }

}
