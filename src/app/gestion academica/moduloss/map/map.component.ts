import { Component, Output, EventEmitter, Input, OnInit, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit, OnChanges {

  @Output() locationSelected = new EventEmitter<string>();
  @Input() initialLocation: string = '-17.776132, -63.193305';

  private map: any;
  private marker: any;

  ngOnInit(): void {
    this.loadMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const initialLocationChange: SimpleChange = changes['initialLocation'];
    if (initialLocationChange && !initialLocationChange.isFirstChange()) {
      this.updateMarkerPosition(initialLocationChange.currentValue);
    }
  }

  loadMap(): void {
    const [lat, lng] = this.initialLocation.split(',').map(Number);

    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: { lat, lng },
      zoom: 15,
    });

    this.marker = new google.maps.Marker({
      position: { lat, lng },
      map: this.map,
      draggable: true,
    });

    google.maps.event.addListener(this.marker, 'dragend', () => {
      const position = this.marker.getPosition();
      if (position) {
        const newLat = position.lat();
        const newLng = position.lng();
        this.locationSelected.emit(`${newLat},${newLng}`);
      }
    });
  }

  updateMarkerPosition(newLocation: string): void {
    const [lat, lng] = newLocation.split(',').map(Number);
    const position = new google.maps.LatLng(lat, lng);

    this.marker.setPosition(position);
    this.map.setCenter(position);
  }
}
