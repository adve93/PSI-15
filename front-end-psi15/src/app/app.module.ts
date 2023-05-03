import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';


import { UserService } from './user.service';
import { ItemServiceService } from './item-service.service';

import { LoginPageComponent } from './login-page/login-page.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ItemDetailComponent } from './item-detail/item-detail.component'; 

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    RegisterPageComponent,
    LoginPageComponent,
    DashboardComponent,
    UserProfileComponent,
    ItemDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [UserService, ItemServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
