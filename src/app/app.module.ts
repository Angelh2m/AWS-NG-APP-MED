import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NavigationComponent } from './sharedModules/navigation/navigation.component';
import { PaymentsComponent } from './payments/payments.component';
import { SelectMembershipComponent } from './payments/select-membership/select-membership.component';
import { MakePaymentComponent } from './payments/make-payment/make-payment.component';

import { HttpClientModule } from '@angular/common/http';
import { ConfirmationComponent } from './payments/confirmation/confirmation.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    NavigationComponent,
    PaymentsComponent,
    SelectMembershipComponent,
    MakePaymentComponent,
    ConfirmationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
