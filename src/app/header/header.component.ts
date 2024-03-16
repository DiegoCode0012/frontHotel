import { Component } from "@angular/core";
import { TokenService } from "../service/token.service";
@Component({
    selector:'app-header',
    templateUrl:`./header.component.html`
})
//aqui se definen las palabras claves que se puede usar en el app.component.html
export class HeaderComponent{
    isLogged=false;
    username:string;
   // isAdmin = false;
  
    constructor(private tokenService: TokenService) { }
  
    ngOnInit() {
     this.isLogged = this.tokenService.isLogged();
     this.username=this.tokenService.getUserName();
    // this.isAdmin = this.tokenService.isAdmin();
    }
  
    onLogOut(): void {
      this.tokenService.logOut();
    }

}