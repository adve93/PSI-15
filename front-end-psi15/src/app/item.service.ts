import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from './item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private backEnd = 'http://localhost:3065';

  constructor(private http: HttpClient) { }


  addItem(item: Item){
    return this.http.post(`${this.backEnd}/item/create`, item);
  }

  getItemList() {
    return this.http.get(`${this.backEnd}/item/list`);
  }

  getItemByTitle(title: string): Observable<Item>{
    return this.http.get<Item>(`${this.backEnd}/item/${title}`);
  }

}
