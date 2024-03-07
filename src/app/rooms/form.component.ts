import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Room } from './room';
import { RoomService } from './room.service';
import { TipoService } from '../tipos/tipo.service';
import { Tipo } from '../tipos/tipo';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormRoomComponent {
  listTipos: Tipo[];
  public titulo:string;
  public  room:Room = new Room(); //esta asociado al formulario
  constructor(private roomService:RoomService, private tipoService:TipoService,
    private router:Router,private activatedRoute:ActivatedRoute){
      this.cargarRoom();
      this.listarTypes();
  }

listarTypes(){
    this.tipoService.getAll().subscribe(x=>{
      return this.listTipos=x;
    })
  }
cargarRoom():void{

  this.activatedRoute.params.subscribe(params =>{
    let id=params['id']
   // console.log(id)
    if(id){
      this.titulo="Editar Tipo con Angular"
      this.roomService.getRoom(id).subscribe(ObjetoRoom =>this.room =ObjetoRoom)
    }else{
      this.titulo="Formulario Crear Usuario con Angular";
    }
  })
}

//subscribe porque el metodo usa observable
//Me inserta el nuevo cliente y nos vamos al listado con navigate
public create():void{
  this.room.disponible=true;
  this.roomService.create(this.room).subscribe(json =>{
      this.router.navigate(['/rooms']);
      Swal.fire('Nueva habitación', 'success');
    }
  )
}

updateRoom():void{
  this.roomService.update(this.room).subscribe(json => {
    this.router.navigate(['/rooms']);
    Swal.fire('Habitación Actualizada','success');
  }
  )
}

checkTipo(h1: Room, h2: Room): boolean {
  return h1 != undefined && h2 != undefined && h1.id == h2.id;
}
}
