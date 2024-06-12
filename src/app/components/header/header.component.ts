import { Component, ElementRef, inject, signal, HostListener } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLinkWithHref, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  private Router = inject(Router);
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private elementRef = inject(ElementRef);

  isloggedIn() {
    return this.userService.isLoggedIn();
  }

  logOut() {
    return this.authService.removeToken();
  }

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
}
