import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  public membership: any = {
    price: '0',
    selected: false,
    number: null,
    paid: false,
  }

  constructor() {

    this.membership = JSON.parse(localStorage.getItem('payment'));

  }


  setPayment(option) {

    switch (option) {
      case 0:
        this.membership = {
          price: '$25',
          time: '6 months',
          total: 49 * 6,
          selected: true,
          number: 0,
          paid: false
        }
        localStorage.setItem('payment', JSON.stringify(this.membership));
        return this.membership
      case 1:
        this.membership = {
          price: '$19',
          time: '12 months',
          total: 45 * 12,
          selected: true,
          number: 1,
          paid: false
        }
        localStorage.setItem('payment', JSON.stringify(this.membership));
        return this.membership
      default:
        break;
    }

  }
}
