import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { MatButtonModule } from '@angular/material/button';




import { LoginPageComponent } from './login-page/login-page.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ItemDetailComponent } from './item-detail/item-detail.component'; 
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
//Services
import { ItemService } from './item.service';
import { UserService } from './user.service';
import { ItemSearchComponent } from './item-search/item-search.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { GameLibraryComponent } from './game-library/game-library.component';
import { UserCartComponent } from './user-cart/user-cart.component';
import { AlterDialogComponent } from './alter-dialog/alter-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    RegisterPageComponent,
    LoginPageComponent,
    DashboardComponent,
    UserProfileComponent,
    ItemSearchComponent,
    CheckoutComponent,
    UserUpdateComponent,
    GameLibraryComponent,
    UserCartComponent,
    AlterDialogComponent,
    ItemDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [UserService, ItemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
