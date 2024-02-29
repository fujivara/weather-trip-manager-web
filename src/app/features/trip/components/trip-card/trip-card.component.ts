import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TripModel } from '../../models/trip.model';
import { NgStyle } from '@angular/common';
import { WeatherService } from '../../services/weather.service';
import { RouterLink } from '@angular/router';
import { TripService } from '../../services/trip.service';
import { Subscription } from 'rxjs';

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
export class TripCardComponent implements OnInit, OnDestroy {
  @Input()
    trip?: TripModel;

  isSelected = false;
  tripSelected = new Subscription();

  constructor (
    private weatherService: WeatherService,
    private tripService: TripService,
  ) {}

  ngOnInit () {
    this.tripSelected = this.tripService.tripSelected.subscribe((trip) => {
      this.isSelected = !!(this.trip && trip.id === this.trip.id);
    });
  }


  ngOnDestroy (): void {
    this.tripSelected.unsubscribe();
  }

  onTripCardClick () {
    if (this.trip) {
      this.weatherService.getWeatherList(this.trip.cityName, this.trip.startDate, this.trip.endDate);
      this.weatherService.getTodayWeather(this.trip.cityName, this.trip.startDate);
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
