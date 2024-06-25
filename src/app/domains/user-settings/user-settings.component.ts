import { Component, signal, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { BookingCardComponent } from '../../components/booking-card/booking-card.component';
import { CartExperienceComponent } from '../../components/cart-experience/cart-experience.component';
import { NotificationService } from '../../services/notification.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { BookingsService } from '../../services/bookings.service';

@Component({
  selector: 'app-user-settings',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    BookingCardComponent,
    CommonModule,
    CartExperienceComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.css',
})
export class UserSettingsComponent {
  private notificationService = inject(NotificationService);
  private userService = inject(UserService);
  private bookingService = inject(BookingsService);

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

  userSettingsForm = new FormGroup({
    name: new FormControl(''),
    userName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    profileImage: new FormControl(null),
  });

  errorMessage: string = '';
  successMessage = signal(false);
  activeEdition = signal(false);

  profileImage: File | null = null;

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.profileImage = file;
    }
  }

  toFormData(formValue: any) {
    const formData = new FormData();
    for (const key in formValue) {
      if (
        formValue.hasOwnProperty(key) &&
        formValue[key] !== null &&
        formValue[key] !== undefined
      ) {
        formData.append(key, formValue[key]);
      }
    }
    if (this.profileImage) {
      formData.append(
        'profileImage',
        this.profileImage,
        this.profileImage.name
      );
    }
    return formData;
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.profileImage || this.userSettingsForm.valid) {
      const formData = this.toFormData(this.userSettingsForm.value);
      this.userService.editUser(formData).subscribe({
        next: (response) => {
          localStorage.setItem('activeEdition', 'true');
          window.location.reload();
        },
        error: (error) => {
          if (error.status === 409) {
            this.errorMessage = 'Email is already in use';
          } else if (error.status === 400) {
            this.errorMessage = error.error.errors[0];
          } else {
            this.errorMessage =
              'An unexpected error occurred. Please try again later.';
          }
          console.log(error);
        },
      });
    } else {
      this.errorMessage = 'Please fill in all fields';
    }
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

  user = signal<any>({});

  ngOnInit() {
    this.onResize({ target: window });

    this.userService.getUser()?.subscribe({
      next: (user) => {
        this.user.set(user);
      },
      error: (error) => {
        console.log(error);
      },
    });

    if (localStorage.getItem('activeEdition') === 'true') {
      this.activeEdition.set(true);
      localStorage.removeItem('activeEdition');
    }

    this.listBookings();
  }

  listBookings() {
    this.bookingService.listBookings().subscribe({
      next: (response: any) => {
        const allExperienceIds: any[] = [];

        response.forEach((booking: any) => {
          booking.experiences.forEach((experience: any) => {
            allExperienceIds.push(experience.experienceId);
          });
        });

        this.bookedExperiences = allExperienceIds;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  bookedExperiences: any[] = [];

  //notification logic

  activeNotification = this.notificationService.showBookingNotification;

  //view password

  viewPassword = signal(false);

  togglePassword() {
    this.viewPassword.update((value) => !value);
  }
}
