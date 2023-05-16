import { Component } from '@angular/core';
import { Item } from '../item';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
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

      switchMap((term: string) => this.itemService.searchItem(term)),

    );
  }
}
