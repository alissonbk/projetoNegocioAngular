import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  paramId!: any;
  compraById!: any;
  allCompras: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private comprasService: ComprasService,
    private clientesService: ClientesService,
    private produtosService: ProdutosService,
    private vendedoresService: VendedoresService,
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

    //Path params
    this.paramId = this.route.snapshot.queryParamMap.get('id');
    console.log("id: ",this.paramId);
    if(this.paramId != null){
      this.getById(this.paramId);
    }
      

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
      this.comprasService.excluirCompra(dados.id);
    }
  }

  getById(id: number){
    this.comprasService.getCompras().subscribe((compras: any) => {
      this.allCompras = compras;
      for(let compra of (this.allCompras?.compras)){
        if(compra.id == id){
          this.compras.get('id')?.setValue(compra.id);
          this.compras.get('cliente')?.setValue(compra.cliente);
          this.compras.get('produto')?.setValue(compra.produto);
          this.compras.get('vendedor')?.setValue(compra.vendedor);
        }
      }
    })
  }



  hideButton(){
    this.hideBtn = !this.hideBtn;
    if(this.hideBtn){
      this.router.navigate(['/compras/mostrar']);
    }else{
      this.router.navigate(['/compras']);
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
