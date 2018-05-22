import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Geocode } from './geocode';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  getGeocode(location: String) {
    return this.http.get<Geocode>(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${environment.gooleMapsApiKey}`);
  }
}
