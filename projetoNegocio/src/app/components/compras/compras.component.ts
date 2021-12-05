import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Compra } from 'src/app/models/compra';
import { ClientesService } from 'src/app/services/clientes.service';
import { ComprasService } from 'src/app/services/compras.service';
import { ProdutosService } from 'src/app/services/produtos.service';
import { VendedoresService } from 'src/app/services/vendedores.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {

  compras!: FormGroup;
  clientes: any;
  produtos: any;
  vendedores: any;
  hideBtn!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private comprasService: ComprasService,
    private clientesService: ClientesService,
    private produtosService: ProdutosService,
    private vendedoresService: VendedoresService
    ) { }

  ngOnInit(): void {
    this.compras = this.formBuilder.group({
      id: [null],
      cliente: [null, Validators.required],
      produto: [null, Validators.required],
      vendedor: [null, Validators.required]
    })

    this.clientesService.getClientes().subscribe((clientes: any) =>{
      this.clientes = clientes;
    });
    this.produtosService.getProdutos().subscribe((produtos:any) => {
      this.produtos = produtos;
    })
    this.vendedoresService.getVendedores().subscribe((vendedores: any) => {
      this.vendedores = vendedores;
    })

  }


  onSubmit(){
    if(this.compras.get('id')?.value == null){
      this.comprasService.cadastrarCompra(this.compras.value);
    }else{
      this.comprasService.editarCompra(this.compras.value);
    }
    this.compras.reset();
  }

  onEdit(dados: any){
    this.compras.patchValue({
      "id": dados.id,
      "cliente": dados.cliente,
      "produto": dados.produto,
      "vendedor": dados.vendedor
    })
  }

  onDelete(dados: any){
    if(confirm(`Você tem certeza que deseja excluir a compra (cliente:${dados.cliente.nome}, produto:${dados.produto.descricao})?`)){
      this.clientesService.excluirCliente(dados.id);
    }
  }



  hideButton(){
    this.hideBtn = !this.hideBtn;
    if(this.hideBtn){
      this.route.navigate(['/compras/mostrar']);
    }else{
      this.route.navigate(['/compras']);
    }
  }



  verificaValidTouched(campo: string){
    //return !this.formulario.controls[campo].valid && this.formulario.controls[campo].touched;
    return (
      !this.compras.get(campo)?.valid &&
      (this.compras.get(campo)?.touched || this.compras.get(campo)?.dirty)
      );
  }


  cssErro(campo: string){
    return {
      'is-invalid': this.verificaValidTouched(campo)
    }
  }

}
