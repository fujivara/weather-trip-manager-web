import { Component } from '@angular/core';
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
import { cities } from '../../data/cities';
import { NgForOf, NgStyle } from '@angular/common';
import { WeatherService } from '../../services/weather.service';

function arrayValidator (array: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value && array.indexOf(value) === -1) {
      return { 'notInArray': true };
    }
    return null;
  };
}

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
  ],
})
export class TripEditComponent {
  cities = cities;
  editTripForm = new FormGroup({
    city: new FormControl('', [Validators.required, arrayValidator(cities.map((city) => city.name))]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
  });

  constructor (
    private tripService: TripService,
    private weatherService: WeatherService,
  ) {}

  onCancel () {
    this.tripService.tripEditing.next(false);
  }

  onSubmit () {
    const { city, startDate, endDate } = this.editTripForm.controls;
    console.log(startDate.value);
    if (city.value && startDate.value && endDate.value) {
      if (!this.weatherService.validateTripDates(startDate.value, endDate.value)) {
        console.log('idi');
        startDate.setErrors({ 'invalid': true });
        endDate.setErrors({ 'invalid': true });
        return;
      }
      // this.weatherService.getWeatherList(city.value, startDate.value, endDate.value);
      this.tripService.newTrip.next({
        place: city.value,
        startDate: startDate.value,
        endDate: endDate.value,
        image: 'https://www.berlin.de/binaries/asset/image_assets/6243462/ratio_4_3/1685015072/800x600/',
      });
    }
  }
}
