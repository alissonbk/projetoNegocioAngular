import { Injectable } from "@angular/core";
import { Produto } from "../models/produto";



@Injectable({providedIn: 'root'})

export class ProdutosService {

  private produtos: Array<Produto> = new Array();

  setProdutos(value: any) {
    this.produtos.push(value);
  }

  getProdutos(): Array<Produto>{
    
    return this.produtos;
    
    //return of(); //para não retornar undefined
  }
}