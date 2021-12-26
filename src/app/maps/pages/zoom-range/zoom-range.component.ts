import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
    .map-container{
      /* margin-top: 30px; */
      height: 100%;
      width: 100%;
    }
    .row{
      width: 400px;
      height:110px;
      background-color: white;
      padding: 10px;
      position: fixed;
      bottom: 50px;
      border-radius:10px;
      left:150px;
      z-index: 1
    }
    `
  ]
})
export class ZoomRangeComponent implements AfterViewInit {

  @ViewChild('zoomRangeMap') mapDiv!: ElementRef // get local reference on html template
  map!: mapboxgl.Map;
  zoomLevel: number = 15;

  constructor() {}
  
  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      container: this.mapDiv.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-69.81783771668067,18.526597292645913],
      zoom: 15
    });

    this.map.on('zoom', (event) => {
      this.zoomLevel = this.map.getZoom();
    })
    this.map.on('zoomend', (event) => {
      if(this.map.getZoom() > 18){
        this.map.zoomTo(18);
      }
    })
  }

  zoomIn(){
    this.map.zoomIn()
  }

  zoomOut(){
    this.map.zoomOut();
  }

  zoomChanged(value: string){
    this.map.zoomTo(Number(value));
  }
}
