import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../item';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent {

  constructor(private route: ActivatedRoute, private router: Router, private itemService: ItemService){}

  title: string = "";

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
}
