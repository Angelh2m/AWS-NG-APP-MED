import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PaymentsService } from '../payments/payments.service';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationGuard implements CanActivate {

  constructor(
    public router: Router,
    public _payment: PaymentsService
  ) { }

  canActivate() {
    console.warn(this._payment.membership);

    if (this._payment.membership.paid == false) {

      this.router.navigate(['/payments/card']);
      return false
    }
    return true;
  }
}
