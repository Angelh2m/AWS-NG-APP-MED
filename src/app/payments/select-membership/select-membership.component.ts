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
