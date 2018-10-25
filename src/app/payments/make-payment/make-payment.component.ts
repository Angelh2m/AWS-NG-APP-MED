import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PaymentsService } from '../../client/payments/payments.service';
import { UserService } from '../../client/user/user.service';


declare function stripeInit();
declare global { interface Window { stripe: any; } }

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
})
export class MakePaymentComponent implements OnInit {

  @ViewChild('getToken') el: ElementRef;
  home: boolean = true;
  isTimeEnabled = false;
  membership;

  constructor(public router: Router,
    private _userService: UserService,
    private payment: PaymentsService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.membership = this.payment.membership;

    stripeInit(); // GLOBAL FUNCTION INIT STRIPE
    this.home = this.activatedRoute.snapshot.data.title !== 'payments/cards';
  }

  ngAfterViewInit() { }

  onSubmit() {

    let timer;
    let token: string;

    if (!this.isTimeEnabled) {
      timer = setInterval(() => {
        console.log(this.el.nativeElement.innerText);
        if (this.el.nativeElement.innerText.length >= 8) {
          stopTimer(this.el.nativeElement.innerText)
        }
      }, 1000);
      this.isTimeEnabled = !this.isTimeEnabled;
    }

    const stopTimer = (token) => {

      clearInterval(timer)
      this._userService.makePayment(token, this.membership)
        .subscribe(
          (res) => {

            this.payment.membership.paid = true;
            this.router.navigate(['/payments/payment-confirmation']);
            console.log(res)
          },
          (err) => console.log(err)
        )
    }

  }
}
