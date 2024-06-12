import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterLink, RouterLinkWithHref, Router } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,RouterLinkWithHref, FormsModule, ReactiveFormsModule],
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

  onSubmit(event: Event){
    if(this.registerForm.valid){

      this.UserService.registerUser(this.registerForm.value).subscribe({
        next: (user) => {
          this.Router.navigate([ "/login" ])
        },
        error: (error) => {
          console.error(error)
        }
      })
    }
  }
}
