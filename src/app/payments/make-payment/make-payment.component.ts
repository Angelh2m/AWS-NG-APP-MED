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
    private _renderer: Renderer2,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.membership = this.payment.membership;

    // stripeInit(); // GLOBAL FUNCTION INIT STRIPE
    this.home = this.activatedRoute.snapshot.data.title !== 'payments/cards';
  }

  ngAfterContentInit() {

    const promise1 = new Promise((resolve, reject) => {
      let el = this._renderer.createElement('script');
      el.src = 'https://code.jquery.com/jquery-3.3.1.min.js';
      el.integrity = "sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=";
      el.setAttribute('crossorigin', 'anonymous');
      el.id = 'jquery';
      document.getElementsByTagName('head')[0].appendChild(el);

      el = this._renderer.createElement('script');
      el.id = 'stripe';
      el.src = 'https://js.stripe.com/v3/';
      document.getElementsByTagName('head')[0].appendChild(el)

      el = this._renderer.createElement('script');
      el.src = 'assets/js/stripe.js';
      el.id = 'stripe2';
      document.getElementsByTagName('head')[0].appendChild(el)

      setTimeout(() => {
        resolve();
      }, 500);
    });

    const jquery = document.getElementById('jquery');


    promise1.then(el => stripeInit())


  }

  ngOnDestroy() {
    const z = document.getElementById('jquery').remove();
    const x = document.getElementById('stripe2').remove();
    const y = document.getElementById('stripe').remove();

    console.log(x);

  }


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
