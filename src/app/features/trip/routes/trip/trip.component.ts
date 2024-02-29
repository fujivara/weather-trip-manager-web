import { Component, OnInit } from '@angular/core';
import { TripListComponent } from '../../components/trip-list/trip-list.component';
import { ActivatedRoute, Router, RouterLinkActive, RouterOutlet } from '@angular/router';
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
    RouterLinkActive,
  ],
})
export class TripComponent implements OnInit {
  isEditing = false;

  constructor (
    private tripService: TripService,
    private router: Router,
  ) {}

  ngOnInit (): void {
    this.router.events.subscribe((event) => {
      if (event.type === 1 && event.url === '/trips') {
        this.isEditing = false;
      } else if (event.type === 1 && event.url === '/trips/edit') {
        this.isEditing = true;
      }
    });
    if (this.router.url === '/trips/edit') {
      this.isEditing = true;
    }
    this.tripService.newTrip.subscribe(() => {
      this.isEditing = false;
    });
  }

}
