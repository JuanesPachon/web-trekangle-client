import { Component, Input, inject, SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart-experience',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyPipe],
  templateUrl: './cart-experience.component.html',
  styleUrl: './cart-experience.component.css'
})
export class CartExperienceComponent {

  private cartService = inject(CartService);

  @Input() experience: any;

  guestsQuantity = new FormControl(0);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['experience'] && this.experience) {
      this.guestsQuantity.setValue(this.experience.quantity)
    }
  }

  increment(experienceId: string) {
    this.cartService.incrementQuantity(experienceId)
  }

  decrement(experienceId: string) {
    this.cartService.decrementQuantity(experienceId)
  }

  deleteExperience(experienceId: string) {
    this.cartService.deleteExperience(experienceId)
  }

}
