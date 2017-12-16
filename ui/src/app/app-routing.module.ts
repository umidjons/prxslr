import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProxyListComponent } from './dashboard/proxy-list/proxy-list.component';
import { OrderListComponent } from './dashboard/order-list/order-list.component';
import { PayListComponent } from './dashboard/pay-list/pay-list.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {path: '', redirectTo: 'signin', pathMatch: 'full'},
      {path: 'signin', component: SigninComponent},
      {path: 'signup', component: SignupComponent}
    ]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', redirectTo: 'proxy-list', pathMatch: 'full'},
      {path: 'proxy-list', component: ProxyListComponent},
      {path: 'order-list', component: OrderListComponent},
      {path: 'pay-list', component: PayListComponent},
      {path: 'profile', component: ProfileComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
