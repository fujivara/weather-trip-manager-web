import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TripModel } from '../models/trip.model';

@Injectable({ providedIn: 'root' })
export class TripService {
  tripEditing = new Subject<boolean>();
  newTrip = new Subject<TripModel>();
}
