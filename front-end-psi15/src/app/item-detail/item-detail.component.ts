import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../item';
import { ItemService } from '../item.service';
import { UserService } from '../user.service';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent {

  constructor(private route: ActivatedRoute, private router: Router, private itemService: ItemService, private userService: UserService, private changeDetectorRef: ChangeDetectorRef){}


  title: string = "";

  username: string = "";

  cartSize = 0;

  tempItem: Item = {
    type: "",
    description: "",
    platform: "",
    languages: [],
    price: 0,
    classification: 0,
    title: "",
    image: "",
    optional_links: []
  };

  optLink: string[] = [];

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.title = <string> params.get('title');
    })
    this.getItem(this.title);
    this.username = this.userService.getLoggedInUser();
    this.username = this.username.trim();
    this.updateCartItemSize();
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
  
  getLink() {
    for(const el of this.tempItem.optional_links) {
      this.optLink.push(el);
    }
  }
  
  getItem(title: string) {
    
    title.trim();
    var tempUser  = this.itemService.getItemByTitle(title).subscribe(
      item => {
        this.tempItem = item;
        this.getLink();
        console.log(this.optLink)
      },
      error => {
        console.log(error);
      }
    )
    
    if(!tempUser){
      console.log("Item não existe!");
    }

  }
  
  goToDashboard(){
    this.router.navigate(['/dashboard']);
  }

  goToCheckout(){
    this.router.navigate(['/checkout']);
  }
  
  goToLibrary(){
    this.router.navigate(['/myList']);
  }

  goToCart(){
    this.router.navigate(['/user-cart']);
  }
  itemToCard(){
    this.itemService.getItemByTitle(this.title).subscribe
    (item=> this.userService.addItemToCart(this.username, item).subscribe());
    window.alert("Item added to the cart!");
    setTimeout(() => {
      this.updateCartItemSize();
    }, 1000);
  }

}
