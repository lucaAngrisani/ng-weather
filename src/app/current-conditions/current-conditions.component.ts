import { Component, OnInit } from '@angular/core';
import { LocationConditionComponent } from 'app/location-condition/location-condition.component';
import { LocationService } from 'app/location.service';
import { TabComponent } from 'app/tabs/tab/tab.component';
import { TabsComponent } from "../tabs/tabs.component";
import { WeatherService } from "../weather.service";

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css'],
  standalone: true,
  imports: [
    TabComponent,
    TabsComponent,
    LocationConditionComponent
  ]
})
export class CurrentConditionsComponent implements OnInit {

  activatedIndex: number = 0;

  constructor(
    private locationService: LocationService,
    protected weatherService: WeatherService,
  ) { }

  ngOnInit() {
    this.activatedIndex = Number(sessionStorage.getItem(TAB_INDEX));
    this.weatherService.onAddCondition.subscribe(index => this.activatedIndex = index);
  }

  removeLocation(index: number) {
    const zipcode = this.weatherService.getCurrentConditions()?.[index]?.zip;
    this.locationService.removeLocation(zipcode);
    this.weatherService.removeCurrentConditions(zipcode);
  }

  selectLocation(index: number) {
    sessionStorage.setItem(TAB_INDEX, JSON.stringify(index));
  }
}

const TAB_INDEX = "TAB_INDEX";