import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';


@Component({
  selector: 'app-aboutus',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './aboutus.component.html',
  styleUrl: './aboutus.component.css'
})
export class AboutusComponent {

}
