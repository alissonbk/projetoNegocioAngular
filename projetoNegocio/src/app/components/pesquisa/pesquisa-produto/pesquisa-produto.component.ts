import { Component, OnInit } from '@angular/core';
import { EMPTY } from 'rxjs';
import { ProdutosService } from 'src/app/services/produtos.service';

@Component({
  selector: 'app-pesquisa-produto',
  templateUrl: './pesquisa-produto.component.html',
  styleUrls: ['./pesquisa-produto.component.css']
})
export class PesquisaProdutoComponent implements OnInit {

  data: any;
  queryDesc!: string;
  queryMarca!: string;
  queryPreco!: number;

  constructor(private produtosService: ProdutosService) { }

  ngOnInit(): void {
    this.loadProdutos();
  }

  loadProdutos(){
    this.produtosService.getProdutos().subscribe((produtos: any)=>{
      this.data = produtos;
      console.log("data", this.data);
    })
  }

}
