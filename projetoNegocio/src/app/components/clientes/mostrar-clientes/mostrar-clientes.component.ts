import { ClientesComponent } from './../clientes.component';
import { Component, OnInit, Input, Inject, forwardRef } from '@angular/core';
import { ClientesService } from 'src/app/services/clientes.service';
import { map } from 'rxjs/operators';
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-mostrar-clientes',
  templateUrl: './mostrar-clientes.component.html',
  styleUrls: ['./mostrar-clientes.component.css']
})
export class MostrarClientesComponent implements OnInit {

  data: any;

  constructor(
    private clientesService: ClientesService,
    @Inject(forwardRef(() => ClientesComponent)) private _parent: ClientesComponent
    ) { }

  ngOnInit(): void {
    this.loadClientes();

    // this.clienteService.emitirCliente.subscribe( cliente => console.log("emiiter", cliente));
    console.log("Mostrar data: ", this.data);
  }


  loadClientes(){
    this.clientesService.getClientes().subscribe((clientes:any) => {
      this.data = clientes;
      //console.log("data= ",this.data);
    })
    
  }

  onEdit(dados: any){
    this._parent.onEdit(dados);
  }

  onDelete(dados: any){
    this._parent.onDelete(dados);
  }


}
