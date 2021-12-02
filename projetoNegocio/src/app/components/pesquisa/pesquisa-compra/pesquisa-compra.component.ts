import { Component, OnInit } from '@angular/core';
import { ComprasService } from 'src/app/services/compras.service';

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

  constructor(private comprasService: ComprasService) { }

  ngOnInit(): void {
    this.loadCompras();
  }


  loadCompras(){
    this.comprasService.getCompras().subscribe((compras:any) =>{
      this.data = compras;
      console.log("data : ", this.data);
    })
  }

}
