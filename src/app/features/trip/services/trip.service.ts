import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TripModel } from '../models/trip.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { OrderEnum } from '../../../core/enums/order.enum';
import { environment } from '../../../../environments/environment';

@Injectable()
export class TripService {
  tripSelected = new Subject<TripModel>();
  newTrip = new Subject<TripModel>();

  constructor (private http: HttpClient) {}

  create (trip: TripModel): Observable<TripModel> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.post(`${environment.API_BASE_URL}/trips`,
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

    return this.http.get(`${environment.API_BASE_URL}/trips`, { params, headers }) as Observable<TripModel[]>;
  }
}
