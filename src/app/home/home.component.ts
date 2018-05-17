import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as d3 from "d3";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Output() locationInputEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  receiveNewLocation($event) {
    this.addLocation($event);
  }

  addLocation(location) {
    this.locationInputEvent.emit(location);
  }

}
