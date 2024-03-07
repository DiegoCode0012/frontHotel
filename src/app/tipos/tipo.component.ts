import { Component } from '@angular/core';
import { TipoService } from './tipo.service';
import { Tipo } from './tipo';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tipo',
  templateUrl: './tipo.component.html',
})
export class TipoComponent {
  tipo:Tipo=new Tipo();
tiposArreglo:Tipo[];
public errores :string[];

constructor(private tiposervice:TipoService,private activatedRoute:ActivatedRoute, private router:Router){
  this.getAll();
}

getAll(){
  this.tiposervice.getAll().subscribe(x=>{
    return this.tiposArreglo=x;
  })
}

cargarTipo(id:number){

  this.activatedRoute.params.subscribe(params =>{
      this.tiposervice.getTipo(id).subscribe(ObjetoTipo =>this.tipo =ObjetoTipo)   
}
  )
}

public create():void{
  this.tiposervice.create(this.tipo).subscribe(json =>{
//      this.router.navigate(['/users']);
this.getAll();
this.resetForm();
      Swal.fire('Nuevo Tipo de habitación', 'success');
    },
    err=>{
      this.errores=err.error.errors;
      console.error(err.status);
      console.error(err);
    }
  )
}
public resetForm():void {
  this.tipo= new Tipo();
  this.errores=[];
}
updateTipo():void{
  this.tiposervice.update(this.tipo).subscribe(json => {
    //this.router.navigate(['/users']);
    this.getAll();
    Swal.fire('Tipo de Habitación Actualizado'+this.tipo.descripcion, 'success');
    this.resetForm();

  }, err=>{
    this.errores=err.error.errors
    console.error(err.status);
  }
  )
}

delete(objeto:Tipo){
  Swal.fire({
    title: 'Estas seguro?',
    text: `¿Seguro que desea eliminar la habitacion de tipo ${objeto.descripcion} con id ${objeto.id}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si eliminar'
  }).then(x=>{
    if (x.isConfirmed) {
      this.tiposervice.deleteTipo(objeto.id).subscribe(rpta =>{
        this.getAll();
        Swal.fire(
          'Tipo de Habitación eliminado ',
          'success'
        )

      })
      
    }

  })
}

}
