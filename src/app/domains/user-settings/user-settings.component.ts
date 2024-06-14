import { Component, signal } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { BookingCardComponent } from '../../components/booking-card/booking-card.component';
import { CartExperienceComponent } from '../../components/cart-experience/cart-experience.component';

@Component({
  selector: 'app-user-settings',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, BookingCardComponent, CommonModule, CartExperienceComponent],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.css',
})
export class UserSettingsComponent {


  // Edit Section

  editProfilePicture = signal(true);
  editName = signal(true);
  editUserName = signal(true);
  editEmail = signal(true);
  editPassword = signal(true);

  toggleEditProfilePicture() {
    this.editProfilePicture.update((value) => !value);
  }

  toggleEditName() {
    this.editName.update((value) => !value);
  }

  toggleEditUserName() {
    this.editUserName.update((value) => !value);
  }

  toggleEditEmail() {
    this.editEmail.update((value) => !value);
  }

  toggleEditPassword() {
    this.editPassword.update((value) => !value);
  }

  //Toggle Section

  userBookings = signal<boolean | null>(null);
  userSettings = signal<boolean | null>(null);

  toggleSection() {
    this.userBookings.update((value) => !value);
    this.userSettings.update((value) => !value);
  }

  // Resize function

  onResize(event: any) {
    if (event.target?.innerWidth < 768) {
      this.userSettings.set(false);
      this.userBookings.set(true);
    } else {
      this.userBookings.set(true);
      this.userSettings.set(true);
    }
  }

  ngOnInit() {
    this.onResize({ target: window });
  }
  
}
