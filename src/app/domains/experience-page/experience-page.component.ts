import { Component, Input, signal, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterLinkWithHref } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { ExperienceService } from '../../services/experience.service';

@Component({
  selector: 'app-experience-page',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,RouterLinkWithHref],
  templateUrl: './experience-page.component.html',
  styleUrl: './experience-page.component.css'
})
export class ExperiencePageComponent {

  private experienceService = inject(ExperienceService);

  @Input() id?: any = '';
  experience = signal<any>({});

  ngOnInit() {
    this.experienceService.getOneExperience(this.id).subscribe({
      next: (experience) => {
        this.experience.set(experience)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

}
