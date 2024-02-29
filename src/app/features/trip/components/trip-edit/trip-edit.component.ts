import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule, ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { TripService } from '../../services/trip.service';
import { NgForOf, NgStyle } from '@angular/common';
import { WeatherService } from '../../services/weather.service';
import { CityService } from '../../services/city.service';
import { CityModel } from '../../models/city.model';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'trip-edit',
  templateUrl: 'trip-edit.component.html',
  styleUrl: 'trip-edit.component.css',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    ReactiveFormsModule,
    NgStyle,
    RouterLink,
  ],
})
export class TripEditComponent implements OnInit {
  cities?: CityModel[];
  editTripForm = new FormGroup<any>({
    city: new FormControl(''),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
  });

  constructor (
    private tripService: TripService,
    private weatherService: WeatherService,
    private cityService: CityService,
    private router: Router,
  ) {}

  ngOnInit () {
    this.cityService.getAll().subscribe((cities) => {
      this.cities = cities;
      this.editTripForm.setControl('city', new FormControl('', [
        Validators.required,
        this.arrayValidator(this.cities ? this.cities.map((city) => city.name) : []),
      ]));
    });
  }

  onSubmit () {
    const { city, startDate, endDate } = this.editTripForm.controls;
    if (city.value && startDate.value && endDate.value && this.cities) {
      if (!this.weatherService.validateTripDates(startDate.value, endDate.value)) {
        startDate.setErrors({ 'invalid': true });
        endDate.setErrors({ 'invalid': true });
        return;
      }

      const image = this.cities.find((c) => c.name === city.value)?.image;

      this.tripService.create({
        cityName: city.value,
        startDate: startDate.value,
        endDate: endDate.value,
        image,
      }).subscribe((trip) => {
        this.tripService.newTrip.next(trip);
      });

      this.router.navigate(['/trips']);
    }
  }

  arrayValidator (array: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value && array.indexOf(value) === -1) {
        return { 'notInArray': true };
      }
      return null;
    };
  }
}
