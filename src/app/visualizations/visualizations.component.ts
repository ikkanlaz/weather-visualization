import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import alcatraz from '../../assets/testData/alcatraz';
import * as d3 from 'd3';

@Component({
  selector: 'app-visualizations',
  templateUrl: './visualizations.component.html',
  styleUrls: ['./visualizations.component.scss']
})
export class VisualizationsComponent implements OnInit {

  locations = [];
  currentLocation = '';
  weatherData: object = alcatraz;
  closeResult: string;

  constructor(private data: DataService, private modalService: NgbModal) { }

  ngOnInit() {
    this.data.locations.subscribe(locations => this.locations = locations);
    this.data.currentLocation.subscribe(location => this.currentLocation = location);
    // this.getWeather();
    console.log(this.weatherData);
  }

  openNewLocationModal(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  // getWeather() {
  //   this.data.getWeatherData().subscribe(
  //     results => { this.weatherData = results },
  //     err => console.error(err),
  //     () => console.log('done loading weather')
  //   )
  // }

}
