import { Component } from '@angular/core';
import { Item } from '../item';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap, map, of, catchError } from 'rxjs';
import { ItemService } from '../item.service';


@Component({
  selector: 'item-search',
  templateUrl: './item-search.component.html',
  styleUrls: ['./item-search.component.css']
})
export class ItemSearchComponent {

  items$!: Observable<Item[]>;
  private searchTerms = new Subject<string>();

  constructor(private itemService: ItemService) {}

  search(term: string) {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
      this.items$ = this.searchTerms.pipe(
      debounceTime(300),
      
      distinctUntilChanged(),

      switchMap((term: string) => {
        if (term.trim() === '') {
          // If search term is empty, return an empty array
          return of([]);
        } else {
          return this.itemService.searchItem(term).pipe(
            map((items: Item[]) => {
              const filteredItems = items.filter(item =>
                item.title.toLowerCase().includes(term.toLowerCase())
              ).slice(0, 5);
  
              if (filteredItems.length === 0) {
                throw new Error('No item like that exists'); // Throw an error if no items match the search
              }
  
              return filteredItems;
            }),
            catchError((error: any) => {
              // Handle the error and return an empty array
              console.error(error);
              return of([]);
            })
          );
        }
      })

    );
  }
}
