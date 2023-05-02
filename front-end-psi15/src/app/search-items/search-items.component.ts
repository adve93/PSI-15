import { Component } from '@angular/core';

@Component({
  selector: 'app-search-items',
  templateUrl: './search-items.component.html',
  styleUrls: ['./search-items.component.css']
})
export class SearchItemsComponent {

  searchTerm: string = '';
  //games: Game[] = [];

  constructor(/*private gameService: GameService*/) { }

  ngOnInit(): void {
    this.search();
  }

  search(): void {
    /*
    this.gameService.searchGames(this.searchTerm).subscribe(
      games => {
        this.games = games;
      },
      error => {
        console.log(error);
      }
    );
    */
  }
}
