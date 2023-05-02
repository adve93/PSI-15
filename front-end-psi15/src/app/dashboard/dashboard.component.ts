import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { Item } from '../item';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  constructor(private itemService: ItemService){ }
  
  items!: Item[];


  ngOnInit(): void {
    this.getItemList();
  }
  getItemList(): void{
    this.itemService.getItemList().subscribe(items => this.items = items);;
  }

}
