import { createAction, props } from '@ngrx/store';

export const addToCart = createAction(
    '[Cart] Add To Cart',
    props<{ experience: any }>()
  );

  export const incrementQuantity = createAction(
    '[Cart] Increment Quantity',
    props<{ experienceId: string }>()
  );
  
  export const decrementQuantity = createAction(
    '[Cart] Decrement Quantity',
    props<{ experienceId: string }>()
  );
  
  export const deleteExperience = createAction(
    '[Cart] Delete Experience',
    props<{ experienceId: string }>()
  );  

  export const checkout = createAction(
    '[Cart] Checkout',
    props<{ formValues: any }>()
  );
  
  export const checkoutSuccess = createAction(
    '[Cart] Checkout Success',
    props<{ response: any }>()
  );
  
  export const checkoutFailure = createAction(
    '[Cart] Checkout Failure',
    props<{ error: any }>()
  );