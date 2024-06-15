import { Component, Input, signal, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterLinkWithHref } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { ExperienceService } from '../../services/experience.service';
import { CartService } from '../../services/cart.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-experience-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLinkWithHref, CurrencyPipe],
  templateUrl: './experience-page.component.html',
  styleUrl: './experience-page.component.css',
})
export class ExperiencePageComponent {
  private experienceService = inject(ExperienceService);
  private cartService = inject(CartService);

  // Get by ID request

  @Input() id?: any = '';
  experience = signal<any>({});

  ngOnInit() {
    this.experienceService.getOneExperience(this.id).subscribe({
      next: (experience) => {
        this.experience.set(experience);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // Cart Logic

  addToCart(experience: any) {
    this.cartService.addToCart(experience);
    console.log(experience)
    console.log(this.cartService.experiences());
  }

  //notification logic

  showNotification = signal(false);

  toggleNotification() {
    this.showNotification.set(true);
    setTimeout(() => {
      this.showNotification.set(false);
    }, 3000);
  }
}
