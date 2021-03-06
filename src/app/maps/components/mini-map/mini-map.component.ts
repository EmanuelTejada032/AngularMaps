import { Component, ElementRef, Input, AfterViewInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mini-map',
  templateUrl: './mini-map.component.html',
  styles: [
   `  
   div{
      height: 150px;
      width: 100%;
      margin: 0;
    }
    `
  ]
})
export class MiniMapComponent implements AfterViewInit {

  @Input() lngLat: [number, number] = [0,0];
  @ViewChild('miniMap') mapDiv!: ElementRef;

  constructor() { }

  ngAfterViewInit(): void {
    const map = new mapboxgl.Map({
      container: this.mapDiv.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.lngLat,
      zoom: 15,
      interactive: false
    });

    new mapboxgl.Marker()
    .setLngLat(this.lngLat)
    .addTo(map);
  }

}
