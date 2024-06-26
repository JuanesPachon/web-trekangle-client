import { Component, ViewChild, inject, signal } from '@angular/core';
import {
  GoogleMapsModule,
  MapAdvancedMarker,
  MapInfoWindow,
} from '@angular/google-maps';
import { ExperienceService } from '../../services/experience.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [GoogleMapsModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent {
  private experienceService = inject(ExperienceService);

  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  onMarkerClick(marker: MapAdvancedMarker) {
    this.infoWindow.openAdvancedMarkerElement(
      marker.advancedMarker,
      marker.advancedMarker.title
    );
  }

  options: google.maps.MapOptions = {
    mapId: 'c5367d801959f06e',
    center: { lat: 4.5709, lng: -74.2973 },
    zoom: 6.2,
    backgroundColor: 'transparent',
    scrollwheel: true,
  };

  ngOnInit() {
    this.experienceService.listExperiences(1).subscribe({
      next: (experiencesData) => {
        this.experiences.set(experiencesData.experiences);
        this.experienceLocations.set([
          {
            lat: 5.7749,
            lng: -73.1162,
            title: this.experiences()[0].name,
            place: this.experiences()[0]?.place,
          },
          {
            lat: 6.2209,
            lng: -75.1532,
            title: this.experiences()[1].name,
            place: this.experiences()[0]?.place,
          },
          {
            lat: 10.9639,
            lng: -74.7964,
            title: this.experiences()[2]?.name,
            place: this.experiences()[0]?.place,
          },
          {
            lat: 6.5625,
            lng: -73.133,
            title: this.experiences()[3]?.name,
            place: this.experiences()[0]?.place,
          },
          {
            lat: 4.7411,
            lng: -75.9111,
            title: this.experiences()[4]?.name,
            place: this.experiences()[0]?.place,
          },
          {
            lat: 3.2477,
            lng: -75.1614,
            title: this.experiences()[5]?.name,
            place: this.experiences()[0]?.place,
          },
        ]);

        
        const parser = new DOMParser();
        const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
        <path fill="#ffffff" stroke="#000000" stroke-width="2" d="M12 2c-4.97 0-9 4.03-9 9s9 13 9 13 9-8.97 9-13-4.03-9-9-9zm0 12c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
        </svg>`;

        this.experienceLocations().forEach((location: any) => {
          location.content = parser.parseFromString(
            svgString,
            'image/svg+xml'
          ).documentElement;
        });

      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  experiences = signal<any>([]);

  experienceLocations = signal<any>([]);
}
