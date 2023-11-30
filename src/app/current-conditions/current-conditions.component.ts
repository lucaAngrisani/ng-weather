import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, Signal } from '@angular/core';
import { LocationConditionComponent } from 'app/location-condition/location-condition.component';
import { LocationService } from 'app/location.service';
import { ConditionsAndZip } from '../conditions-and-zip.type';
import { WeatherService } from "../weather.service";

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css'],
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    JsonPipe,
    LocationConditionComponent
  ]
})
export class CurrentConditionsComponent implements OnInit {

  protected currentConditionsByZip: Signal<ConditionsAndZip[]> = this.weatherService.getCurrentConditions();
  protected selectedLocation: Signal<ConditionsAndZip> = this.weatherService.getSelectedCondition();

  constructor(
    private locationService: LocationService,
    protected weatherService: WeatherService,
  ) { }

  ngOnInit() {

  }

  removeLocation(zipcode: string) {
    this.locationService.removeLocation(zipcode);
    this.weatherService.removeCurrentConditions(zipcode);

    if (this.selectedLocation()?.zip == zipcode) {
      this.weatherService.selectCondition(this.currentConditionsByZip()?.[0]);
    }
  }
}
