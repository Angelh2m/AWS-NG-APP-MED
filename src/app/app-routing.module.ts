import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentsComponent } from './payments/payments.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SelectMembershipComponent } from './payments/select-membership/select-membership.component';
import { MakePaymentComponent } from './payments/make-payment/make-payment.component';
import { ConfirmationComponent } from './payments/confirmation/confirmation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { QuestionsComponent } from './dashboard/questions/questions.component';
import { PaymentHistoryComponent } from './dashboard/payment-history/payment-history.component';
import { AppointmentsComponent } from './dashboard/appointments/appointments.component';
import { RecomendationsComponent } from './dashboard/recomendations/recomendations.component';
import { ConfirmationGuard } from './client/guards/confirmation.guard';
import { LoginComponent } from './sharedModules/login/login.component';
import { LoginGuardGuard } from './client/guards/login-guard.guard';



const routes: Routes = [

  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { title: 'PatientsDashboardComponent' },
    canActivate: [LoginGuardGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
        data: { title: 'QuestionsComponent' }
      },
      {
        path: 'questions',
        component: QuestionsComponent,
        data: { title: 'QuestionsComponent' }
      },
      {
        path: 'payment-history',
        component: PaymentHistoryComponent,
        data: { title: 'payment-history' }
      },
      {
        path: 'appointments',
        component: AppointmentsComponent,
        data: { title: 'appointments' }
      },
      {
        path: 'recomendations',
        component: RecomendationsComponent,
        data: { title: 'recomendations' }
      },
    ]
  },
  {
    path: 'reset',
    component: LoginComponent,
    data: { title: 'reset' },
  },
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
        canActivate: [ConfirmationGuard],
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
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
