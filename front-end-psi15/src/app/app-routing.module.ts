import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { LoginPageComponent } from './login-page/login-page.component';

import { SearchItemsComponent } from './search-items/search-items.component';
import { CheckoutComponent } from './checkout/checkout.component';

import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/main-page', pathMatch: 'full'},
  { path: 'main-page', component: MainPageComponent},
  { path: 'user-register', component: RegisterPageComponent},
  { path: 'user-login', component: LoginPageComponent},

  { path: 'search-items', component: SearchItemsComponent},
  { path: 'checkout', component: CheckoutComponent},

  { path: 'dashboard', component: DashboardComponent}
  //{ path: 'itemDetail/:title', component: ItemDetailComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
