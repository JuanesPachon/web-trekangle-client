import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  showLogOutNotification = signal(false);

  toggleLogOutNotification() {
    this.showLogOutNotification.set(true);
    setTimeout(() => {
      this.showLogOutNotification.set(false);
    }, 5000);
  }

  showBookingNotification = signal(false);

  toggleBookingNotification() {
    this.showBookingNotification.set(true);
    setTimeout(() => {
      this.showBookingNotification.set(false);
    }, 7000);
  }

  registerUserNotification = signal(false);

  toggleRegisterUserNotification() {
    this.registerUserNotification.set(true);
    setTimeout(() => {
      this.registerUserNotification.set(false);
    }, 5000);
  }

}
