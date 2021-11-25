import { Component, OnInit } from '@angular/core';
import { Compra } from 'src/app/models/compra';
import { ComprasService } from 'src/app/services/compras.service';

@Component({
  selector: 'app-mostrar-compras',
  templateUrl: './mostrar-compras.component.html',
  styleUrls: ['./mostrar-compras.component.css']
})
export class MostrarComprasComponent implements OnInit {

  data!: Array<Compra>;
  constructor(private comprasService: ComprasService) { }

  ngOnInit(): void {
    this.data = this.comprasService.getCompras();
  }

}
