import { Component, inject, signal } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ExperienceComponent } from '../../components/experience/experience.component';
import { MobileTopExperienceComponent } from '../../components/mobile-top-experience/mobile-top-experience.component';
import { RouterLinkWithHref } from '@angular/router';
import { ExperienceService } from '../../services/experience.service';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    ExperienceComponent,
    MobileTopExperienceComponent,
    RouterLinkWithHref,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  //Get the data from the API

  private notificationService = inject(NotificationService);
  private experienceService = inject(ExperienceService);

  experiences = signal<any>([]);

  ngOnInit() {
    this.experienceService.listExperiences(1).subscribe({
      next: (experiencesData) => {
        this.experiences.set(experiencesData.experiences);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  //Js Logic of the Html

  ngAfterViewInit(): void {
    window.addEventListener('scroll', this.onScroll);
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll);
  }

  private onScroll = (): void => {
    let progressBar = document.getElementById('progress__bar');
    if (progressBar) {
      let scrollTop = window.scrollY || document.documentElement.scrollTop;
      let scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      let progress = (scrollTop / scrollHeight) * 100;
      progressBar.style.width = progress + '%';
    }
  };

  //Notification logic

  activeNotification = this.notificationService.showLogOutNotification;

  isHovered: boolean = false;

  onMouseEnter() {
    this.isHovered = true;
  }

  onMouseLeave() {
    this.isHovered = false;
  }
}
