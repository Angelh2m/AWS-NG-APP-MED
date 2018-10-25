import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/client/user/user.service';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html'
})
export class PaymentHistoryComponent implements OnInit {

  payments = []

  constructor(private _userService: UserService) { }

  ngOnInit() { this.onLoad(); }

  calculateDate(purchasedDate, expDate) {

    // const date = new Date().setMonth()


  }

  onLoad() {

    let purchaseDate = new Date(Date.parse('2018-09-05T20:31:16.378Z'))
    var expireDate = purchaseDate.setMonth(purchaseDate.getMonth() + 2);
    // console.log(purchaseDate);
    // console.log(new Date(expireDate));



    if (!this._userService.usersPayload.email) {
      this._userService.fetchUserProfile()
        .pipe(
          map((userPayments, i) => {
            userPayments.payments.map(payment => {
              let date = new Date(payment.date);
              var expireDate = date.setMonth(date.getMonth() + 2)
              payment.expires = new Date(expireDate)
            });
            return userPayments
          })
        )
        .subscribe(
          (succ) => (this.payments = succ.payments),
          (err) => console.log(err)
        )
    } else {
      this.payments = this._userService.usersPayload.payments;
      console.log(this.payments);
    }

  }


}
