import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLinkWithHref],
  templateUrl: './not-found-page.component.html',
  styleUrl: './not-found-page.component.css'
})
export class NotFoundPageComponent {

}
