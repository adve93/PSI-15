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
    // TODO: Implement checkout logic here
  }
  
  userhasMoney(username:string, sumitemValue:number): void {//itemVal
    console.log('Checkout button clicked');
    
    const user = this.userService.getUserByUsername(username);
    
    if((user as any).credit >= sumitemValue){
      console.log('tem Dinheiro, pode continuar!');
      //alert("Com Dinheiro")
      // TODO me deem a lista que eu add 

    }else{
      console.log('Sem Dinheiro!');
      //alert("sem Dinheiro!")
    }
    */
  }
}
