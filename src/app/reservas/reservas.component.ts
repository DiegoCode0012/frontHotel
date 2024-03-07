import { Component } from '@angular/core';
import { ReservaService } from './reserva.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Reserva } from './reserva';
import { RoomService } from '../rooms/room.service';
import Swal from 'sweetalert2';

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TipoService } from '../tipos/tipo.service';
import { Tipo } from '../tipos/tipo';
import { Room } from '../rooms/room';
import { User } from '../users/user';
import { AuthService } from '../service/auth.service';
import { Cliente } from '../clientes/cliente';
import { ClienteService } from '../clientes/cliente.service';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
})
export class ReservasComponent {
  public errores :string[];
 type_id:number;
listReserva:Reserva[];
listTipo:Tipo[];
listRooms:Room[];
listClientesSinReserva:Cliente[];
  reserva:Reserva=new Reserva();
  minDateEnd: Date;
maxDateEnd: Date;

minDateStart: Date;
maxDateStart: Date;
  constructor(private reservaservice:ReservaService, 
    private roomservice:RoomService,
    private tipoService:TipoService,
    private clienteService:ClienteService,
    private router:Router,private activatedRoute:ActivatedRoute){
  }

  ngOnInit(): void {
    const currentTime = new Date();

    this.minDateStart= new Date(currentTime.getFullYear(),currentTime.getMonth(),currentTime.getDate());
    this.maxDateStart= new Date(currentTime.getFullYear(),currentTime.getMonth(),currentTime.getDate());

    this.minDateEnd = new Date(currentTime.getFullYear(), currentTime.getMonth(),currentTime.getDate()+1); //empieza desde el año recurrente , en enero, y en el tercer dia de ese mes
    this.maxDateEnd = new Date(currentTime.getFullYear(), currentTime.getMonth(),currentTime.getDate()+8);
    this.listarReservas();
    this.listarTipos();
    this.listarClientes();
  }
  listarTipos(){
    this.tipoService.getAll().subscribe(x=>{
      this.listTipo=x;
      return this.listReserva;
    });
  }
  filtrarHabitacionesXTipo(){
    this.roomservice.RoomsByTypeId(this.type_id).subscribe(x=>{
        this.listRooms=x;
        console.log(this.listRooms);
        return this.listRooms;
    })
  }

  listarClientes(){
    this.clienteService.getAllSinReserva().subscribe(x=>{
      this.listClientesSinReserva=x;
      console.log(x);
      return this.listClientesSinReserva;
    });
  }
  listarReservas(){
    this.reservaservice.getAll().subscribe(x=>{
      this.listReserva=x;
      return this.listReserva;
    });
  }
  

  
createReserva(){
  
  this.reserva.estado='Activa';
   this.reservaservice.create(this.reserva).subscribe(json=>{
    this.listarReservas();
    this.listarClientes();
    this.resetForm();
     Swal.fire('Nueva Reserva añadida');
   
   },err=>{
    this.errores=err.error.errors;
    console.log(err);
   }
   )
 }
  public resetForm():void {
    this.reserva= new Reserva();
    this.errores=[];
    this.type_id=undefined;
    this.listRooms=[];
  }
  delete(objeto:Reserva){
    Swal.fire({
      title: 'Estas seguro?',
      text: `¿Seguro que desea eliminar la reserva con id ${objeto.id}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si eliminar'
    }).then(x=>{
      if (x.isConfirmed) {
        this.reservaservice.delete(objeto.id).subscribe(rpta =>{
          this.listarReservas();
          Swal.fire(
            'Usuario eliminado',
            'success'
          )
  
        })
        
      }
  
    })

  }

  dowloand(reserva:Reserva){
    //CONVERTIMOS EL STRING AL DIA DEL MES DE LA FECHA ACTUAL
    const x=reserva.diaEnd;
    let EndDay= new Date(x);
    const m=reserva.diaStart;
    let StartDay=new Date(m);
    let diasTotales=EndDay.getDate()-StartDay.getDate();
    const pdfdefinition:any={
      content:[
        {
        text:[
          {text:'DATOS DEL CLIENTE/HUESPED: \n',style:'header'},
          '===================================================\n',
          {text:'Nombre:',style:'subtitle'},
          reserva.cliente.name+ " " + reserva.cliente.lastname, 
          {text:'\n Pais:',style:'subtitle'},
          'Peru',
          {text:'\n DNI:',style:'subtitle'},
          reserva.cliente.dni,
          {text:'\n telefono:',style:'subtitle'},
          reserva.cliente.phone,'\n\n',
          {text:'DATOS DE LA AGENCIA/EMPRESA: \n',style:'header'},
          '===================================================\n',
          {text:'Empresa:',style:'subtitle'},
          'San Diego Peru  \n \n',
          {text:'DATOS DE LA RESERVA \n',style:'header'},
          '===================================================\n',
          {text:'Estado de la Reserva:',style:'subtitle'},
          reserva.estado +'\n\n',
          {text:'Confirmacion:',style:'subtitle'},
          reserva.id,
          {text:'\n Fecha Entrada:',style:'subtitle'},
          reserva.diaStart,
          {text:'\n Fecha Salida:',style:'subtitle'},
          reserva.diaEnd,
          {text:'\n  Habitaciones:',style:'header'},
          ' 1 Noches:' + diasTotales + '\n\n\n',
          {text:'Detalle de las habitaciones reservadas:',style:'header',alignment:'center'},
        ],
        
      },
      {
        style:'tableExample',
        table:{
          headerRows:1,
            body: [
                [{text:'ID',style:'subtitle'}, {text: 'N:Habitacion',style:'subtitle'},{ text: 'Tipo',style:'subtitle'},{text:'Precio',style:'subtitle'}],
                [''+reserva.id,''+reserva.habitacion.numero,''+reserva.habitacion.tipo.descripcion,'S/'+reserva.habitacion.tipo.precio]

            ]
        },
        layout: 'headerLineOnly'
    }
      
        
    ],styles:{
      header:{
        fontSize: 13,
        bold:true
       
      },izquierda:{
        alignment: 'right'
      }
      , subtitle:{
        fontSize:12,
        bold:true
      }, tableExample: {
        margin: [170, 15, 0, 0],//, LEFT,TOP,RIGTH,BOTTOM
        alignment:'center'
    }
      
    }
    }
    const pdf=pdfMake.createPdf(pdfdefinition);
    pdf.open();
  }

}
