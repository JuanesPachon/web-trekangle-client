import { Component, ElementRef, inject, signal, HostListener } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { CartExperienceComponent } from '../cart-experience/cart-experience.component';
import { NotificationService } from '../../services/notification.service';
import { Observable } from 'rxjs';
import { ExperienceCartModel } from '../../cart/experienceCartModel';
import { Store } from '@ngrx/store';
import { AppState } from '../../cart';
import { map } from 'rxjs/operators';
import { selectTotalPrice } from '../../cart/cartSelectors';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLinkWithHref, CommonModule, CartExperienceComponent, CurrencyPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {

  experiences$: Observable<ExperienceCartModel[]>;
  total$: Observable<number>;

  constructor(private store: Store<AppState>) {
    this.experiences$ = this.store.select(state => state.cart.experiences)
      .pipe(
        map(experiencesMap => Array.from(experiencesMap.values()))
      );

    this.total$ = this.store.select(selectTotalPrice);
      
  }

  trackByFn(index: number, item: ExperienceCartModel) {
    return item._id;
  }

  private userService = inject(UserService);
  private authService = inject(AuthService);
  private elementRef = inject(ElementRef);
  private cartService = inject(CartService);
  private notificationService = inject(NotificationService);

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

  toggleNotification() {
    this.notificationService.toggleLogOutNotification();
  }

  //Cart logic

  cartExperiences = this.cartService.experiences;
  cartTotal = this.cartService.total;

  showCart = signal(false);

  toggleCart() {
    this.showCart.update(prevState => !prevState)
  }

  //Mobile menu logic

  showNavbar = signal(false)

  toggleNavbar() {
    this.showNavbar.update(prevState => !prevState)
  }

  // User Profile Image logic

  user = signal<any>({});

  ngOnInit() {
    this.userService.getUser()?.subscribe({
      next: (user) => {
        this.user.set(user);
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.experiences$.subscribe(experiences => {
      console.log("Estado completo del carrito:", experiences);
    });

  }

}
