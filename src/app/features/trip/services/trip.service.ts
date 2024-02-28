import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TripModel } from '../models/trip.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { OrderEnum } from '../../../core/enums/order.enum';

@Injectable()
export class TripService {
  tripEditing = new Subject<boolean>();
  tripSelected = new Subject<TripModel>();
  newTrip = new Subject<TripModel>();

  constructor (private http: HttpClient) {}

  create (trip: TripModel): Observable<TripModel> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.post('http://localhost:4455/trips',
      { ...trip }, { headers }) as Observable<TripModel>;
  }

  getAll (search: string, order?: string): Observable<TripModel[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    let params = new HttpParams({
      fromObject: {
        'search': search,
      },
    });

    if (order) {
      params = params.append('order', order === OrderEnum.ASC ? 'asc' : 'desc');
    }

    return this.http.get('http://localhost:4455/trips', { params, headers }) as Observable<TripModel[]>;
  }
}
