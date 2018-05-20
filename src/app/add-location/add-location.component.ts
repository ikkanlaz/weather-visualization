import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss']
})
export class AddLocationComponent implements OnInit {

  locationText: string;
  locations = [];
  alerts = [];

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.currentLocation.subscribe(location => {
      this.locationText = location;
    });
    this.data.locations.subscribe(locations => this.locations = locations);
  }

  addAlert(alertText: string) {
    this.alerts.push({
      id: 1,
      type: 'info',
      message: alertText,
    });
  }

  addLocation() {
    let newLocation = this.locationText.trim();
    if (this.locations.includes(newLocation)) {
      this.addAlert("Location already added");
    } else {
      this.data.addLocation(newLocation);
      this.locationText = '';
    }
  }

}
