import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'
 
@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles: [
    `#fullScreenMap{
       height: 100%;
       width: 100%;
    }`
  ]
})
export class FullScreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const map = new mapboxgl.Map({
      container: 'fullScreenMap',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-69.81783771668067,18.526597292645913],
      zoom: 15
    });
  }

}
