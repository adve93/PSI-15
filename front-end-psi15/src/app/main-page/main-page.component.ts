import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {

  constructor(private router: Router) {}

  goToRegister(): void {
    this.router.navigate(['/user-register']);
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

}