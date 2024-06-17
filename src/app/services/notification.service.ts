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

}
