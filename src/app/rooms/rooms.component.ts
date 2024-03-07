import { Component } from '@angular/core';
import { RoomService } from './room.service';
import { Room } from './room';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoService } from '../tipos/tipo.service';
import { Tipo } from '../tipos/tipo';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
})
export class RoomsComponent {
listTipos: Tipo[];
ListRooms:Room[];
public errores :string[];
room:Room=new Room();
  constructor(private roomservice:RoomService,
    private tipoService:TipoService,
    private activatedRoute:ActivatedRoute, private router:Router){
    this.getAll();
    this.listarTypes();

  }
  getAll(){
    this.roomservice.getAll().subscribe(x=>{
      return this.ListRooms=x;
    })
  }

  cargarRoom(id:number){

    this.activatedRoute.params.subscribe(params =>{
        this.roomservice.getRoom(id).subscribe(ObjetoRoom =>this.room =ObjetoRoom)   
  }
    )
  }

  public create():void{
    this.room.disponible=true;
    this.roomservice.create(this.room).subscribe(json =>{
  this.getAll();
  this.resetForm();
        Swal.fire('Nueva Habitación', 'success');
      
      },
      err=>{
        this.errores=err.error.errors;
      }
    )
  }
  public resetForm():void {
    this.room= new Room();
    this.errores=[];
  }
  updateRoom():void{
    this.roomservice.update(this.room).subscribe(json => {
      this.getAll();
      this.resetForm();
      Swal.fire('Habitación  Actualizada', 'success');
    }, err=>{
      this.errores=err.error.errors
      console.error(err);
    }
    )
  }
  
  listarTypes(){
    this.tipoService.getAll().subscribe(x=>{
      return this.listTipos=x;
    })
  }
  checkTipo(h1: Room, h2: Room): boolean {
    return h1 != undefined && h2 != undefined && h1.id == h2.id;
  }
  delete(objeto:Room){
    Swal.fire({
      title: 'Estas seguro?',
      text: `¿Seguro que desea eliminar la habitacion con id ${objeto.id}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si eliminar'
    }).then(x=>{
      if (x.isConfirmed) {
        this.roomservice.deleteRoom(objeto.id).subscribe(rpta =>{
          this.getAll();
          Swal.fire(
            'Habitación eliminada',
            'success'
          )
  
        })
        
      }
  
    })
  }

}
