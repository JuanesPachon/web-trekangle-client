import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ReactiveFormsModule, FormControl, Validators, FormGroup } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { CartExperienceComponent } from '../../components/cart-experience/cart-experience.component';
import { CurrencyPipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CartExperienceComponent, ReactiveFormsModule, CurrencyPipe],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css',
})
export class CheckoutPageComponent {

  private cartService = inject(CartService);
  private Router = inject(Router);
  private notificationService = inject(NotificationService);

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
  cartTotal = this.cartService.total;

  onSubmit(event: Event){
    if(this.paymentForm.valid && this.cartExperiences().size > 0){

      this.cartService.checkout(this.paymentForm.value).subscribe({
        next: (response) => {
          this.Router.navigate([ "/user-settings" ]);
          this.cartExperiences.set(new Map());
          localStorage.removeItem('experiences');
          this.showNotification();
        },
        error: (error) => {
          this.showCustomErrorAlert();
          console.error(error)
        }
      })
    } else {
      this.showCustomAlert();
    }
  }

  // Notification logic

  showNotification() {
    this.notificationService.toggleBookingNotification();
  }

  showCustomAlert() {
    Swal.fire({
      title: 'Please fill all the fields or add at least one experience',
      icon: 'warning',
      confirmButtonText: 'Okay',
      confirmButtonColor: '#5d9046',
      customClass: {
        popup: 'custom-popup-class',
        title: 'custom-title-class',
      },
      background: "url('assets/img/main_bg.png')",
      showCloseButton: true,
      allowOutsideClick: true,
      backdrop: `
        rgba(0,0,0,0.4)
        left top
        no-repeat
      `
    });
  }  

  showCustomErrorAlert() {
    Swal.fire({
      title: 'There was an internal server error, Try it later',
      icon: 'warning',
      confirmButtonText: 'Okay',
      confirmButtonColor: '#5d9046',
      customClass: {
        popup: 'custom-popup-class',
        title: 'custom-title-class',
      },
      background: "url('assets/img/main_bg.png')",
      showCloseButton: true,
      allowOutsideClick: true,
      backdrop: `
        rgba(0,0,0,0.4)
        left top
        no-repeat
      `
    });
  } 

}

