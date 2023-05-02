import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { MessageService } from './message.service';
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private backEnd = 'http://localhost:3000';

  constructor (private http: HttpClient) {}

  addItem(type: string, description:string, platform: string, languages:string, price: number, title: string) {
    const item = {
      type: type,
      description: description,
      platform: platform,
      languages:languages,
      price:price,
      title:title

    };
    return this.http.post(`${this.backEnd}/item/create`, item);
  }

  getItemList(): Observable<Item[]>{
    
    return this.http.get<Item[]>(`${this.backEnd}/item/list`);
  }

  getItemByTitle(title: string) {
    return this.http.get(`${this.backEnd}/item/${title}`);
  }

  postUpdateItem(type: string, description:string, platform: string, languages:string, price: number,classification:number, title: string) {
    const item = {
      type: type,
      description: description,
      platform: platform,
      languages:languages,
      price:price,
      classification:classification,
      title:title
    };
    return this.http.post(`${this.backEnd}/item/update/${title}`, item);
  }

  deleteItemByTitle(title: string) {
    return this.http.get(`${this.backEnd}/item/delete/${title}`);
  }

}
