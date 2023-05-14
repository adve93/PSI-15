import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from './item';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private backEnd = 'http://localhost:3065';

  constructor(private http: HttpClient) { }


  addItem(item: Item){
    return this.http.post(`${this.backEnd}/item/create`, item);
  }

  getItemList(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.backEnd}/item/`);
  }

  getItemByTitle(title: string): Observable<Item>{
    return this.http.get<Item>(`${this.backEnd}/item/detail/${title}`);
  }

  deleteItemByTitle(title: string) {
    return this.http.get(`${this.backEnd}/item/delete/${title}`);
  }

  searchItem(term: string): Observable<Item[]>{

    if(!term.trim()){
      return of([]);
    }

    return this.http.get<Item[]>(`${this.backEnd}/item/?title=${term}`);

  }


}
