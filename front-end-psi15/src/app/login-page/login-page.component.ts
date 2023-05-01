import { Component } from '@angular/core';
import { UserService } from '../user.service';
@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  constructor(private userService: UserService) { }
  
  username: any;
  password: any;
  login(username: string, password: string) {
    username = username.trim();
    var isLoginValid = this.userService.login({ username, password }) // retorna um inteiro entre -1, 0 e 1
    switch(isLoginValid){
      case -1: // utilizador nao existe
      alert("utiizadr inserido não existe"); // podemos pergunar que se ele quer inserir o utilizador
      break;
      case 0: //utilizador com dados errados
      alert("dados errados!")
      break;
      case 1: // utilizador logado
      alert("logado!");// tratar disso melhor no frontend
      // TODO redirecionar a pagina do perfil quando a mesma for criada
      break;
      //so pode ter esses tres valores
    }
  }

}
