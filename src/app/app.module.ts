import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RoomsComponent } from './rooms/rooms.component';
import { FormsModule } from '@angular/forms';
import { CommonModule, registerLocaleData } from '@angular/common';
import { ReservasComponent } from './reservas/reservas.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { TipoComponent } from './tipos/tipo.component';
import localeES from '@angular/common/locales/es';
import { MatCardModule } from '@angular/material/card';
import { RegistroComponent } from './auth/registro.component';
import { LoginComponent } from './auth/login.component';
import { interceptorProvider } from './interceptors/habitaciones-interceptor.service';
import { ScheduleModule, RecurrenceEditorModule } from '@syncfusion/ej2-angular-schedule';
import { ClienteComponent } from './clientes/cliente.component'; 
import { authGuard as guardAuth } from './guards/auth.guard';
registerLocaleData(localeES,'es');
const routes:Routes=[
  {path:'',redirectTo:'/clientes',pathMatch:'full'},
  {path:'users', component:UsersComponent,canActivate:[guardAuth]},
  {path:'reservas',component:ReservasComponent,canActivate:[guardAuth]}, 
  {path:'rooms',component:RoomsComponent,canActivate:[guardAuth]},
  {path:'tipos',component:TipoComponent,canActivate:[guardAuth]},
  {path:'login',component:LoginComponent},
  {path:'crear',component:RegistroComponent},
  {path:'clientes',component:ClienteComponent,canActivate:[guardAuth]},
];

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    HeaderComponent,
    ReservasComponent,
    RoomsComponent, 
    TipoComponent,
   LoginComponent, 
   RegistroComponent, 
   ClienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    RouterModule.forRoot(routes),
    MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule,ReactiveFormsModule,MatCardModule, ScheduleModule, RecurrenceEditorModule
  ],
  providers: [interceptorProvider,provideAnimations(),{provide: LOCALE_ID, useValue: 'es'}], //OJO
  bootstrap: [AppComponent]
})
export class AppModule { }
