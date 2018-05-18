import { Component, AfterContentInit } from '@angular/core';
import alcatraz from '../../assets/testData/alcatraz';
import * as d3 from 'd3';

@Component({
  selector: 'app-visualization-content',
  templateUrl: './visualization-content.component.html',
  styleUrls: ['./visualization-content.component.scss']
})
export class VisualizationContentComponent implements AfterContentInit {

  weatherData: object = alcatraz;

  constructor() { }

  // ngOnInit() {
  //   console.log(this.weatherData);
  // }

  radius = 10;

  ngAfterContentInit() {
    d3.select('p').style('color', 'red');
  }

  colorMe() {
    d3.select('button').style('color', 'red');
  }

  clicked(event: any) {
    d3.select(event.target).append('circle')
      .attr('cx', event.x - 85)
      .attr('cy', event.y - 275)
      .attr('r', () => {
        return this.radius;
      })
      .attr('fill', 'red');
  }

}
