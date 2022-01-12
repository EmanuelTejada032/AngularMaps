import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface Marker{
  color: string;
  marker:  mapboxgl.Marker
}

@Component({
  selector: 'app-markers',
  templateUrl: './markers.component.html',
  styles: [
    `
    .map-container{
      height: 100%;
      width: 100%;
    }

    .list-group{
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 2;
    }

    .list-group {
      cursor: pointer;
    }

    `
  ]
})
export class MarkersComponent implements AfterViewInit {
  
  @ViewChild('zoomRangeMap') mapDiv!: ElementRef // get local reference on html template
  map!: mapboxgl.Map;
  zoomLevel: number = 15;
  mapCenter: [number,number] = [-69.81783771668067,18.526597292645913];

  markers: Marker[] = [];

  constructor() { }

  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      container: this.mapDiv.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.mapCenter,
      zoom: 15
    });

    this.readSavedMarkers();
   
  }

  ngOnInit(): void {
  }

  createMarker(){

    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const marker = new mapboxgl.Marker({
      draggable: true,
      color
    })
    .setLngLat(this.mapCenter)
    .addTo(this.map);

    const customMarker = {
        color,
        marker
    }
    this.markers.push(customMarker);
    this.saveCreatedMarkers();
  }

  goToMarkedLocation(marker: Marker){
    
    this.map.flyTo({
      center: marker.marker.getLngLat(),
      zoom: 15,
      essential: true
    });
    
  }


  saveCreatedMarkers(){

    const markers: any = this.markers.map( marker => {
      return {
        markerColor : marker.color,
        markerLngLat: marker.marker.getLngLat()
      }
    })

    localStorage.setItem('markers', JSON.stringify(markers));
  }

  readSavedMarkers(){
    if(!localStorage.getItem('markers')){
      return;
    }

    const markers = JSON.parse(localStorage.getItem('markers')!)
    markers.forEach( (marker:any) => {
      this.markers.push({ marker: new mapboxgl.Marker({
              draggable: true,
              color: marker.markerColor
          })
          .setLngLat(marker.markerLngLat)
          .addTo(this.map),
        color: marker.markerColor
      })
    });
  }

}