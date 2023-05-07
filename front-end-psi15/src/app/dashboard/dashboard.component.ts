
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../item';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent{

  items: Item[] = [];

  constructor(private router: Router, private itemService: ItemService){}

  showNotImplemented(){
    window.alert('Feature not implemented.');
  }


  getItems(): void{
    this.itemService.getItemList().subscribe(items => this.items = items.slice(1, 5));
  }


  goToUserProfile(): void{
    this.router.navigate(['/user-details']);
  }
}
