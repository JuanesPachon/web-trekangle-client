import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterLinkWithHref } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,RouterLinkWithHref],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
