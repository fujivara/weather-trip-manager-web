import { Routes } from '@angular/router';
import { TripComponent } from './features/trip/routes/trip/trip.component';
import { TripEditComponent } from './features/trip/components/trip-edit/trip-edit.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'trips',
  },
  {
    path: 'trips',
    component: TripComponent,
    children: [
      {
        path: 'edit',
        component: TripEditComponent,
      },
    ],
  },

];
