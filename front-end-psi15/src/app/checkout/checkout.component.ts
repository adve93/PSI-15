import { Component } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
 // items = this.cartService.getItems();
 // total = this.cartService.getTotal();

  constructor(/*private cartService: CartService*/) { }

  ngOnInit(): void {
  }

  checkout(): void {
    // TODO: Implement checkout logic here
    console.log('Checkout button clicked');
  }
}
