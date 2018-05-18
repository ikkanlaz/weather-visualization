import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../assets/styles/color.scss', './app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Visual Weather';
  hasLocation = false;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.locations.subscribe(locations => {
      if (locations.length > 0) {
        this.hasLocation = true;
      }
    });
  }
}
