import { Component, OnInit } from '@angular/core';
import { AppService, Weather } from 'src/app/app.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {

  weather: Weather = {
    city: "No City",
    list: [{
      description: "-",
      temp: 0,
      temp_max: 0,
      temp_min: 0,
      humidity: 0,
      icon: "",
      weekday: "",
      date: ""
    }]
  };

  // <h2>{{_appService.weathers['city']['name']}}</h2>
  // <p>
  //     Conditions: {{_appService.weathers.conditions}}<br />
  //     Temperature: {{_appService.weathers.temperature}} °C<br />
  // </p> -->
  // <mat-list>
  //     <mat-list-item *ngFor="let item of _appService.weathers['list']">
  //         <img [src]="item.weather[0].icon" style="float: left;" alt="" />
  //         <h3 matLine> {{item.weather[0].description}} </h3>
  //         <p matLine>
  //             <span> Temperature: {{item.main.temp}} °C </span>
  //         </p>
  //     </mat-list-item>
  // </mat-list>

  constructor(
    public _appService: AppService
  ){
    this._appService.Weathers.emit(this.weather);
  }

}
