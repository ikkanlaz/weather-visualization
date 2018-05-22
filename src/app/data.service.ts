import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from './api.service';
import { Geocode } from './geocode';

import { BehaviorSubject, Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DataService {

  geocode: Geocode;

  private locationsSource = new BehaviorSubject<string[]>([]);
  locations = this.locationsSource.asObservable();

  private currentLocationSource = new BehaviorSubject<string>('');
  currentLocation = this.currentLocationSource.asObservable();

  private currentLocationDataSource = new BehaviorSubject<Geocode>({
    formatted_address: '',
    lat: 37.4224082,
    lng: -122.0856086
  });
  currentLocationData = this.currentLocationDataSource.asObservable();

  constructor(private http: HttpClient, private api: ApiService) { }

  changeCurrentLocation(location: string) {
    this.currentLocationSource.next(location);
    this.getGeocode(location);
  }

  getGeocode(location: string) {
    this.api.getGeocode(location)
      .subscribe((data: Geocode) => this.geocode = {
        formatted_address: data['results'][0].formatted_address,
        lat: data['results'][0].geometry.location.lat,
        lng: data['results'][0].geometry.location.lng
      });
    this.api.getGeocode(location);
  }

  addLocation(location: string): void {
    this.changeCurrentLocation(location);
    this.locationsSource.next(this.locationsSource.getValue().concat([location]));
  }

}
