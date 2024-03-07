import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { Cliente } from './cliente';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

 
  private urlEndPoint:string='http://localhost:8080/api/clientes';
  
  constructor(private httpClient:HttpClient,private router:Router) { 
  }
  getAll():Observable<Cliente[]>{
    return this.httpClient.get<Cliente[]>(this.urlEndPoint).pipe(
      );
  }

  getAllSinReserva():Observable<Cliente[]>{
    return this.httpClient.get<Cliente[]>(this.urlEndPoint.concat("SinReserva")).pipe(
      );
  }
  getCliente(id: number):Observable<Cliente>{
    return this.httpClient.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        return throwError(() => e);
    })
    )
  }

  createCliente(cliente:Cliente):Observable<any>{
    return this.httpClient.post<any>(this.urlEndPoint,cliente).pipe(
      catchError(e=>{
//BADREQUEST
        if(e.status=400){
          return throwError(()=>e);
        }
        //este error si hay campos duplicados u otros errores diferentes al 400
  //      console.error(e.error.mensaje);
//        console.log(e.status);
        return throwError(()=>e);
      })
    );
  }


  updateCliente(cliente:Cliente):Observable<any>{
    return this.httpClient.put<any>(`${this.urlEndPoint}/${cliente.idClient}`,cliente).pipe(
      catchError(e=>{

        if(e.status=400){
          return throwError(()=>e);
        }
                //este error si hay campos duplicados u otros errores diferentes al 400

        console.log(e.error.mensaje);
        return throwError(()=>e);
      })
    );

  }

  deleteCliente(id:number):Observable<Cliente>{
    return this.httpClient.delete<Cliente>(`${this.urlEndPoint}/${id}`);
  }
 
}
