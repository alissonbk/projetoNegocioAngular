import { Component, OnInit } from '@angular/core';
import { Compra } from 'src/app/models/compra';
import { ComprasService } from 'src/app/services/compras.service';

@Component({
  selector: 'app-mostrar-compras',
  templateUrl: './mostrar-compras.component.html',
  styleUrls: ['./mostrar-compras.component.css']
})
export class MostrarComprasComponent implements OnInit {

  data: any;
  constructor(private comprasService: ComprasService) { }

  ngOnInit(): void {
    this.loadCompras();
  }


  loadCompras(){
    this.comprasService.getCompras().subscribe((compras: any) =>{
      this.data = compras;
      console.log("data =", this.data);
    })
  }

}
