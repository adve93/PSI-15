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
  games: string[] = [];
  dates: Date[] = [];
  username: string = "";


  constructor(private router: Router, private itemService: ItemService, private userService: UserService){};

  
  ngOnInit() {
    this.username = this.userService.getLoggedInUser();
    this.userService.getUserGames(this.username).subscribe(response => {
      this.lib = Array(response)[0];
      this.divideLib();
    });
  }

  goToProfile() {
    this.router.navigate(['/user-details']);
  }

  goToItemPage(item: string) {
    this.router.navigate(['/item/' + item]);
  }

  divideLib() {
    for(const el of this.lib) {
      const title: string = el[0];
      this.games.push(title.split(":")[0]);
      this.dates.push(el[1]);
    }
    const dates2: Date[] = this.dates.map((dateString) => new Date(dateString));
    this.dates = dates2;
  }

  sortByTitle() {
    const indices = this.games.map((_, index) => index);

    // Sort the indices based on the titles
    indices.sort((a, b) => this.games[a].localeCompare(this.games[b]));

    this.games = indices.map((index) => this.games[index]);

    this.dates = indices.map((index) => this.dates[index]);
  }

  sortByDate() {
    const indices = this.games.map((_, index) => index);
  
    // Sort the indices based on the corresponding dates in descending order
    indices.sort((a, b) => this.dates[b].getTime() - this.dates[a].getTime());

    this.games = indices.map((index) => this.games[index]);
  
    this.dates = indices.map((index) => this.dates[index]);
  }


}
