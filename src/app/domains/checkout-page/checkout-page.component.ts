import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ReactiveFormsModule, FormControl, Validators, FormGroup } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { CartExperienceComponent } from '../../components/cart-experience/cart-experience.component';
import { CommonModule, CurrencyPipe } from '@angular/common';
import Swal from 'sweetalert2';
import { ExperienceCartModel } from '../../cart/experienceCartModel';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { selectTotalExperiencesCount, selectTotalPrice } from '../../cart/cartSelectors';
import { AppState } from '../../cart';
import { checkout } from '../../cart/cartActions';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CartExperienceComponent, ReactiveFormsModule, CurrencyPipe, CommonModule],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css',
})
export class CheckoutPageComponent {

  experiences$: Observable<ExperienceCartModel[]>;
  total$: Observable<number>;
  totalExperiencesCount: number = 0;

  constructor(private store: Store<AppState>) {
    this.experiences$ = this.store.select(state => state.cart.experiences)
      .pipe(
        map(experiencesMap => Array.from(experiencesMap.values()))
      );

      this.total$ = this.store.select(selectTotalPrice);
      this.store.select(selectTotalExperiencesCount).subscribe(count => {
        this.totalExperiencesCount = count;
      });
      
      
  }

  trackByFn(index: number, item: ExperienceCartModel) {
    return item._id;
  }

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

  /* onSubmit(event: Event){
    if(this.paymentForm.valid && this.totalExperiencesCount > 0){

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
  } */

    onSubmit(formValues: any) {
      this.store.dispatch(checkout({ formValues }));
    }

  // Notification logic

  

}

