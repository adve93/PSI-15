import { Component } from '@angular/core';
import { UserService } from '../user.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
 // items = this.cartService.getItems();
 // total = this.cartService.getTotal();

// constructor(/*private cartService: CartService*/) { }
 constructor(private userService:UserService) { }
 
  ngOnInit(): void {
  }

  checkout(): void {
    console.log('Checkout button clicked');
  }
  userhasMoney(wallet:number, value:number): void {
    console.log('Checkout button clicked');
    
    var hasMoney = this.userService.hasMoney(wallet,wallet); 
    if(hasMoney){
      console.log('tem grana, pode continuar!');
      // TODO: Implement checkout logic here
    }else{
      console.log('Sem grana!');
    }
    
  }
  
}
