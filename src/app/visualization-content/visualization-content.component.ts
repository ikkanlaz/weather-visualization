import { Component, OnInit } from '@angular/core';
import alcatraz from '../../assets/testData/alcatraz';
import * as d3 from 'd3';
import * as moment from 'moment';

@Component({
  selector: 'app-visualization-content',
  templateUrl: './visualization-content.component.html',
  styleUrls: ['./visualization-content.component.scss']
})
export class VisualizationContentComponent implements OnInit {

  weatherData: object = alcatraz;
  dataAge: string;

  constructor() { }

  ngOnInit() {
    this.dataAge = moment.unix(this.getTimeDataRetrieved()).fromNow();
  }

  getTimeDataRetrieved() {
    return this.weatherData["currently"].time;
  }
}
