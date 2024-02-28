import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { WeatherModel } from '../../models/weather.model';
import { NgForOf, NgIf } from '@angular/common';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { DAYS_OF_WEEK } from '../../../../../utils/constants';

@Component({
  selector: 'weather-list',
  templateUrl: 'weather-list.component.html',
  styleUrl: 'weather-list.component.css',
  standalone: true,
  imports: [
    NgForOf,
    TripCardComponent,
    NgIf,
  ],
})
export class WeatherListComponent implements OnInit {
  weathers: WeatherModel[] | undefined;

  constructor (private weatherService: WeatherService) {}

  ngOnInit (): void {
    this.weatherService.weatherList.subscribe((weatherList: any) => {
      this.weathers = weatherList.days.map((day: any) => ({
        day: DAYS_OF_WEEK[(new Date(day.datetime)).getDay()],
        image: `assets/weather/${day.icon}.svg`,
        tempMin: Number.parseInt(day.tempmin),
        tempMax: Number.parseInt(day.tempmax),
      }));
    });
  }
}
