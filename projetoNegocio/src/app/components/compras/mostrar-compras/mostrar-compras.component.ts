import { Component, forwardRef, Inject, OnInit } from '@angular/core';
import { ComprasService } from 'src/app/services/compras.service';
import { ComprasComponent } from '../compras.component';

@Component({
  selector: 'app-mostrar-compras',
  templateUrl: './mostrar-compras.component.html',
  styleUrls: ['./mostrar-compras.component.css']
})
export class MostrarComprasComponent implements OnInit {

  data: any;
  constructor(
    private comprasService: ComprasService,
    @Inject(forwardRef(() => ComprasComponent)) private _parent: ComprasComponent
    ) { }

  ngOnInit(): void {
    this.loadCompras();
  }


  loadCompras(){
    this.comprasService.getCompras().subscribe((compras: any) =>{
      this.data = compras;
    })
  }

  onEdit(dados: any){
    this._parent.onEdit(dados);
  }

  onDelete(dados: any){
    this._parent.onDelete(dados);
  }


}
