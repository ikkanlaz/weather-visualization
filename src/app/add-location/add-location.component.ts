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

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.currentLocation.subscribe(location => {
      this.locationText = location;
    });
    this.data.locations.subscribe(locations => this.locations = locations);
  }

  addLocation() {
    let newLocation = this.locationText.trim();
    if (this.locations.includes(newLocation)) {
      console.log("already added");
    } else {
      this.data.addLocation(newLocation);
      this.locationText = '';
    }
  }

}
