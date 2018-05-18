import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import * as d3 from 'd3';
import { PathLocationStrategy } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private data: DataService, private router: Router) { }

  ngOnInit() {
    this.data.locations.subscribe(locations => {
      if (locations.length > 0) {
        this.router.navigate(['/app']);
      }
    });
  }
}
