import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NuevoUsuario } from '../models/nuevo-usuario';
import { Observable } from 'rxjs';
import { LoginUsuario } from '../models/login-usuario';
import { JwtDTO } from '../models/jwt-DTO';
import { User } from '../users/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL="http://localhost:8080/auth/";

  constructor(private httpClient: HttpClient) { }

  public nuevo(nuevoUsuario: NuevoUsuario): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'nuevo', nuevoUsuario);
  }

  public login(loginUsuario: LoginUsuario): Observable<JwtDTO> {
    return this.httpClient.post<JwtDTO>(this.authURL + 'login', loginUsuario);
  }

  public refresh(dto: JwtDTO): Observable<JwtDTO> {
    return this.httpClient.post<JwtDTO>(this.authURL + 'refresh', dto);
  }
  nombre: string;
  nombreUsuario: string;
  email: string;
  password: string;

  public listarUsuarios(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.authURL.concat('users'));
  }
  
  deleteUser(id:number):Observable<User>{
    return this.httpClient.delete<User>(`${this.authURL.concat('users')}/${id}`);
  }
}
