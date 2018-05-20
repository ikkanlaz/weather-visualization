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
    let width = 800;
    let height = 400;
    var nodes = this.getHourlyTemperatureData();
    var links = this.getLinks(nodes);
    let startTime = this.getHourlyDataStartTime();
    let endTime = this.getHourlyDataEndTime();
    let lowestTemp = this.getLowestTemp() + 5;
    let highestTemp = this.getHighestTemp() + 5;

    let svg = d3.select("#graph")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    let plotMargins = {
      top: 30,
      bottom: 30,
      left: 80,
      right: 30
    };
    let plotGroup = svg.append('g')
      .classed('plot', true)
      .attr('transform', `translate(${plotMargins.left},${plotMargins.top})`);

    let plotWidth = width - plotMargins.left - plotMargins.right;
    let plotHeight = height - plotMargins.top - plotMargins.bottom;

    let xScale = d3.scaleTime()
      .domain([startTime, endTime])
      .nice()
      .range([0, plotWidth]);
    let xAxis = d3.axisBottom(xScale);
    let xAxisGroup = plotGroup.append('g')
      .classed('x', true)
      .classed('axis', true)
      .attr('transform', `translate(${0},${plotHeight})`)
      .call(xAxis);

    let yScale = d3.scaleLinear()
      .domain([lowestTemp, highestTemp])
      .range([plotHeight, 0]);
    let yAxis = d3.axisLeft(yScale);
    let yAxisGroup = plotGroup.append('g')
      .classed('y', true)
      .classed('axis', true)
      .call(yAxis);



    plotGroup.selectAll(".line")
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

  getHourlyDataStartTime() {
    return moment.unix(this.weatherData["hourly"].data[0].time).toDate();
  }

  getHourlyDataEndTime() {
    let data = this.weatherData["hourly"].data;
    return moment.unix(data[data.length - 1].time).toDate();
  }

  getLowestTemp() {
    let temp = 140;
    this.weatherData["hourly"].data.forEach(node => {
      if (node.temperature < temp) {
        temp = node.temperature;
      }
    });
    return temp;
  }

  getHighestTemp() {
    let temp = -130;
    this.weatherData["hourly"].data.forEach(node => {
      if (node.temperature > temp) {
        temp = node.temperature;
      }
    })
    return temp;
  }

  getTimeDataRetrieved() {
    return this.weatherData["currently"].time;
  }

}
