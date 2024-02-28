import { Component, Input } from '@angular/core';
import { TripModel } from '../../models/trip.model';
import { NgStyle } from '@angular/common';
import { WeatherService } from '../../services/weather.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'trip-card',
  templateUrl: 'trip-card.component.html',
  styleUrl: 'trip-card.component.css',
  standalone: true,
  imports: [
    NgStyle,
    RouterLink,
  ],
})
export class TripCardComponent {
  @Input()
    trip?: TripModel;

  constructor (
    private weatherService: WeatherService,
  ) {}

  onTripCardClick () {
    if (this.trip) {
      this.weatherService.getWeatherList(this.trip.city, this.trip.startDate, this.trip.endDate);
      this.weatherService.getTodayWeather(this.trip.city, this.trip.startDate);
    }
  }

  transformDate (date: string | undefined) {
    if (date) {
      const dateObj = new Date(date);
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const day = String(dateObj.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    return 'yyyy-mm-dd';
  }
}
