import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ReactiveFormsModule, FormControl, Validators, FormGroup } from '@angular/forms';
import { BookingCardComponent } from '../../components/booking-card/booking-card.component';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, BookingCardComponent, ReactiveFormsModule],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css',
})
export class CheckoutPageComponent {

  private cartService = inject(CartService);
  private Router = inject(Router);

  paymentForm = new FormGroup({
    cardNumber: new FormControl('', [Validators.required]),
    cardHolderName: new FormControl('', [Validators.required]),
    expiryDate: new FormControl('', [Validators.required]),
    cvv: new FormControl('', [Validators.required]),
  });

  ngOnInit() {

    this.paymentForm.get('cardNumber')?.valueChanges.subscribe(value => {
      if (value && value.toString().length > 16) {
        this.paymentForm.get('cardNumber')?.setValue(value.toString().slice(0, 16), { emitEvent: false });
      }
    });

    this.paymentForm.get('cvv')?.valueChanges.subscribe(value => {
      if (value && value.toString().length > 3) {
        this.paymentForm.get('cvv')?.setValue(value.toString().slice(0, 3), { emitEvent: false });
      }
    });

  }

  cartExperiences = this.cartService.experiences;

  onSubmit(event: Event){
    if(this.paymentForm.valid && this.cartExperiences().size > 0){

      this.cartService.checkout(this.paymentForm.value).subscribe({
        next: (response) => {
          this.Router.navigate([ "/user-settings" ]);
          
        },
        error: (error) => {
          console.error(error)
        }
      })
    }
  }
    

}

