import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { UserModel } from '../models/user.model';
import { environment } from '../../../../environments/environment';

@Injectable()
export class AuthService {
  user = new Subject<UserModel>();
  isLoggedIn = false;

  constructor (
    private httpClient: HttpClient,
  ) {}

  login () {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.httpClient.post(`${environment.API_BASE_URL}/auth/login`,
      {}, { headers }) as Observable<UserModel>;
  }

}
