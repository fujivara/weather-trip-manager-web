import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/layout/header/header.component';
import { filter, take } from 'rxjs';
import { AuthService } from './features/auth/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { WeatherService } from './features/trip/services/weather.service';
import { TripService } from './features/trip/services/trip.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    HeaderComponent,
  ],
  providers: [AuthService, WeatherService, TripService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor (
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit (): void {
    this.route.queryParams.pipe(
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

    this.router.events.subscribe((event) => {
      if (event.type === 1) {
        this.authService.login().subscribe((user) => {
          this.authService.user.next(user);
        }, (error) => {
          console.error(error);
          localStorage.removeItem('token');
        });
      }
    });
  }
}
