import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AddLocationComponent } from './add-location/add-location.component';
import { VisualizationsComponent } from './visualizations/visualizations.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AboutComponent } from './about/about.component';
import { VisualizationContentComponent } from './visualization-content/visualization-content.component';
import { AlertCloseableComponent } from './alert-closeable/alert-closeable.component';
import { TemperatureGraphComponent } from './temperature-graph/temperature-graph.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddLocationComponent,
    VisualizationsComponent,
    PageNotFoundComponent,
    AboutComponent,
    VisualizationContentComponent,
    AlertCloseableComponent,
    TemperatureGraphComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
