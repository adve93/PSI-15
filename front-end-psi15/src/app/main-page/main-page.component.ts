import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../item.service';
import { Item } from '../item';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {

  item1: Item = {
    type: "Jogo",
    description: "League of Legends (LoL) is a highly popular multiplayer online battle arena (MOBA) game where teams of champions compete to destroy the enemy's nexus while overcoming various challenges and strategic gameplay.",
    platform: "PC",
    languages: ["English", "Spanish", "Brazilian"],
    price: 70,
    classification: 1,
    title: "LeagueOfLegends",
    image: "../assets/gamePics/lol.jpg",
    optional_links: []
  }

  item2: Item = {
    type: "Jogo",
    description: "Zelda: Epic fantasy video game series by Nintendo. Hero saves princess and kingdom from evil. Memorable characters and adventures.",
    platform: "Switch",
    languages: ["English", "Spanish", "Brazilian"],
    price: 70,
    classification: 5,
    title: "Zelda",
    image: "../assets/gamePics/Zelda.jpg",
    optional_links: ["../assets/gamePics/Zelda2.jpg"]
  }

  item3: Item = {
    type: "Jogo",
    description: "Outer Wilds is a time-looping space exploration game with a captivating mystery to unravel.",
    platform: "PC",
    languages: ["English", "Spanish", "Brazilian", "Japonese"],
    price: 20,
    classification: 5,
    title: "OuterWilds",
    image: "../assets/gamePics/ow.jpg",
    optional_links: []
  }

  item4: Item = {
    type: "DLC",
    description: "Garen is a melee fighter in League of Legends known for his strength, durability, and spinning attack. He embodies the ideals of justice and valor in the kingdom of Demacia. With his straightforward abilities, he can quickly deal damage to enemies and execute low-health targets with his ultimate ability, Demacian Justice.",
    platform: "PC",
    languages: ["English", "Spanish", "Brazilian"],
    price: 150,
    classification: 4,
    title: "LeagueOfLegends-Garen",
    image: "../assets/gamePics/garen.jpg",
    optional_links: ["https://www.youtube.com/watch?v=St3b0Nn6u4w"]
  }

  item5: Item = {
    type: "Subscrição",
    description: "Wordle is a word-guessing game where players have six attempts to guess a five-letter word by receiving feedback on each guess.",
    platform: "PC",
    languages: ["English", "Spanish", "Brazilian"],
    price: 30,
    classification: 3,
    title: "Wordle",
    image: "../assets/gamePics/wordle.jpg",
    optional_links: []
  }

  constructor(private router: Router, private itemService: ItemService) {}

  ngOnInit() {
    this.itemService.getItemList().subscribe(list => {
      if(list.length == 0) {
        this.itemService.addItem(this.item1).subscribe();
        this.itemService.addItem(this.item2).subscribe();
        this.itemService.addItem(this.item3).subscribe();
        this.itemService.addItem(this.item4).subscribe();
        this.itemService.addItem(this.item5).subscribe();
      }
    })
  }

  goToRegister(): void {
    this.router.navigate(['/user-register']);
  }

  goToLogin(): void {
    this.router.navigate(['/user-login']);
  }

}
