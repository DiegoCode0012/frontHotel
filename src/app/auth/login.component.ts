import { Component } from '@angular/core';
import { LoginUsuario } from '../models/login-usuario';
import { TokenService } from '../service/token.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginUsuario: LoginUsuario;
  nombreUsuario: string;
  password: string;

  errMsj: string;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);
    this.authService.login(this.loginUsuario).subscribe(
      data => {
        this.tokenService.setToken(data.token);
        console.log( this.tokenService.getToken());
    //   this.router.navigate(['/']);
       window.location.href="/";
        this.errMsj==null;
      },
      err => {
        this.errMsj = err.error.message;
       console.log(err);
      }
    );
  }

}
