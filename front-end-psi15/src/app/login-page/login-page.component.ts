import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
username: any;
password: any;
login() {
throw new Error('Method not implemented.');
}
constructor(private router: Router) { }
  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

}
