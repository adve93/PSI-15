
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

  cartSize = 0;
  searchText: string = "";

  constructor(private router: Router, private itemService: ItemService, private userService: UserService){}

  
  ngOnInit() {
    this.username = this.userService.getLoggedInUser();
    this.userService.getCartSizeByUsername(this.username).subscribe(size => this.cartSize);
  }

  showNotImplemented(){
    window.alert('Feature not implemented.');
  }

  searchItems() {
    this.filteredItems = this.items.filter(item =>
      item.title.toLowerCase().includes(this.searchText.toLowerCase())
    ).slice(0, 5);
  }

  getItems(): void{
    this.itemService.getItemList().subscribe(items => this.items = items.slice(1, 5));
  }

  goToUserProfile(): void{
    this.router.navigate(['/user-details']);
  }
  
}
