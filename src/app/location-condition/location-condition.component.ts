import { DecimalPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConditionsAndZip } from 'app/models/conditions-and-zip.type';
import { WeatherService } from 'app/weather.service';

@Component({
  standalone: true,
  selector: 'app-location-condition',
  templateUrl: './location-condition.component.html',
  styleUrls: ['./location-condition.component.css'],
  imports: [RouterLink, DecimalPipe]
})
export class LocationConditionComponent {

  @Input() location: ConditionsAndZip;

  constructor(
    protected weatherService: WeatherService,
  ) { }

}
