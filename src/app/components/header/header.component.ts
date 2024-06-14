import { Component, ElementRef, inject, signal, HostListener } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { CartExperienceComponent } from '../cart-experience/cart-experience.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLinkWithHref, CommonModule, CartExperienceComponent, CurrencyPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {

  private userService = inject(UserService);
  private authService = inject(AuthService);
  private elementRef = inject(ElementRef);
  private cartService = inject(CartService);

  isloggedIn() {
    return this.userService.isLoggedIn();
  }

  logOut() {
    return this.authService.removeToken();
  }

  // Dropdown logic

  dropdown = signal(false);

  openDropdown() {
    this.dropdown.update((value) => !value);
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      if (this.dropdown()) {
        this.dropdown.set(false);
      }
    }
  }

  //Notification logic

  showNotification = signal(false);

  toggleNotification() {
    this.showNotification.set(true);
    setTimeout(() => {
      this.showNotification.set(false);
    }, 3000);
  }

  //Cart logic

  cartExperiences = this.cartService.experiences;
  cartTotal = this.cartService.total;

  showCart = signal(false)

  toggleCart() {
    this.showCart.update(prevState => !prevState)
  }

}
