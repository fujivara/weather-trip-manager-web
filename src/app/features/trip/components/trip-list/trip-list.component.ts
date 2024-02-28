import { Component, OnInit } from '@angular/core';
import { TripModel } from '../../models/trip.model';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { NgForOf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TripService } from '../../services/trip.service';

@Component({
  selector: 'trip-list',
  templateUrl: 'trip-list.component.html',
  styleUrl: 'trip-list.component.css',
  standalone: true,
  imports: [
    TripCardComponent,
    NgForOf,
    RouterLink,
  ],
})
export class TripListComponent implements OnInit {
  constructor (private tripService: TripService) {}

  trips: TripModel[] = [
    {
      place: 'Berlin',
      image: 'https://www.berlin.de/binaries/asset/image_assets/6243462/ratio_4_3/1685015072/800x600/',
      startDate: '2024-02-28',
      endDate: '2024-02-29',
    },
  ];

  onAddTrip () {
    this.tripService.tripEditing.next(true);
  }

  ngOnInit (): void {
    this.tripService.newTrip.subscribe((trip) => {
      this.trips.unshift(trip);
    });
  }

}
