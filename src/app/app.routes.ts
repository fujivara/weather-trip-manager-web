import { Routes } from '@angular/router';
import { TripComponent } from './features/trip/routes/trip/trip.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'trips',
  },
  {
    path: 'trips',
    component: TripComponent,
  },

];
