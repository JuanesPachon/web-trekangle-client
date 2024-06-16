import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css',
})
export class AboutUsComponent {
  acordeonIndex: number | null = null;

  toggleAcordeon(Index: number) {
    if (this.acordeonIndex === Index) {
      this.acordeonIndex = null;
    } else {
      this.acordeonIndex = Index;
    }
  }
}
