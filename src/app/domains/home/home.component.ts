import { Component, } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ExperienceComponent } from '../../components/experience/experience.component';
import { MobileTopExperienceComponent } from '../../components/mobile-top-experience/mobile-top-experience.component';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ExperienceComponent, MobileTopExperienceComponent,RouterLinkWithHref],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

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
      let scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      let progress = (scrollTop / scrollHeight) * 100;
      progressBar.style.width = progress + '%';
    }
  }

}
