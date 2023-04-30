import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { LoginPageComponent } from './login-page/login-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/main-page', pathMatch: 'full'},
  { path: 'main-page', component: MainPageComponent},
  { path: 'user-register', component: RegisterPageComponent},
  { path: 'login', component: LoginPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
