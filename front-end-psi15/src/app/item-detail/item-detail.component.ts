import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../item';
import { ItemService } from '../item.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent {

  constructor(private route: ActivatedRoute, private router: Router, private itemService: ItemService, private userService: UserService){}

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
    image: "ola",
    optional_links: []
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.title = <string> params.get('title');
    })
    this.getItem(this.title);
    this.username = this.userService.getLoggedInUser();
    this.username = this.username.trim();
    this.userService.getCartSizeByUsername(this.username).subscribe(size => this.cartSize);
  }

  
  getItem(title: string) {
    
    title.trim();
    var tempUser  = this.itemService.getItemByTitle(title).subscribe(
      item => {
        this.tempItem = item;
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

  itemToCard(){
    console.log(this.username);
    this.itemService.getItemByTitle(this.title).subscribe
    (item=> this.userService.addItemToCart(item,this.username).subscribe(msg => console.log(msg)))
}
}
