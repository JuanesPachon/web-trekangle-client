import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterLinkWithHref } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormsModule, ReactiveFormsModule, Validators, FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,RouterLinkWithHref, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private userService = inject(UserService);
  private authService = inject(AuthService);

  userForm = new FormGroup({

    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])

  })

  onSubmit(event: Event) {

    if(this.userForm.valid) {

      this.userService.loginUser(this.userForm.value).subscribe({

        next: (response: any) => {
          this.authService.setToken(response.token);
        },
        error: (error) => {
          console.log(error);
        }

      })

    }

  }

}
