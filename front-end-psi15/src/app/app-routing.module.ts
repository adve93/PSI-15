import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';



import { DashboardComponent } from './dashboard/dashboard.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { UserUpdateComponent } from './user-update/user-update.component';

const routes: Routes = [
  { path: '', redirectTo: '/main-page', pathMatch: 'full'},
  { path: 'main-page', component: MainPageComponent},
  { path: 'user-register', component: RegisterPageComponent},
  { path: 'user-login', component: LoginPageComponent},
  { path: 'user-details', component: UserProfileComponent},
  { path: 'item/:title', component: ItemDetailComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'checkout', component: CheckoutComponent},
  { path: 'user-update', component: UserUpdateComponent},
  { path: 'user-profile', component: UserProfileComponent}
  //{ path: 'cart', component: CheckoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
