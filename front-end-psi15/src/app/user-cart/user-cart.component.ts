import { Component } from '@angular/core';
import { Item } from '../item';
import { UserService } from '../user.service';

@Component({
  selector: 'user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent {

  ilib: any = [];
  games: string[] = [];
  nGames: Map<string,number> = new Map<string, number>();

  constructor(private userService: UserService){}
  
  ngOnInit(){
    this.userService.getUserCart(this.userService.getLoggedInUser()).subscribe((map: Map<string,number>) => {
      this.nGames = map;
    });
    console.log(this.nGames.keys());
  }
}
