import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  queryValor!: number;

  constructor(
    private produtosService: ProdutosService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.loadProdutos();
  }

  loadProdutos(){
    this.produtosService.getProdutos().subscribe((produtos: any)=>{
      this.data = produtos;
      console.log("data", this.data);
    })
  }

  onEdit(dados: any){
    // this.router.navigate(['../../clientes'], {queryParams: {id: dados.id} });
    this.router.navigate(['../../produtos'], {queryParams: {
      id: dados.id,
      descricao: dados.descricao,
      marca: dados.marca,
      valor: dados.valor,
    }, skipLocationChange: true 
    });
  }

  onDelete(dados: any){
    if(confirm(`Você tem certeza que deseja excluir o produto ${dados.descricao}?`)){
      this.produtosService.excluirProduto(dados.id);
    }
  }

}
