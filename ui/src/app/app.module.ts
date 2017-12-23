import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule, ToastOptions, ToastsManager } from 'ng2-toastr';
import { CookieService } from 'ng2-cookies';
import localeRu from '@angular/common/locales/ru';
import { registerLocaleData } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { PriceTableComponent } from './price-table/price-table.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { FeaturesComponent } from './features/features.component';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthService } from './services/auth.service';
import { ProxyService } from './services/proxy.service';
import { ToastsCustomOptions } from './toasts-custom-options';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorService } from './interceptors/error.interceptor';
import { SessionService } from './interceptors/session.interceptor';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProxyListComponent } from './dashboard/proxy-list/proxy-list.component';
import { OrderListComponent } from './dashboard/order-list/order-list.component';
import { PayListComponent } from './dashboard/pay-list/pay-list.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { BuyComponent } from './dashboard/pay-list/buy/buy.component';
import { CountryService } from './services/country.service';
import { ProductService } from './services/product.service';

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    PriceTableComponent,
    CalculatorComponent,
    FeaturesComponent,
    SignupComponent,
    HomeComponent,
    AuthComponent,
    SigninComponent,
    DashboardComponent,
    SidebarComponent,
    ProxyListComponent,
    OrderListComponent,
    PayListComponent,
    ProfileComponent,
    BuyComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ToastModule.forRoot()
  ],
  providers: [
    ToastsManager,
    {provide: ToastOptions, useClass: ToastsCustomOptions},
    {provide: HTTP_INTERCEPTORS, useClass: SessionService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorService, multi: true},
    CookieService,
    AuthService,
    AuthGuard,
    ProxyService,
    CountryService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(localeRu);
  }
}
