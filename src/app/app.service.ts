import { Injectable, EventEmitter } from '@angular/core';

export class WeatherItens {
  description: String
  temp: number
  temp_max: number
  temp_min: number
  humidity: number
  icon: String
  weekday: String
  date: String
}

export class Weather {
  city: String
  list: Array<WeatherItens>
}

@Injectable()
export class AppService {

  private _weathers: Weather;
  public get weathers(): Weather {
    return this._weathers;
  }
  public set weathers(value: Weather) {
    this._weathers = value;
  }
  public Weathers: EventEmitter<Weather> = new EventEmitter();

  constructor(
  ) {
    this.Weathers.subscribe(value => { this.weathers = value; });
  }
}
