import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Reserva } from './reserva';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private urlEndPoint:string='http://localhost:8080/api/reservas';

  constructor(private httpClient:HttpClient) { }

getAll ():Observable<Reserva[]>{
  return this.httpClient.get<Reserva[]>(this.urlEndPoint).pipe(
    map(response => {
      let x=response;
      return x.map(l=>{
        //let datepipe=new DatePipe('es');
       // l.diaStart=datepipe.transform(l.diaStart,'dd/MM/YYYY');
        return l;
      });
    })
  );
}






  getReserva(id: number):Observable<Reserva>{
    return this.httpClient.get<Reserva>(this.urlEndPoint+id);
  }

  create(reserva:Reserva):Observable<any>{
    return this.httpClient.post<any>(this.urlEndPoint,reserva).pipe(
      catchError(e=>{
        if(e.status=400){
          return throwError(()=>e);
        }
                return throwError(()=>e);
    })
    );
  }
  delete(id:number):Observable<any>{
    return this.httpClient.delete<any>(`${this.urlEndPoint}/${id}`);
  }
  /*
  create(reserva:User):Observable<any>{
    return this.httpClient.post<any>(this.urlEndPoint,user).pipe(
      catchError(e=>{
        console.log(e.error.mensaje);
        return throwError(()=>e);
      })
    );
  }


  update(user:User):Observable<any>{
    return this.httpClient.put<any>(`${this.urlEndPoint}/${user.id}`,user);

  }

  deleteUser(id:number):Observable<User>{
    return this.httpClient.delete<User>(`${this.urlEndPoint}/${id}`);
  }
  */
}
