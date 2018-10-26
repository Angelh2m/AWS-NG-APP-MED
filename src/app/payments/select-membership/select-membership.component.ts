import { Component, OnInit } from '@angular/core';
import { PaymentsService } from 'src/app/client/payments/payments.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-select-membership',
  templateUrl: './select-membership.component.html',

})
export class SelectMembershipComponent implements OnInit {

  home: boolean = true;
  membership: any = {
    price: '0',
    selected: false,
    number: null
  }

  constructor(
    public router: Router,
    public _paymentsService: PaymentsService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    // this.home = this.activatedRoute.snapshot.data.title !== 'payments/cards';
    this.membership = this._paymentsService.membership;
  }

  ngAfterContentInit() {
    // document.write('<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"> </script>');
    // document.write('<script type="text/javascript" src="https://js.stripe.com/v3/" ></script>');
    // document.write('<script type="text/javascript" src="assets/js/stripe.js" ></script>')

  }

  setPayload(option) {
    this.membership = this._paymentsService.setPayment(option);
    console.log(this.membership);
  }

  onProceed() {
    this.router.navigate(['/payments/card']);
  }

  ngOnDestroy() {
    this.home = this.activatedRoute.snapshot.data.title !== 'payments/cards';
  }

}
