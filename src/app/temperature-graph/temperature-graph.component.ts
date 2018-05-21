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
    var nodes = this.getHourlyTemperatureData();
    let startTime = this.getHourlyDataStartTime();
    let endTime = this.getHourlyDataEndTime();
    let lowestTemp = this.getLowestTemp() - 5;
    let highestTemp = this.getHighestTemp() + 5;

    // set the dimensions and margins of the graph
    let margin = { top: 20, right: 20, bottom: 50, left: 50 },
      width = 700 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    //set the ranges
    let x = d3.scaleTime().range([0, width]);
    let y = d3.scaleLinear().range([height, 0]);

    // define the line
    let valueline = d3.line()
      .x(d => x(d["time"]))
      .y(d => y(d["temp"]));

    let svg = d3.select("#graph").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")")

    // Scale the range of the data
    x.domain([startTime, endTime]);
    y.domain([lowestTemp, highestTemp]);

    // Add the valueline path.
    svg.append("path")
      .data([nodes])
      .attr("class", "line")
      .attr("d", valueline)
      .style("fill", "none")
      .style("stroke", "rgb(248,215,121)")
      .style("stroke-width", "4px")

    // Add the X Axis
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // text label for the x axis
    svg.append("text")
      .attr("transform",
        "translate(" + (width / 2) + " ," +
        (height + margin.top + 20) + ")")
      .text("Time");

    // Add the Y Axis
    svg.append("g")
      .call(d3.axisLeft(y));

    // text label for the y axis
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("℉");
  }

  getHourlyTemperatureData() {
    let data = this.weatherData["hourly"].data;
    console.log(data);
    let startTime = data[0].time;
    return data.map(hourData => {
      return {
        time: this.parseUnix(hourData.time),
        temp: hourData.temperature
      }
    });
  }

  getHourlyDataStartTime() {
    return this.parseUnix(this.weatherData["hourly"].data[0].time);
  }

  getHourlyDataEndTime() {
    let data = this.weatherData["hourly"].data;
    return this.parseUnix(data[data.length - 1].time);
  }

  parseUnix(unixTime) {
    return moment.unix(unixTime).toDate();
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
