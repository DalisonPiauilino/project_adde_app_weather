import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { AppService, Weather, WeatherItens } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  serviceUrl: String = 'http://127.0.0.1:5000/weather';

  weather_forecast: Weather = new Weather();

  arrayDia = new Array(7);

  constructor(
    private http: HttpClient,
    private _appService: AppService
  ) { 
    this.arrayDia[0] = "Domingo";
    this.arrayDia[1] = "Segunda";
    this.arrayDia[2] = "Terça";
    this.arrayDia[3] = "Quarta";
    this.arrayDia[4] = "Quinta";
    this.arrayDia[5] = "Sexta";
    this.arrayDia[6] = "Sábado";
  }

  loadGeolocation(lat:number, lon: number) {
    return this.http.get(this.serviceUrl + '?lat=' + lat + '&lon=' + lon);
  }

  load(city: String) {
    return this.http.get(this.serviceUrl + '?city=' + city);
  }

  getIconUrl(icon: String) {
    return 'http://openweathermap.org/img/w/' + icon + ".png";
  }

  mountData(data: any){
    this.weather_forecast.city = data.city['name'];
    this.weather_forecast.list = [];
    const dataAtual = new Date();
    const horaAtual = dataAtual.getHours();
    const ultimas3Hs = (horaAtual > 3) ? (horaAtual - 3) : 0;
    console.log(ultimas3Hs);

    let new_data: Array<object> = [];

    for (const i of data['list']) {
      if (montar lista com ultima atualizacao de tempo) {
        new_data.push(i)        
      }
    }

    for (const item of data['list']) {
      const itemDate = new Date(item.dt_txt);
      const itemHs = itemDate.getHours();
      console.log(itemHs);
      if (itemHs >= ultimas3Hs) {
        let itemList: WeatherItens = new WeatherItens();
        itemList.description = item.weather[0].description;
        itemList.icon = this.getIconUrl(item.weather[0].icon);
        itemList.temp = Math.round(item.main.temp);
        itemList.temp_max = Math.round(item.main.temp_max);
        itemList.temp_min = Math.round(item.main.temp_min);
        itemList.humidity = Math.round(item.main.humidity);
        itemList.weekday = this.getDiaExtenso(itemDate.getDay());
        itemList.date = itemDate.toLocaleDateString('pt-BR');
        this.weather_forecast.list.push(itemList);
      }
    }
    this._appService.Weathers.emit(this.weather_forecast);
  }

  getDiaExtenso(dia) {
    return this.arrayDia[dia];
  }
}
