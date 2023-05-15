import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  constructor(private router: Router, private userService: UserService) { }

  goToDashboard(){
    this.router.navigate(['/dashboard']);
  }

  checkout(){
    const username = this.userService.getLoggedInUser();
    this.userService.postUserCheckout(username).subscribe(item =>console.log(item))
  }
}
