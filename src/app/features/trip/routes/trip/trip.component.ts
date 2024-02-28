import { Component, OnInit } from '@angular/core';
import { TripListComponent } from '../../components/trip-list/trip-list.component';
import { RouterOutlet } from '@angular/router';
import { TripEditComponent } from '../../components/trip-edit/trip-edit.component';
import { TripService } from '../../services/trip.service';
import { NgIf } from '@angular/common';
import { WeatherListComponent } from '../../components/weather-list/weather-list.component';
import { WeatherCardComponent } from '../../components/weather-card/weather-card.component';
import { ErrorModalComponent } from '../../../../core/layout/error-modal/error-modal.component';


@Component({
  templateUrl: 'trip.component.html',
  styleUrl: 'trip.component.css',
  standalone: true,
  imports: [
    TripListComponent,
    RouterOutlet,
    TripEditComponent,
    NgIf,
    WeatherListComponent,
    WeatherCardComponent,
    ErrorModalComponent,
  ],
})
export class TripComponent implements OnInit {
  isEditing = false;

  constructor (private tripService: TripService) {}

  ngOnInit (): void {
    this.tripService.tripEditing.subscribe((value) => {
      this.isEditing = value;
    });
    this.tripService.newTrip.subscribe(() => {
      this.isEditing = false;
    });
  }

}
