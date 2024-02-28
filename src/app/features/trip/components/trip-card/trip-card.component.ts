import { Component, Input, OnInit } from '@angular/core';
import { TripModel } from '../../models/trip.model';
import { NgStyle } from '@angular/common';
import { WeatherService } from '../../services/weather.service';
import { RouterLink } from '@angular/router';
import { TripService } from '../../services/trip.service';

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
export class TripCardComponent implements OnInit {
  @Input()
    trip?: TripModel;

  isSelected = false;

  constructor (
    private weatherService: WeatherService,
    private tripService: TripService,
  ) {}

  ngOnInit () {
    this.tripService.tripSelected.subscribe((trip) => {
      this.isSelected = !!(this.trip && trip.id === this.trip.id);
    });
  }

  onTripCardClick () {
    if (this.trip) {
      this.weatherService.getWeatherList(this.trip.city, this.trip.startDate, this.trip.endDate);
      this.weatherService.getTodayWeather(this.trip.city, this.trip.startDate);
      this.tripService.tripSelected.next(this.trip);
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
