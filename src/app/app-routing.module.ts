import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentsComponent } from './payments/payments.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SelectMembershipComponent } from './payments/select-membership/select-membership.component';
import { MakePaymentComponent } from './payments/make-payment/make-payment.component';
import { ConfirmationComponent } from './payments/confirmation/confirmation.component';



const routes: Routes = [

  {
    path: 'payments',
    component: PaymentsComponent,
    data: { title: 'payments' },
    // pathMatch: 'full',
    children: [
      {
        path: '',
        component: SelectMembershipComponent,
        // canActivate: [LoginGuardGuard],
      },
      {
        path: 'card',
        component: MakePaymentComponent,
        // canActivate: [LoginGuardGuard],
      },
      {
        path: 'payment-confirmation',
        component: ConfirmationComponent,
        // canActivate: [LoginGuardGuard],
      },
    ],
  },
  {
    path: '',
    component: LandingPageComponent,
    data: { title: '' },

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
