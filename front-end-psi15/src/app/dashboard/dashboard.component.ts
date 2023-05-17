
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../item';
import { User } from '../user';
import { ItemService } from '../item.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent{

  items: Item[] = [];
  filteredItems: Item[] = [];

  username = "";
  cartSize: number = 0;

  constructor(private router: Router, private itemService: ItemService, private userService: UserService){}

  
  ngOnInit() {
    this.username = this.userService.getLoggedInUser();
    this.updateCartItemSize();
    this.userService.postUserCheckout("Afonso").subscribe();
  }

  updateCartItemSize() {
    this.userService.getCartSizeByUsername(this.username).subscribe(response => {
      const size = Number(response);
      if (!isNaN(size)) {
       this.cartSize = size;
     } else {
       console.error('Invalid cart size:', response);
     }
   });
  }

  showNotImplemented(){
    window.alert('Feature not implemented.');
  }

  getItems(): void{
    this.itemService.getItemList().subscribe(items => this.items = items.slice(1, 5));
  }

  goToUserProfile(): void{
    this.router.navigate(['/user-details']);
  }

  goToLibrary() {
    this.router.navigate(['/myList']);
  }
}
