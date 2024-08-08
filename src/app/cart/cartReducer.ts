import { createReducer, on } from '@ngrx/store';
import { addToCart, decrementQuantity, deleteExperience, incrementQuantity } from './cartActions';


export interface CartState {
  experiences: Map<string, any>;
}

export const initialState: CartState = {
  experiences: new Map(),
};

export const cartReducer = createReducer(
  initialState,
  on(addToCart, (state, { experience }) => {
    const newState = new Map(state.experiences);
    const productInCart = newState.get(experience._id);
    if (productInCart) {
      newState.set(experience._id, {
        ...productInCart,
        quantity: productInCart.quantity + 1,
      });
    } else {
      newState.set(experience._id, { ...experience, quantity: 1 });
    }
    return { ...state, experiences: newState };
  }),
  on(incrementQuantity, (state, { experienceId }) => {
    const newState = new Map(state.experiences);
    const productInCart = newState.get(experienceId);
    if (productInCart) {
      newState.set(experienceId, {
        ...productInCart,
        quantity: productInCart.quantity + 1,
      });
    }
    return { ...state, experiences: newState };
  }),
  on(decrementQuantity, (state, { experienceId }) => {
    const newState = new Map(state.experiences);
    const productInCart = newState.get(experienceId);
    if (productInCart) {
      if (productInCart.quantity === 1) {
        newState.delete(experienceId);
      } else {
        newState.set(experienceId, {
          ...productInCart,
          quantity: productInCart.quantity - 1,
        });
      }
    }
    return { ...state, experiences: newState };
  }),
  on(deleteExperience, (state, { experienceId }) => {
    const newState = new Map(state.experiences);
    newState.delete(experienceId);
    return { ...state, experiences: newState };
  })
);
