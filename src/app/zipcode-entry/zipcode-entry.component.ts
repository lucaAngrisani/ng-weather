import { Component } from '@angular/core';
import { WeatherService } from 'app/weather.service';
import { LocationService } from "../location.service";

@Component({
  selector: 'app-zipcode-entry',
  templateUrl: './zipcode-entry.component.html',
  standalone: true
})
export class ZipcodeEntryComponent {

  constructor(
    private locationService: LocationService,
    private weatherService: WeatherService,
  ) { }

  async addLocation(zipcode: string) {
    const locations = this.locationService.locations.getValue();
    if (locations.every(location => location != zipcode)) {
      zipcode = await this.weatherService.addCurrentConditions(zipcode);
      zipcode && this.locationService.addLocation(zipcode);
    }
  }

}
