import { Component, signal, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CartExperienceComponent } from '../../components/cart-experience/cart-experience.component';
import { ExperienceService } from '../../services/experience.service';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ReactiveFormsModule, CartExperienceComponent, RouterLinkWithHref],
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.css'
})
export class LocationsComponent {

  private experienceService = inject(ExperienceService);

  experiences = signal<any>([]);

  ngOnInit() {
    this.experienceService.listExperiences(1, 6).subscribe({
      next: (experiencesData) => {
        this.experiences.set(experiencesData.experiences);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  //Search Bar logic

  searchQuery: any = new FormControl('');

}
