import { Component, Inject, OnInit, forwardRef } from '@angular/core';
import { Vendedor } from 'src/app/models/vendedor';
import { VendedoresService } from 'src/app/services/vendedores.service';
import { VendedoresComponent } from '../vendedores.component';

@Component({
  selector: 'app-mostrar-vendedores',
  templateUrl: './mostrar-vendedores.component.html',
  styleUrls: ['./mostrar-vendedores.component.css']
})
export class MostrarVendedoresComponent implements OnInit {

  data: any;

  constructor(
    private vendedoresService: VendedoresService,
    @Inject (forwardRef(() => VendedoresComponent)) private _parent: VendedoresComponent
    ) { }

  ngOnInit(): void {
    this.loadVendedores();
  }

  loadVendedores(){
    this.vendedoresService.getVendedores().subscribe((vendedores: any) => {
      this.data = vendedores;
      console.log("data= ",this.data);
    }) 
  }

  onEdit(dados: any){
    this._parent.onEdit(dados);
  }

  onDelete(dados: any){
    this._parent.onDelete(dados);
  }

}
