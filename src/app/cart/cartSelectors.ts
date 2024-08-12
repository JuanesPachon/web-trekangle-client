import { createSelector } from '@ngrx/store';
import { AppState } from './index';

export const selectCartState = (state: AppState) => state.cart;

export const selectTotalPrice = createSelector(
  selectCartState,
  (cartState) => {
    let total = 0;
    for (let experience of cartState.experiences.values()) {
      total += experience.price * experience.quantity;
    }
    return total;
  }
);

export const selectTotalExperiencesCount = createSelector(
  selectCartState,
  (cartState) => {
    return Array.from(cartState.experiences.values()).length;
  }
);