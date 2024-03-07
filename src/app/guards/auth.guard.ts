import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../service/token.service';
import { AuthService } from '../service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const token=inject(TokenService);
  const x = inject(Router);
  if(token.isLogged() && token.isAdmin()){ // si esta logueado y si el token tiene rol admin, me permite 
    return true
  }else{
    x.navigate(['/']);
    return false;
  }
 
    
};


