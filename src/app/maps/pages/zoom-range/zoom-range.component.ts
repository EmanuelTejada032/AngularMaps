import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
    .map-container{
      margin-top: 30px;
      height: 70%;
      width: 70%;
    }
    .row{
      background-color: white;
      padding: 10px;
      z-index: 1
    }
    `
  ]
})
export class ZoomRangeComponent implements AfterViewInit {

  @ViewChild('zoomRangeMap') mapDiv!: ElementRef // get local reference on html template
  map!: mapboxgl.Map;
  constructor() {}
  
  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      container: this.mapDiv.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-69.81783771668067,18.526597292645913],
      zoom: 15
    });
  }

  zoomIn(){
    console.log('zoomIn', this.mapDiv);
    this.map.zoomIn()
  }

  zoomOut(){
    console.log('zoomOutm', this.mapDiv);
    this.map.zoomOut();
  }
}
