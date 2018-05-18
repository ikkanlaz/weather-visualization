import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss']
})
export class AddLocationComponent implements OnInit {

  locationText: string;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.currentLocation.subscribe(location => {
      console.log(location);
      this.locationText = location;
    });
  }

  addLocation() {
    this.data.addLocation(this.locationText);
    this.locationText = '';
  }

}
