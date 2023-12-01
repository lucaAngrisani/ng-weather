import { Injectable, Signal, signal } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { LocationService } from './location.service';
import { ConditionsAndZip } from './models/conditions-and-zip.type';
import { CurrentConditions } from './models/current-conditions.type';
import { Forecast } from './models/forecast.type';

@Injectable()
export class WeatherService {

  static URL = 'https://api.openweathermap.org/data/2.5';
  static APPID = '5a4b2d457ecbef9eb2a71e480b947604';
  static ICON_URL = 'https://raw.githubusercontent.com/udacity/Sunshine-Version-2/sunshine_master/app/src/main/res/drawable-hdpi/';

  private currentConditions = signal<ConditionsAndZip[]>([]);
  private selectedCondition = signal<ConditionsAndZip>(null);

  constructor(
    private http: HttpClient,
    private locationService: LocationService
  ) { }

  init() {
    const locations = this.locationService.locations.getValue();
    locations.forEach((zipcode, i) => {
      this.addCurrentConditions(zipcode, i == 0);
    });
  }

  async addCurrentConditions(zipcode: string, updateSelected: boolean = false): Promise<string> {
    // Here we make a request to get the current conditions data from the API. Note the use of backticks and an expression to insert the zipcode
    const data = await firstValueFrom(this.http.get<CurrentConditions>(`${WeatherService.URL}/weather?zip=${zipcode},us&units=imperial&APPID=${WeatherService.APPID}`));
    const condition = { zip: zipcode, data };
    this.currentConditions.update(conditions => {
      conditions.push(condition);
      return [...conditions];
    });

    updateSelected && this.selectCondition(condition);

    return zipcode;
  }

  selectCondition(condition: ConditionsAndZip) {
    this.selectedCondition.update(() => {
      return condition;
    })
  }

  removeCurrentConditions(zipcode: string) {
    this.currentConditions.update(conditions => {
      for (let i in conditions) {
        if (conditions[i].zip == zipcode)
          conditions.splice(+i, 1);
      }

      return [...conditions];
    })
  }

  getCurrentConditions(): Signal<ConditionsAndZip[]> {
    return this.currentConditions.asReadonly();
  }

  getSelectedCondition(): Signal<ConditionsAndZip> {
    return this.selectedCondition.asReadonly();
  }

  getForecast(zipcode: string): Observable<Forecast> {
    // Here we make a request to get the forecast data from the API. Note the use of backticks and an expression to insert the zipcode
    return this.http.get<Forecast>(`${WeatherService.URL}/forecast/daily?zip=${zipcode},us&units=imperial&cnt=5&APPID=${WeatherService.APPID}`);

  }

  getWeatherIcon(id): string {
    if (id >= 200 && id <= 232)
      return WeatherService.ICON_URL + "art_storm.png";
    else if (id >= 501 && id <= 511)
      return WeatherService.ICON_URL + "art_rain.png";
    else if (id === 500 || (id >= 520 && id <= 531))
      return WeatherService.ICON_URL + "art_light_rain.png";
    else if (id >= 600 && id <= 622)
      return WeatherService.ICON_URL + "art_snow.png";
    else if (id >= 801 && id <= 804)
      return WeatherService.ICON_URL + "art_clouds.png";
    else if (id === 741 || id === 761)
      return WeatherService.ICON_URL + "art_fog.png";
    else
      return WeatherService.ICON_URL + "art_clear.png";
  }

}
