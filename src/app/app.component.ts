import { Component, OnInit } from '@angular/core';
import { WeatherService } from './components/weather/services/weather.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'weather';

  constructor(
    private _service: WeatherService
  ){
  }
  ngOnInit(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition ((e) => {
        const lat = e.coords.latitude;
        const lon = e.coords.longitude;
        this.getByGeolocation(lat, lon);
      })
    }
  }

  getByGeolocation(lat:number, lon: number) {
    this._service.loadGeolocation(lat, lon).subscribe((data:any) => {
      this._service.mountData(data);
    });
  }
}
