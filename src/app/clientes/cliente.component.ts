import { Component } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
})
export class ClienteComponent {
  cliente:Cliente=new Cliente();
  clientesArreglo:Cliente[];
  public errores :string[];
  isAdmin=false;
  constructor(private tokenService:TokenService,private clienteService:ClienteService,private activatedRoute:ActivatedRoute, private router:Router){
    this.getAll();
    this.isAdmin = this.tokenService.isAdmin();

  }
  
  getAll(){
    this.clienteService.getAll().subscribe(x=>{
      return this.clientesArreglo=x;
    })
  }
  
  cargarCliente(id:number){
  
    this.activatedRoute.params.subscribe(params =>{
        this.clienteService.getCliente(id).subscribe(ObjetoCliente =>this.cliente =ObjetoCliente)   
  }
    )
  }
  
  public create():void{
    this.clienteService.createCliente(this.cliente).subscribe(json =>{
  //      this.router.navigate(['/users']);
  this.getAll();
  this.resetForm();
        Swal.fire('Nuevo Cliente', 'success');
      },
      err=>{
        this.errores=err.error.errors;
      //   console.error(err.error.errors);
      }
    )
  }
  public resetForm():void {
    this.cliente= new Cliente();
    this.errores=[];
  }
  update():void{
    this.clienteService.updateCliente(this.cliente).subscribe(json => {
      this.getAll();
      Swal.fire(' Cliente Actualizado'+this.cliente.name, 'success');
      this.resetForm();
  
    }, err=>{
      this.errores=err.error.errors
      console.error(err.status);
    }
    )
  }
  
  delete(objeto:Cliente){
    Swal.fire({
      title: 'Estas seguro?',
      text: `¿Seguro que desea eliminar el cliente  ${objeto.name} con id ${objeto.idClient}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si eliminar'
    }).then(x=>{
      if (x.isConfirmed) {
        this.clienteService.deleteCliente(objeto.idClient).subscribe(rpta =>{
          this.getAll();
          Swal.fire(
            'Cliente eliminado ',
            'success'
          )
  
        })
        
      }
  
    })
  }
  
  }
  
