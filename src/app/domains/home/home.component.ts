import { Component, inject, signal } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ExperienceComponent } from '../../components/experience/experience.component';
import { MobileTopExperienceComponent } from '../../components/mobile-top-experience/mobile-top-experience.component';
import { RouterLinkWithHref } from '@angular/router';
import { ExperienceService } from '../../services/experience.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from '../../components/notification/notification.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    ExperienceComponent,
    MobileTopExperienceComponent,
    RouterLinkWithHref,
    CommonModule,
    ReactiveFormsModule,
    NotificationComponent
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
    this.experienceService.listExperiences(1, 6).subscribe({
      next: (experiencesData) => {
        this.experiences.set(experiencesData.experiences);
      },
      error: (error) => {
        console.log(error);
      },
    });

    const img = new Image();
    img.src = "../../../assets/img/main-area-bg.png";
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

  imageLoaded: boolean = false;

  onImageLoad() {
    this.imageLoaded = true;
  }

}
