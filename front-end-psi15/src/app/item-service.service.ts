import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from './item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemServiceService {

  private backEnd = 'http://localhost:3065';

  constructor (private http: HttpClient, private router: Router) {}


  getItemByTitle(title: string): Observable<Item> {
    return this.http.get<Item>(`${this.backEnd}/item/${title}`);
  }

  addTestItems(){
    const item1: Item = {
      type: "Aventura",
      description: "Este jogo é muito épico e cheio de aventuras",
      platform: "Playstation 1",
      languages: ["Portugues", "Ingles"],
      price: 69,
      classification: 1,
      title: "AGrandeAventura"
    }
    const item2: Item = {
      type: "Terror",
      description: "Este jogo é muito assustador",
      platform: "Calculadora",
      languages: ["Portugues"],
      price: 1,
      classification: 5,
      title: "OGrandeHorror"
    }
    const item3: Item = {
      type: "Corrida",
      description: "Um jogo cheio de corridas",
      platform: "PC",
      languages: ["Ingles"],
      price: 70,
      classification: 4,
      title: "AGrandeCorrida"
    }
    this.addItem(item1);
    this.addItem(item2);
    this.addItem(item3);
  }


  private addItem(item: Item){
    this.http.post(`${this.backEnd}/item/create`, item);
  }

}
