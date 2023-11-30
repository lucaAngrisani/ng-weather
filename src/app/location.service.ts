import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export const LOCATIONS: string = "locations";

@Injectable()
export class LocationService {

  locations: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor() {
    const locString = localStorage.getItem(LOCATIONS);
    if (locString)
      this.locations.next(JSON.parse(locString));
  }

  addLocation(zipcode: string) {
    if (zipcode) {
      const locations = this.locations.getValue();
      locations.push(zipcode);
      this.locations.next(locations);
      localStorage.setItem(LOCATIONS, JSON.stringify(locations));
    }
  }

  removeLocation(zipcode: string) {
    let locations = this.locations.getValue();
    let zipFound = locations.find(loc => loc == zipcode);
    if (zipFound) {
      locations = locations.filter(loc => loc != zipFound);
      this.locations.next(locations)
      localStorage.setItem(LOCATIONS, JSON.stringify(locations));
    }
  }
}
