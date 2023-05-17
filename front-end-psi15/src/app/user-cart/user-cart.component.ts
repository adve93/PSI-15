import { Component } from '@angular/core';
import { Item } from '../item';
import { UserService } from '../user.service';
import { ItemService } from '../item.service';
import { Observable, flatMap, of } from 'rxjs';
import { User } from '../user';

@Component({
  selector: 'user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent {

  items: Map<string, number> = new Map<string, number>;
  itemsInDb: Item[] = [];
  constructor(private userService: UserService, private itemService: ItemService){}
  
  ngOnInit(){
    this.userService.getUserByUsername(this.userService.getLoggedInUser()).subscribe((user:User) => {
      this.items = user.cart;
    });
    this.itemService.getItemList().subscribe((item: Item[]) => {
      this.itemsInDb = item;
    });
  }

  getItemDetail(title: string): string {
    const targetItem = this.itemsInDb.find(item => item.title === title);
    if (targetItem !== undefined) {
      // The item with the matching title was found
      return "Type: " + targetItem.type + ", Price: " + targetItem.price;
    } else {
      // No item with the matching title was found
      return "";
    }
  }

  getItemImage(title: string) {
    const targetItem = this.itemsInDb.find(item => item.title === title);
    if (targetItem !== undefined) {
      // The item with the matching title was found
      return targetItem.image;
    } else {
      // No item with the matching title was found
      return "";
    }
  }
}
