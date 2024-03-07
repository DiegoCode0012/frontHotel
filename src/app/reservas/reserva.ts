import { Cliente } from "../clientes/cliente";
import { Room } from "../rooms/room";
export class Reserva{
    id:number;
    diaStart:string;
    diaEnd:string;
    habitacion:Room;
    estado:string;
    cliente:Cliente
}