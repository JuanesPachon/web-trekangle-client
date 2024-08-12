import { Injectable, computed, signal, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { addToCart, checkout, decrementQuantity, deleteExperience, incrementQuantity } from '../cart/cartActions';
import { AppState } from '../cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private http = inject(HttpClient);

  experiences = signal(new Map());

  total = computed(() => {
    let prevState = this.experiences();
    let total = 0;

    for (let experience of prevState.values()) {
      total += experience.price * experience.quantity;
    }
    return total;
  });

  constructor(private store: Store<AppState>) {
    this.loadExperiences();
  }

  private saveExperiences() {
    const experiencesArray = Array.from(this.experiences().entries());
    localStorage.setItem('experiences', JSON.stringify(experiencesArray));
  }

  private loadExperiences() {
    const storedExperiences = localStorage.getItem('experiences');
    if (storedExperiences) {
      const experiencesArray = JSON.parse(storedExperiences);
      const experiencesMap = new Map(experiencesArray);
      this.experiences.set(experiencesMap);
    }
  }

  /* addToCart(experience: any) {
    this.experiences.update((prevState: any) => {
      const productInCart = prevState.get(experience._id);
      prevState.set(experience._id, experience);

      if (productInCart !== undefined) {
        prevState.set(experience._id, {
          ...productInCart,
          quantity: productInCart.quantity + 1,
        });
      } else {
        prevState.set(experience._id, { ...experience, quantity: 1 })
      }

      return new Map(prevState);
    });

    this.saveExperiences();
  } */

    addToCart(experience: any) {
      this.store.dispatch(addToCart({ experience }));
    }

    incrementQuantity(experienceId: string) {
      this.store.dispatch(incrementQuantity({ experienceId }));
    }
  
    decrementQuantity(experienceId: string) {
      this.store.dispatch(decrementQuantity({ experienceId }));
    }
  
    deleteExperience(experienceId: string) {
      this.store.dispatch(deleteExperience({ experienceId }));
    }

  /* incrementQuantity(experienceId: string) {
    this.experiences.update((prevState) => {
      const productInCart = prevState.get(experienceId);
      if (productInCart !== undefined) {
        prevState.set(experienceId, {
          ...productInCart,
          quantity: productInCart.quantity + 1,
        });
      }

      this.saveExperiences();
      return new Map(prevState);
    });
  }

  decrementQuantity(experienceId: string) {
    this.experiences.update((prevState) => {
      const productInCart = prevState.get(experienceId);

      if (productInCart.quantity === 1) {
        prevState.delete(experienceId);
      } else {
        prevState.set(experienceId, {
          ...productInCart,
          quantity: productInCart.quantity - 1,
        });
      }

      this.saveExperiences();
      return new Map(prevState);
    });
  }

  deleteExperience(experienceId: string) {
    this.experiences.update((prevState) => {
      const productInCart = prevState.get(experienceId);
      if (productInCart !== undefined) {
        prevState.delete(experienceId);
      }

      this.saveExperiences();
      return new Map(prevState);
    });
  } */

  /* checkout(formValues: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('user_token'),
    });

    const mapToArray = Array.from(this.experiences().values());

    const experiencesArray = mapToArray.map((experience: any) => {
      return { experienceId: experience._id, quantity: experience.quantity };
    });

    const body = {
      name: formValues.cardHolderName,
      cardNumber: formValues.cardNumber,
      experiences: experiencesArray,
    };

    return this.http.post(
      'http://3.14.151.214:3000/bookings',
      body,
      { headers: headers }
    );
  } */
}
