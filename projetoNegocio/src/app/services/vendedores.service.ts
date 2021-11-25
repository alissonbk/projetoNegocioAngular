import { Injectable } from "@angular/core";


import { Vendedor } from '../models/vendedor';

@Injectable({providedIn: 'root'})

export class VendedoresService {

  private vendedores: Array<Vendedor> = new Array();

  setVendedores(value: any) {
    this.vendedores.push(value);
  }

  getVendedores(): Array<Vendedor>{
    
    return this.vendedores;
    
    //return of(); //para não retornar undefined
  }
}