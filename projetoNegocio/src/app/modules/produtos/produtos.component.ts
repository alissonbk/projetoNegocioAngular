import { Produto } from 'src/app/shared/models/produto';
import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


import { ProdutosService } from 'src/app/core/services/produtos.service';
import { MostrarProdutosComponent } from './mostrar-produtos/mostrar-produtos.component';
declare let alertify: any;

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  produtos!: FormGroup;
  hideBtn!: boolean;
  paramId!: any;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private produtosService: ProdutosService,
    private cf: ChangeDetectorRef
    ) { }
  @ViewChild(MostrarProdutosComponent) child!: MostrarProdutosComponent;


  //Lifecyclehooks
  ngOnInit(): void {
    this.hideBtn = false;
    this.produtos = this.formBuilder.group({
      id: [null],
      descricao: [null, Validators.required],
      marca: [null, Validators.required],
      valor: [null, [Validators.required]]
    })

    // Path param
    this.paramId = this.route.snapshot.queryParamMap.get('id');
    if(this.paramId != null){
      this.getById(this.paramId);
    }

    /*Resolve o problema de acessar diretamente o child mostrar e não atualizar o valor no parent*/
    this.cf.detectChanges();
  }

  // Funções principais
  onSubmit(){
    //Criando objeto produto apartir do formulario
    let produto: Produto = new Produto(this.produtos.get('descricao')?.value, this.produtos.get('marca')?.value, 
    this.produtos.get('valor')?.value, this.produtos.get('id')?.value);
    // EDITAR
    if(produto.id != null){
      //  Seta valor para padrão numerico novamente
      let valor = '' + this.produtos.get('valor')?.value;
      valor = valor.split(',').join('.');
      produto.valor = Number(valor);
      this.produtosService.editarProduto(produto);
    // CADASTRAR
    }else{
      produto.id = undefined;
      this.produtosService.cadastrarProduto(produto);
    }
    this.produtos.reset();
    this.reloadPage();
  }

  onEdit(dados: Produto){
    this.produtos.patchValue({
      "id": dados.id,
      "descricao": dados.descricao,
      "marca": dados.marca,
      "valor": String(dados.valor).split('.').join(',')
    });
    this.loading = false;
    window.scroll(0, -300);
  }
  
  onDelete(dados: Produto){
    alertify.confirm(`Você tem certeza que deseja excluir o produto ${dados.descricao}?`, () => {
      this.produtosService.excluirProduto(dados);
      this.reloadPage();
    });
      
  }

  //Utils...
  //getById temporario até a api
  getById(id: number){
    this.loading = true;
    this.produtosService.getProdutos().subscribe((produtos: Produto[]) => {
      for(let produto of produtos){
        if(produto.id == id){
          this.onEdit(produto);
        }
      }
    })
  }

  reloadPage(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/produtos/mostrar']);
  }

  hideButton(){
    this.hideBtn = !this.hideBtn;
    if(this.hideBtn){
      this.router.navigate(['/produtos/mostrar']);
    }else{
      this.router.navigate(['/produtos']);
    }
  }

  verificaValidTouched(campo: string){
    return (
      !this.produtos.get(campo)?.valid &&
      (this.produtos.get(campo)?.touched || this.produtos.get(campo)?.dirty)
      );
  }

  cssErro(campo: string){
    return {
      'is-invalid': this.verificaValidTouched(campo)
    }
  }

  // isNumber(e: any) {return typeof e === 'number'}

}
