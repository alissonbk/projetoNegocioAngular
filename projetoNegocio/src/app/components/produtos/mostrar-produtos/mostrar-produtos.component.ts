import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/models/produto';
import { ProdutosService } from 'src/app/services/produtos.service';

@Component({
  selector: 'app-mostrar-produtos',
  templateUrl: './mostrar-produtos.component.html',
  styleUrls: ['./mostrar-produtos.component.css']
})
export class MostrarProdutosComponent implements OnInit {

  data!: Array<Produto>;
  constructor(private produtosService: ProdutosService) { }

  ngOnInit(): void {
    this.data = this.produtosService.getProdutos();
  }

}
