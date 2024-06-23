import { Component, Input, signal, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { Router, RouterLinkWithHref } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { ExperienceService } from '../../services/experience.service';
import { CartService } from '../../services/cart.service';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-experience-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLinkWithHref, CurrencyPipe, HeaderComponent, CommonModule],
  templateUrl: './experience-page.component.html',
  styleUrl: './experience-page.component.css',
})
export class ExperiencePageComponent {
  private experienceService = inject(ExperienceService);
  private cartService = inject(CartService);
  private router = inject(Router);

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

  activeNotification = signal(false);


  addToCart(experience: any) {
    if(localStorage.getItem('user_token')) {
      this.cartService.addToCart(experience);
      this.activeNotification.update((value) => !value);
    } else {
      this.router.navigate(['/login']);
    }
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
