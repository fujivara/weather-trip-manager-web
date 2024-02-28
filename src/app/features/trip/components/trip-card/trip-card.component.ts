import { Component, Input } from '@angular/core';
import { TripModel } from '../../models/trip.model';
import { TripService } from '../../services/trip.service';
import { NgStyle } from '@angular/common';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'trip-card',
  templateUrl: 'trip-card.component.html',
  styleUrl: 'trip-card.component.css',
  standalone: true,
  imports: [
    NgStyle,
  ],
})
export class TripCardComponent {
  @Input()
    trip?: TripModel;

  @Input()
    index: string | undefined;


  constructor (
    private tripService: TripService,
    private weatherService: WeatherService,
  ) {}

  onTripCardClick () {
    if (this.trip) {
      this.weatherService.getWeatherList(this.trip.place, this.trip.startDate, this.trip.endDate);
      this.weatherService.getTodayWeather(this.trip.place, this.trip.startDate);
    }
  }
}
