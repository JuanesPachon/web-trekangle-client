import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';


@Component({
  selector: 'app-aboutUs',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './aboutUs.component.html',
  styleUrl: './aboutUs.component.css'
})
export class AboutUsComponent {

}
