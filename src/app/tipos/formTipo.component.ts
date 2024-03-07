import { Component } from '@angular/core';
import { Tipo } from './tipo';
import { TipoService } from './tipo.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormTipoComponent {
  public titulo:string;
  public  tipo:Tipo = new Tipo(); //esta asociado al formulario
  constructor(private tipoService:TipoService,
    private router:Router,private activatedRoute:ActivatedRoute){
      this.cargarTipo();
  }

  
cargarTipo():void{

  this.activatedRoute.params.subscribe(params =>{
    let id=params['id']
   // console.log(id)
    if(id){
      this.titulo="Editar Tipo con Angular"
      this.tipoService.getTipo(id).subscribe(ObjetoTipo =>this.tipo =ObjetoTipo)
    }else{
      this.titulo="Formulario Crear Usuario con Angular";
    }
  })
}

//subscribe porque el metodo usa observable
//Me inserta el nuevo cliente y nos vamos al listado con navigate
public create():void{
  this.tipoService.create(this.tipo).subscribe(json =>{
      this.router.navigate(['/tipos']);
      Swal.fire('Nuevo tipo', 'success');
    }
  )
}

updateTipo():void{
  this.tipoService.update(this.tipo).subscribe(json => {
    this.router.navigate(['/tipos']);
    Swal.fire('Tipo Actualizado','success');
  }
  )
}
}
