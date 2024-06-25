import { Component, inject, signal } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterLinkWithHref } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormsModule, ReactiveFormsModule, Validators, FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,RouterLinkWithHref, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private userService = inject(UserService);
  private authService = inject(AuthService);
  private notificationService = inject(NotificationService);
  private Router = inject(Router);

  userForm = new FormGroup({

    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])

  })

  errorMessage: string = '';

  onSubmit(event: Event) {

    if(this.userForm.valid) {

      this.userService.loginUser(this.userForm.value).subscribe({

        next: (response: any) => {
          this.authService.setToken(response.token);
          this.Router.navigate([ "" ])
        },
        error: (error) => {
          if (error.status === 403) {
            this.errorMessage = 'Invalid email or password';
          } else {
            this.errorMessage = 'An Server error occurred. Please try again later.';
          }
        }

      })

    }

  }

  //show password

  viewPassword = signal(false);

  togglePassword() {
    this.viewPassword.update(value => !value);
  }

  //notification logic

  activeNotification = this.notificationService.registerUserNotification;

}
