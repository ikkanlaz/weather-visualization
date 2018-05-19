import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-visualizations',
  templateUrl: './visualizations.component.html',
  styleUrls: ['./visualizations.component.scss']
})
export class VisualizationsComponent implements OnInit {

  locations = [];
  currentLocation = '';
  closeResult: string;

  constructor(private data: DataService, private modalService: NgbModal) { }

  ngOnInit() {
    this.data.locations.subscribe(locations => this.locations = locations);
    this.data.currentLocation.subscribe(location => this.currentLocation = location);
  }

  getCSSClasses(location: string) {
    let cssClasses;
    if (location === this.currentLocation) {
      cssClasses = {
        'active': true,
        'nav-link': true,
        'location-link': true
      }
    } else {
      cssClasses = {
        'active': false,
        'nav-link': true,
        'location-link': true
      }
    }
    return cssClasses;
  }

  openNewLocationModal(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  changeCurrentLocation(location) {
    this.data.changeCurrentLocation(location);
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
}
