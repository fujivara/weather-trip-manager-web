import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CityModel } from '../models/city.model';
import { Observable } from 'rxjs';

@Injectable()
export class CityService {
  constructor (private http: HttpClient) {}

  getAll (): Observable<CityModel[]> {
    return this.http.get('http://localhost:4455/cities') as Observable<CityModel[]>;
  }
}
