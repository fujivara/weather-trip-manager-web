import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CityModel } from '../models/city.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable()
export class CityService {
  constructor (private http: HttpClient) {}

  getAll (): Observable<CityModel[]> {
    return this.http.get(`${environment.API_BASE_URL}/cities`) as Observable<CityModel[]>;
  }
}
