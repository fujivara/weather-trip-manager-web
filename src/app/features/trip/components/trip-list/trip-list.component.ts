import { Component, OnInit } from '@angular/core';
import { TripModel } from '../../models/trip.model';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { NgForOf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TripService } from '../../services/trip.service';
import { OrderEnum } from '../../../../core/enums/order.enum';

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
  search = '';
  sortOrder = OrderEnum.ASC;

  constructor (private tripService: TripService) {}

  trips: TripModel[] = [
    {
      id: 'unique-super-cool-id',
      city: 'Berlin',
      image: 'https://www.berlin.de/binaries/asset/image_assets/6243462/ratio_4_3/1685015072/800x600/',
      startDate: '2024-02-29',
      endDate: '2024-02-30',
    },
  ];

  ngOnInit (): void {
    this.tripService.newTrip.subscribe((trip) => {
      this.trips.push(trip);
    });
    this.tripService.getAll('', this.sortOrder).subscribe((trips) => {
      this.trips = trips;
    });
  }

  onAddTrip () {
    this.tripService.tripEditing.next(true);
  }

  onSearch (event: any) {
    this.search = event.target.value;
    this.tripService.getAll(this.search, this.sortOrder)
      .subscribe((trips) => {
        this.trips = trips;
      });
  }

  onSort (event: any) {
    this.sortOrder = event.target.value === 'ascending' ? OrderEnum.ASC : OrderEnum.DESC;
    this.tripService.getAll(this.search, this.sortOrder).subscribe((trips) => {
      this.trips = trips;
    });
  }

}
