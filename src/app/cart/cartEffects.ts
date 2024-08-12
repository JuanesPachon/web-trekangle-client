import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { checkout, checkoutSuccess, checkoutFailure } from './cartActions';
import { AppState } from './index';
import { NotificationService } from '../services/notification.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable()
export class CartEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<AppState>
  ) {}

  private notificationService = inject(NotificationService);
  private router = inject(Router);

  checkout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkout),
      mergeMap(({ formValues }) => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('user_token'),
        });

        return this.store.select(state => state.cart.experiences).pipe(
          map(experiencesMap => {
            const experiencesArray = Array.from(experiencesMap.values()).map((experience: any) => ({
              experienceId: experience._id,
              quantity: experience.quantity,
            }));

            const body = {
              name: formValues.cardHolderName,
              cardNumber: formValues.cardNumber,
              experiences: experiencesArray,
            };

            return this.http.post('http://3.14.151.214:3000/bookings', body, { headers });
          }),
          mergeMap(httpCall$ =>
            httpCall$.pipe(
              map(response => checkoutSuccess({ response })),
              catchError(error => of(checkoutFailure({ error })))
            )
          )
        );
      })
    )
  );

  checkoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(checkoutSuccess),
        tap(() => {
          // Navega a la página de configuración del usuario
          this.router.navigate(['/user-settings']);
          // Limpia el carrito y elimina la información del localStorage
          this.store.dispatch({ type: '[Cart] Clear Cart' });
          localStorage.removeItem('experiences');
          // Muestra notificación de éxito
          this.showNotification();
        })
      ),
    { dispatch: false }
  );

  checkoutFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(checkoutFailure),
        tap(() => {
          // Muestra alerta de error
          this.showCustomErrorAlert();
        })
      ),
    { dispatch: false }
  );

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