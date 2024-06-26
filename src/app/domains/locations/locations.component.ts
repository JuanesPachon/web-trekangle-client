import { Component, signal, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CartExperienceComponent } from '../../components/cart-experience/cart-experience.component';
import { ExperienceService } from '../../services/experience.service';
import { RouterLinkWithHref } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MapComponent } from '../../components/map/map.component';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    ReactiveFormsModule,
    CartExperienceComponent,
    RouterLinkWithHref,
    CommonModule,
    MapComponent,
  ],
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.css',
})
export class LocationsComponent {

  private experienceService = inject(ExperienceService);
  experiences = signal<any>([]);

  //Search Bar logic

  searchQuery = new FormControl('');
  filteredExperiences = signal<any[]>([]);
  private searchSubscription: Subscription | undefined;

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  private filterExperiences(query: string): void {
    if (!query) {
      this.filteredExperiences.set(this.experiences());
      return;
    }

    const normalizedQuery = this.normalizeString(query);
    const filtered = this.experiences().filter(
      (experience: any) =>
        this.normalizeString(experience.name).includes(normalizedQuery) ||
        this.normalizeString(experience.place).includes(normalizedQuery)
    );
    this.filteredExperiences.set(filtered);
  }

  private normalizeString(str: string): string {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  ngOnInit() {
    this.experienceService.listExperiences(1).subscribe({
      next: (experiencesData) => {
        this.experiences.set(experiencesData.experiences);
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.searchSubscription = this.searchQuery.valueChanges.subscribe(
      (query: any) => {
        this.filterExperiences(query);
      }
    );

    this.filteredExperiences.set(this.experiences());
  }

}
