import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    private router: Router
  ) { }

  public setToken(token: any): void {
   // window.localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  public isLogged(): boolean {
    let tokenStr = localStorage.getItem(TOKEN_KEY);
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    }
    return true;
  }

  public getUserName(): string {
    if (!this.isLogged()) {
      return null;
    }
    const token = this.getToken();
    const payload = token.split('.')[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const username = values.sub;
    return username;
  }

  public isAdmin(): boolean {
    if (!this.isLogged()) {
      return false;
    }
    const token = this.getToken(); //hacemos el STRING DEL TOKEN EN UN ARREGLO CONFORMADO POR LOS INDICES 0,1,2
    const payload = token.split('.')[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const roles = values.roles; //ESTE ES UN ARREGLO roles:[ "ROLE_ADMIN",ROLE_USER]
    if (roles.indexOf('ROLE_ADMIN') < 0) {
      return false;
    }
    return true;
  }


  public logOut(): void {
    window.localStorage.clear();
    this.router.navigate(['/login']);
  }
}
