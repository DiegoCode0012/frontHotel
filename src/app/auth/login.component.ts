import { Component } from '@angular/core';
import { LoginUsuario } from '../models/login-usuario';
import { TokenService } from '../service/token.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  loginUsuario: LoginUsuario = new LoginUsuario();
  errMsj: string;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
  }


  onLogin(): void {
    this.authService.login(this.loginUsuario).subscribe(
      data => {
        this.tokenService.setToken(data.token);
        console.log( this.tokenService.getToken());
       window.location.href="/";
      },
      err => {
        this.errMsj = err.error.errorMessage;
       console.log(err.error.errorMessage);
      }
    );
  }

}
