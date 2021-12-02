import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/models/produto';
import { ProdutosService } from 'src/app/services/produtos.service';

@Component({
  selector: 'app-mostrar-produtos',
  templateUrl: './mostrar-produtos.component.html',
  styleUrls: ['./mostrar-produtos.component.css']
})
export class MostrarProdutosComponent implements OnInit {

  data: any;
  constructor(private produtosService: ProdutosService) { }

  ngOnInit(): void {
    this.loadProdutos();
  }

  loadProdutos(){
    this.produtosService.getProdutos().subscribe((produtos: any) => {
      this.data = produtos;
      console.log("data: ", this.data);
    })
  }

}
