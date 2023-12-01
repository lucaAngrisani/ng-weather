import { Component, OnInit, Signal } from '@angular/core';
import { LocationConditionComponent } from 'app/location-condition/location-condition.component';
import { LocationService } from 'app/location.service';
import { ConditionsAndZip } from '../models/conditions-and-zip.type';
import { ToElTabListPipe } from "../pipes/to-el-tab-list.pipe";
import { ToTabListPipe } from "../pipes/to-tab-list.pipe";
import { TabsComponent } from "../tabs/tabs.component";
import { WeatherService } from "../weather.service";

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css'],
  standalone: true,
  imports: [
    ToTabListPipe,
    ToElTabListPipe,
    TabsComponent,
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

  ngOnInit() { }

  removeLocation(zipcode: string) {
    this.locationService.removeLocation(zipcode);
    this.weatherService.removeCurrentConditions(zipcode);

    if (this.selectedLocation()?.zip == zipcode) {
      this.weatherService.selectCondition(this.currentConditionsByZip()?.[0]);
    }
  }
}
