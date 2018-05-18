import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private locationsSource = new BehaviorSubject<string[]>([]);
  locations = this.locationsSource.asObservable();

  private currentLocationSource = new BehaviorSubject<string>('');
  currentLocation = this.currentLocationSource.asObservable();

  constructor(private http: HttpClient) { }

  changeCurrentLocation(location: string) {
    this.currentLocationSource.next(location);
  }

  addLocation(location: string): void {
    this.changeCurrentLocation(location);
    this.locationsSource.next(this.locationsSource.getValue().concat([location]));
  }

  getWeatherData() {
    return this.http.get('https://api.darksky.net/forecast/06df2354830e2cbf1ae9fdbede36fcdc/37.8267,-122.4233');
  }

}
