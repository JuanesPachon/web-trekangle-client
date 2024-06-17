import { Component, inject, signal } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterLinkWithHref, Router } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,RouterLinkWithHref, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  private UserService = inject (UserService)
  private Router = inject (Router)

  registerForm = new FormGroup({
    name: new FormControl("",{
      validators: [ Validators.required, Validators.minLength(5) ],
    }),
    userName: new FormControl("",{
      validators: [ Validators.required, Validators.minLength(5) ],
    }),
    email: new FormControl("",{
      validators: [ Validators.required, Validators.minLength(5) ],
    }),
    password: new FormControl("",{
      validators: [ Validators.required, Validators.minLength(5) ],
    }),
    
  })

  errorMessage: string = '';

  onSubmit(event: Event){
    if(this.registerForm.valid){

      this.UserService.registerUser(this.registerForm.value).subscribe({
        next: (user) => {
          this.Router.navigate([ "/login" ])
        },
        error: (error) => {
          if (error.status === 409) {
            this.errorMessage = 'Email is already in use';
          } else if (error.status === 400) {
            this.errorMessage = error.error.errors[0];
          } else {
            this.errorMessage = 'An unexpected error occurred. Please try again later.';
          }
          console.log(error);
        }
      })
    }
  }

  //show password

  viewPassword = signal(false);

  togglePassword() {
    this.viewPassword.update(value => !value);
  }
}
