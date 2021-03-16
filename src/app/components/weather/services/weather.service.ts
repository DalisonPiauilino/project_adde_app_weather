import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { AppService, Weather, WeatherItens } from '../../../app.service';
import * as moment from 'moment';

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
    const format = 'hh:mm:ss'
    const dataAtual = new Date();
    const horaAtual = moment(dataAtual).format(format);
    const ultimas3Hs = moment(dataAtual).subtract(2, 'h').format(format);
    const beforeTime = moment(ultimas3Hs, format);
    const afterTime = moment(horaAtual, format);
    
    for (const item of data['list']) {
      const d = moment(item.dt_txt).format(format);
      const itemDate = new Date(item.dt_txt);
      if (moment(d, format).isBetween(beforeTime, afterTime)) {
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
    console.log(this._appService.weathers);
  }

  getDiaExtenso(dia) {
    return this.arrayDia[dia];
  }
}
