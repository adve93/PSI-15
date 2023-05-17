import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../item.service';
import { UserService } from '../user.service';
import { Item } from '../item';

@Component({
  selector: 'app-game-library',
  templateUrl: './game-library.component.html',
  styleUrls: ['./game-library.component.css']
})
export class GameLibraryComponent {

  lib: any = [];
  username: string = "";
  sortByTitle: boolean = false;
  sortByDate: boolean = false;

  constructor(private router: Router, private itemService: ItemService, private userService: UserService){};

  
  ngOnInit() {
    this.username = this.userService.getLoggedInUser();
    this.userService.getUserGames(this.username).subscribe(response => {
      this.lib = Array(response)[0];
    });

    if (this.sortByTitle) {
      this.sortByTitle = !this.sortByTitle;
      this.sortBy('title');
    }

    if (this.sortByDate) {
        this.sortByDate = !this.sortByDate;
        this.sortBy('date');
    }
  }

  goToProfile() {
    this.router.navigate(['/user-details']);
  }

  goToItemPage(item: string) {
    const splitString = item.split(":");
    this.router.navigate(['/item/' + splitString[0]]);
  }

  sortBy(field: string) {
    this.lib.sort((a: any, b: any) => {
        const valueA = a[field];
        const valueB = b[field];

        if (field === 'title') {
            return valueA.localeCompare(valueB);
        }

        if (field === 'date') {
            return new Date(valueA).getTime() - new Date(valueB).getTime();
        }

        return 0;
    });
}


}
