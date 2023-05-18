import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../item';
import { UserService } from '../user.service';
import { ItemService } from '../item.service';
import { Observable, flatMap, forkJoin, of } from 'rxjs';
import { User } from '../user';
import { MatDialog } from '@angular/material/dialog';
import { AlterDialogComponent } from '../alter-dialog/alter-dialog.component';

@Component({
  selector: 'user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent {


  items: Map<string, number> = new Map<string, number>;
  itemsInDb: Item[] = [];

  constructor(private dialog: MatDialog, private userService: UserService, private itemService: ItemService, private router: Router){}
  
  ngOnInit(){
    this.loadData();
  }

  loadData(){
    this.userService.getUserByUsername(this.userService.getLoggedInUser()).subscribe((user:User) => {
      this.items = user.cart;
    });
    this.itemService.getItemList().subscribe((item: Item[]) => {
      this.itemsInDb = item;
    });
  }

  openAlterDialog(itemKey: string): void {
    const dialogRef = this.dialog.open(AlterDialogComponent, {
      width: '300px',
      data: { itemKey: itemKey }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.alterItems(itemKey, result);
      }
    });
  }
  
  alterItems(itemKey: string, result: any) {
    if(result > 0){
      
        console.log("entrou")
        this.itemService.getItemByTitle(itemKey).subscribe((item: Item) => {
          console.log("entrou");
          for(let i = 0; i < result; i++){
          this.userService.addItemToCart(this.userService.getLoggedInUser(), item).subscribe();
          }
        });
      
    }
    if(result < 0){
      for(let i = 0; i < (-result); i++){
        this.itemService.getItemByTitle(itemKey).subscribe((item: Item) => {
          console.log("entrou");
          this.userService.deleteItemUserCart(this.userService.getLoggedInUser(), item).subscribe();
        });
      }
    }
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

  deleteItemFromCart(title: string){
    const targetItem = this.itemsInDb.find(item => item.title === title);
    if (targetItem !== undefined) {
      this.userService.deleteItemFromCart(this.userService.getLoggedInUser(), targetItem);
    }
    setTimeout(() => {
      this.loadData();
    }, 1000);
  }

  goToDashboard(){
    this.router.navigate(['/dashboard']);
  }

  goToCheckout() {
    this.router.navigate(['/checkout']);
  } 
}