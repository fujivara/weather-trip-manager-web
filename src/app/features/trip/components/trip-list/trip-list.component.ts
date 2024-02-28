import { Component, OnInit } from '@angular/core';
import { TripModel } from '../../models/trip.model';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { NgForOf, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TripService } from '../../services/trip.service';
import { OrderEnum } from '../../../../core/enums/order.enum';
import { ErrorModalComponent } from '../../../../core/layout/error-modal/error-modal.component';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'trip-list',
  templateUrl: 'trip-list.component.html',
  styleUrl: 'trip-list.component.css',
  standalone: true,
  imports: [
    TripCardComponent,
    NgForOf,
    RouterLink,
    ErrorModalComponent,
    NgIf,
  ],
})
export class TripListComponent implements OnInit {
  search = '';
  sortOrder = OrderEnum.ASC;
  isError = false;
  error = '';

  constructor (
    private tripService: TripService,
    private authService: AuthService,
  ) {}

  trips: TripModel[] = [
    {
      id: 'unique-super-cool-id',
      cityName: 'Berlin',
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
    if (!this.authService.isLoggedIn) {
      this.isError = true;
      this.error = 'Login before start';
    } else {
      this.tripService.tripEditing.next(true);
    }
  }

  onSearch (event: any) {
    this.search = event.target.value;
    this.tripService.getAll(this.search, this.sortOrder).subscribe((trips) => {
      this.trips = trips;
    }, (error) => {
      this.handleError(error);
    });
  }

  onSort (event: any) {
    this.sortOrder = event.target.value === 'ascending' ? OrderEnum.ASC : OrderEnum.DESC;
    this.tripService.getAll(this.search, this.sortOrder).subscribe((trips) => {
      this.trips = trips;
    }, (error) => {
      this.handleError(error);
    });
  }

  handleError (error: any) {
    console.error(error);
    this.isError = true;
    this.error = 'Login before start';
  }

  handleCloseModal () {
    this.isError = false;
    this.error = '';
  }

}
