import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NavigationComponent } from './sharedModules/navigation/navigation.component';
import { PaymentsComponent } from './payments/payments.component';
import { SelectMembershipComponent } from './payments/select-membership/select-membership.component';
import { MakePaymentComponent } from './payments/make-payment/make-payment.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginInterceptor } from './client/interceptor/token.interceptor';
// LoginInterceptor
import { ConfirmationComponent } from './payments/confirmation/confirmation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { AppointmentsComponent } from './dashboard/appointments/appointments.component';
import { MedicalBackgroundComponent } from './sharedModules/medical-background/medical-background.component';
import { PaymentHistoryComponent } from './dashboard/payment-history/payment-history.component';
import { QuestionsComponent } from './dashboard/questions/questions.component';
import { LoginComponent } from './sharedModules/login/login.component';
import { RecomendationsComponent } from './dashboard/recomendations/recomendations.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    NavigationComponent,
    PaymentsComponent,
    SelectMembershipComponent,
    MakePaymentComponent,
    ConfirmationComponent,
    DashboardComponent,
    HomeComponent,
    AppointmentsComponent,
    MedicalBackgroundComponent,
    PaymentHistoryComponent,
    QuestionsComponent,
    LoginComponent,
    RecomendationsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,

    // Forms
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoginInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
