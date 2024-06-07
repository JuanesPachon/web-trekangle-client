import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CartExperienceComponent } from '../../components/cart-experience/cart-experience.component';
import { ReactiveFormsModule, FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CartExperienceComponent, ReactiveFormsModule],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css',
})
export class CheckoutPageComponent {

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
    

}

