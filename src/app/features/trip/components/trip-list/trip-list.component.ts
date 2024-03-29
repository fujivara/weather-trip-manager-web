import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TripModel } from '../../models/trip.model';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { NgForOf, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TripService } from '../../services/trip.service';
import { OrderEnum } from '../../../../core/enums/order.enum';
import { ErrorModalComponent } from '../../../../core/layout/error-modal/error-modal.component';
import { AuthService } from '../../../auth/services/auth.service';
import { Subscription } from 'rxjs';

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
export class TripListComponent implements OnInit, OnDestroy {
  @ViewChild('horizontalList')
    horizontalList?: ElementRef<HTMLUListElement>;

  search = '';
  sortOrder = OrderEnum.ASC;
  isError = false;
  error = '';
  newTripSub = new Subscription();

  constructor (
    private tripService: TripService,
    private authService: AuthService,
    private router: Router,
  ) {}

  trips: TripModel[] = [];

  ngOnInit (): void {
    this.newTripSub = this.tripService.newTrip.subscribe((trip) => {
      this.trips.push(trip);
    });
    this.tripService.getAll('', this.sortOrder).subscribe((trips) => {
      this.trips = trips;
    });

    this.trips.push({
      id: 'unique-super-cool-id',
      cityName: 'Berlin',
      image: 'https://www.berlin.de/binaries/asset/image_assets/6243462/ratio_4_3/1685015072/800x600/',
      startDate: this.getFormattedDate(new Date(Date.now())),
      endDate: this.getFormattedDate(new Date(new Date().setDate(new Date().getDate() + 2))),
    });
  }

  ngOnDestroy (): void {
    this.newTripSub.unsubscribe();
  }

  onAddTrip () {
    if (!this.authService.isLoggedIn) {
      this.isError = true;
      this.error = 'Login before start';
    } else {
      this.router.navigate(['/trips/edit']);
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

  getFormattedDate (date: Date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  scrollList (amount: number) {
    if (this.horizontalList) {
      this.horizontalList.nativeElement.scrollBy({
        left: amount,
        behavior: 'smooth',
      });
    }
  }
}
