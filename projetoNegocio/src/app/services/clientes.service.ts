import { Injectable } from "@angular/core";


import { Cliente } from "../models/cliente";

@Injectable({providedIn: 'root'})

export class ClientesService {

  private clientes: Array<Cliente> = new Array();

  setClientes(value: any) {
    this.clientes.push(value);
  }

  getClientes(): Array<Cliente>{
    
    return this.clientes;
    
    //return of(); //para não retornar undefined
  }
}