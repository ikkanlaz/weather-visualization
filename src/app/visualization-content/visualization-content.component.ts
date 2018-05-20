import { Component, AfterContentInit } from '@angular/core';
import alcatraz from '../../assets/testData/alcatraz';
import * as d3 from 'd3';
import * as moment from 'moment';

@Component({
  selector: 'app-visualization-content',
  templateUrl: './visualization-content.component.html',
  styleUrls: ['./visualization-content.component.scss']
})
export class VisualizationContentComponent implements AfterContentInit {

  weatherData: object = alcatraz;
  dataAge: string;

  constructor() { }

  ngAfterContentInit() {
    this.buildTemperatureGraph();
  }

  buildTemperatureGraph() {
    this.dataAge = moment.unix(this.getTimeDataRetrieved()).fromNow();
    let vis = d3.select("#graph")
      .append("svg");
    vis.attr("width", "100%")
      .attr("height", 500);

    var nodes = this.getHourlyTemperatureData();

    vis.selectAll("circle.nodes")
      .data(nodes)
      .enter()
      .append("svg:circle")
      .attr("cx", function (d) { return d["x"]; })
      .attr("cy", function (d) { return d["y"]; })
      .attr("r", "1px")
      .attr("fill", "black")
  }

  getHourlyTemperatureData() {
    let data = this.weatherData["hourly"].data;
    console.log(data);
    let startTime = data[0].time;
    let x = data.map(hourData => {
      return {
        x: ((hourData.time - startTime) / 1000) * 2.5,
        y: parseInt(hourData.temperature) * 3
      }
    });
    return x;
  }

  getTimeDataRetrieved() {
    return this.weatherData["currently"].time;
  }



  // radius = 10;

  // ngAfterContentInit() {
  //   d3.select('p').style('color', 'red');
  // }

  // colorMe() {
  //   d3.select('button').style('color', 'red');
  // }

  // clicked(event: any) {
  //   d3.select(event.target).append('circle')
  //     .attr('cx', event.x - 100)
  //     .attr('cy', event.y - 275)
  //     .attr('r', () => {
  //       return this.radius;
  //     })
  //     .attr('fill', 'red');
  // }

}
