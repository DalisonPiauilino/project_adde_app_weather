import { AfterViewInit, Component } from '@angular/core';
import { AppService, Weather, WeatherItens } from 'src/app/app.service';
import { WeatherService } from 'src/app/services/weather.service';
import { GeocoderAutocomplete } from '@geoapify/geocoder-autocomplete';

@Component({
  selector: 'app-select-city',
  templateUrl: './select-city.component.html',
  styleUrls: ['./select-city.component.css']
})
export class SelectCityComponent implements AfterViewInit {
  weather_forecast: Weather = new Weather();
  city: String = "";

  constructor(
    private _service: WeatherService,
    private _appService: AppService
  ) { 
    
  }  
  ngAfterViewInit(): void {
    const autocomplete = new GeocoderAutocomplete(
      document.getElementById("autocomplete"),
      '7dbeeee231974a74bda7c4da184db5b3',
      {
        placeholder: 'Insira o nome de uma cidade aqui'
      }
    );
    autocomplete.on('select', (location) => {
      this._service.load(location.properties.city).subscribe((data: any) => {
        this._service.mountData(data);
      })
    });
  }

  submit() {
    this._service.load(this.city).subscribe((data:any) => {
      this._service.mountData(data);
    })
  }

}
