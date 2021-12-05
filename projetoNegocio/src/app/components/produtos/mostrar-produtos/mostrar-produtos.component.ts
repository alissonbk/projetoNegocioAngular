import { Component, forwardRef, Host, Inject, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ProdutosService } from 'src/app/services/produtos.service';
import { ProdutosComponent } from '../produtos.component';

@Component({
  selector: 'app-mostrar-produtos',
  templateUrl: './mostrar-produtos.component.html',
  styleUrls: ['./mostrar-produtos.component.css']
})
export class MostrarProdutosComponent implements OnInit {

  data: any;
  constructor(
    private produtosService: ProdutosService,
    @Inject(forwardRef(() => ProdutosComponent)) private _parent: ProdutosComponent
    ) { }

  ngOnInit(): void {
    this.loadProdutos();
  }

  loadProdutos(){
    this.produtosService.getProdutos().subscribe((produtos: any) => {
      this.data = produtos;
      console.log("data: ", this.data);
    })
  }

  onEdit(dados: any){
    this._parent.onEdit(dados);
  }

  onDelete(dados: any){
    this._parent.onDelete(dados);
  }

}
