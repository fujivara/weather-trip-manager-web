import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/layout/header/header.component';
import { filter, Subscription, take } from 'rxjs';
import { AuthService } from './features/auth/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { WeatherService } from './features/trip/services/weather.service';
import { TripService } from './features/trip/services/trip.service';
import { CityService } from './features/trip/services/city.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    HeaderComponent,
  ],
  providers: [AuthService, WeatherService, TripService, CityService],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  paramsSub = new Subscription();
  routerEventsSub = new Subscription();

  constructor (
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit (): void {
    this.paramsSub = this.route.queryParams.pipe(
      filter((params) => params['token']),
      take(1),
    ).subscribe((params) => {
      const token = params['token'];
      localStorage.setItem('token', token);

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          token: null,
        },
        queryParamsHandling: 'merge',
      });
    });

    this.routerEventsSub = this.router.events.subscribe((event) => {
      if (event.type === 1) {
        this.authService.login().subscribe((user) => {
          this.authService.user.next(user);
          this.authService.isLoggedIn = true;

        }, (error) => {
          console.error(error);
          localStorage.removeItem('token');
        });
      }
    });
  }

  ngOnDestroy (): void {
    this.routerEventsSub.unsubscribe();
    this.paramsSub.unsubscribe();
  }
}
