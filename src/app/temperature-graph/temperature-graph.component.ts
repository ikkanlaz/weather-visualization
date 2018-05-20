import { Component, AfterContentInit } from '@angular/core';
import alcatraz from '../../assets/testData/alcatraz';
import * as d3 from 'd3';
import * as moment from 'moment';

@Component({
  selector: 'app-temperature-graph',
  templateUrl: './temperature-graph.component.html',
  styleUrls: ['./temperature-graph.component.scss']
})
export class TemperatureGraphComponent implements AfterContentInit {

  weatherData: object = alcatraz;

  constructor() { }

  ngAfterContentInit() {
    this.buildTemperatureGraph();
  }

  buildTemperatureGraph() {
    let vis = d3.select("#graph")
      .append("svg")
      .attr("width", 500)
      .attr("height", 400);

    var nodes = this.getHourlyTemperatureData();
    var links = this.getLinks(nodes);

    vis.selectAll(".line")
      .data(links)
      .enter()
      .append("line")
      .attr("x1", function (d) { return d.source.x })
      .attr("y1", function (d) { return d.source.y })
      .attr("x2", function (d) { return d.target.x })
      .attr("y2", function (d) { return d.target.y })
      .style("stroke", "rgb(6,120,155)");
  }

  getHourlyTemperatureData() {
    let data = this.weatherData["hourly"].data;
    console.log(data);
    let startTime = data[0].time;
    return data.map(hourData => {
      return {
        x: ((hourData.time - startTime) / 1000) * 2.5,
        y: parseInt(hourData.temperature) * 3
      }
    });
  }

  getLinks(data) {
    let links = [];
    for (let i = 0; i < data.length - 1; i++) {
      links.push({
        source: data[i],
        target: data[i + 1]
      })
    }
    return links;
  }

  getTimeDataRetrieved() {
    return this.weatherData["currently"].time;
  }

}
