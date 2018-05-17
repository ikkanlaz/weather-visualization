import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss']
})
export class AddLocationComponent implements OnInit {

  locationText: string;

  @Output() locationInputEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  addLocation() {
    this.locationInputEvent.emit(this.locationText);
  }

}
