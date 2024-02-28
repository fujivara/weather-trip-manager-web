import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  weatherList = new Subject();
  todayWeather = new Subject();

  constructor (private http: HttpClient) {}

  getWeatherList (city: string, startDate: string, endDate: string) {
    const url =
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${startDate}/${endDate}?key=GX5QAJL54A3DX43D4V67Q5RNH`;

    this.http.get(url).subscribe((weather) => {
      this.weatherList.next(weather);
    });
  }

  getTodayWeather (city: string, startDate: string) {
    const url =
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/today?unitGroup=metric&include=days&key=GX5QAJL54A3DX43D4V67Q5RNH&contentType=json`;

    this.http.get(url).subscribe((weather) => {
      this.todayWeather.next({ weather, city, startDate });
    });
  }

  validateTripDates (startDate: string, endDate: string): boolean {
    const today = new Date();
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    const fifteenDaysFromNow = new Date(today);
    fifteenDaysFromNow.setDate(today.getDate() + 15);

    if (startDateObj < today || endDateObj < today || startDateObj >= fifteenDaysFromNow || endDateObj > fifteenDaysFromNow) {
      return false;
    }

    return startDateObj <= endDateObj;
  }

}
