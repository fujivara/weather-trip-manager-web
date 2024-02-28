import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherModel } from '../../models/weather.model';
import { NgIf } from '@angular/common';
import { WeatherService } from '../../services/weather.service';
import { DAYS_OF_WEEK } from '../../../../../utils/constants';

@Component({
  selector: 'weather-card',
  templateUrl: 'weather-card.component.html',
  styleUrl: 'weather-card.component.css',
  standalone: true,
  imports: [
    NgIf,
  ],
})
export class WeatherCardComponent implements OnInit, OnDestroy {
  weather?: WeatherModel;
  private targetDate?: Date;
  private intervalId: any;
  timerMinutes = '00';
  timerDays = '00';
  timerHours = '00';
  timerSeconds = '00';

  constructor (private weatherService: WeatherService) {}

  ngOnInit () {
    this.weatherService.todayWeather.subscribe((data: any) => {
      const currDay = data.weather.days[0];
      this.weather = {
        day: DAYS_OF_WEEK[(new Date(currDay.datetime)).getDay()],
        image: `assets/weather/${currDay.icon}.svg`,
        city: data.city,
        tempCurr: Number.parseInt(currDay.temp),
      };

      this.timerMinutes = '00';
      this.timerDays = '00';
      this.timerHours = '00';
      this.timerSeconds = '00';

      this.stopTimer();
      this.targetDate = new Date(data.startDate);
      this.startTimer();
    });
  }

  ngOnDestroy () {
    this.stopTimer();
  }

  private startTimer () {
    this.intervalId = setInterval(() => {
      this.updateTimer();
    }, 1000);
  }

  private stopTimer () {
    clearInterval(this.intervalId);
  }

  private updateTimer () {
    const currentDate = new Date();
    let difference = 0;

    if (this.targetDate) {
      difference = this.targetDate.getTime() - currentDate.getTime();
    }

    if (difference <= 0) {
      this.stopTimer();
      this.timerMinutes = '00';
      this.timerDays = '00';
      this.timerHours = '00';
      this.timerSeconds = '00';
    } else {
      const seconds = Math.floor(difference / 1000) % 60;
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));

      this.timerMinutes = this.formatTwoDigits(minutes);
      this.timerDays = this.formatTwoDigits(days);
      this.timerHours = this.formatTwoDigits(hours);
      this.timerSeconds = this.formatTwoDigits(seconds);
    }
  }

  private formatTwoDigits (num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
}
