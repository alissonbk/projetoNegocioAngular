import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { ComprasService } from 'src/app/core/services/compras.service';

@Component({
  selector: 'app-pesquisa-compra',
  templateUrl: './pesquisa-compra.component.html',
  styleUrls: ['./pesquisa-compra.component.css']
})
export class PesquisaCompraComponent implements OnInit {

  data: any;
  queryCliente!: string;
  queryVendedor!: string;
  queryProduto!: string;

  constructor(
    private comprasService: ComprasService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.loadCompras();
  }


  loadCompras(){
    this.comprasService.getCompras().subscribe((compras:any) =>{
      this.data = compras;
      console.log("data : ", this.data);
    })
  }

  onEdit(dados: any){
    this.router.navigate(['../../compras'], {queryParams: {id: dados.id}, skipLocationChange: true });
  }

  onDelete(dados: any){
    if(confirm(`Você tem certeza que deseja excluir a compra (cliente: ${dados.cliente.nome} produto:${dados.produto.descricao})?`)){
      this.comprasService.excluirCompra(dados.id);
    }
  }

}
