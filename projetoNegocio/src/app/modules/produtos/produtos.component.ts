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
  
  ngAfterViewInit(): void {
    window.scroll(0, -300);
  }

  //Funções principais
  onSubmit(){
    //EDITAR
    if(this.produtos.get('id')?.value != null){
      //  Seta valor para padrão numerico novamente
      let valor = '' + this.produtos.get('valor')?.value;
      valor = valor.split(',').join('.');
      this.produtos.get('valor')?.setValue(valor);

      this.produtosService.editarProduto(this.produtos.value).subscribe(
        next => {
          console.log(next);
        },
        error => {
          alertify.dismissAll();
          alertify.set('notifier','delay', 3);
          alertify.set('notifier', 'position', 'top-center');
          alertify.error('Erro ao editar produto!');
          console.log(error);
        },
        () => {
          alertify.set('notifier','delay', 2);
          alertify.warning('Produto modificado!');
          this.reloadPage();
        }
      );
    //CADASTRAR
    }else{
      this.produtos.removeControl('id');
      this.produtosService.cadastrarProduto(this.produtos.value).subscribe(
        next => {
          console.log(next);
        },
        error => {
          alertify.dismissAll();
          alertify.set('notifier','delay', 3);
          alertify.set('notifier', 'position', 'top-center');
          alertify.error('Erro ao cadastrar produto!');
          console.log(error);
        },
        () => {
          alertify.dismissAll();
          alertify.set('notifier','delay', 2);
          alertify.success('Produto Cadastrado Com Sucesso!');
          this.reloadPage();
        }
      );
    }
    this.produtos.reset();
    this.reloadPage();
  }

  onEdit(dados: any){
    this.produtos.patchValue({
      "id": dados.id,
      "descricao": dados.descricao,
      "marca": dados.marca,
      "valor": String(dados.valor).split('.').join(',')
    });
    this.loading = false;
    window.scroll(0, -300);
  }
  
  onDelete(dados: any){
    if(confirm(`Você tem certeza que deseja excluir o produto ${dados.descricao}?`)){
      this.produtosService.excluirProduto(dados.id).subscribe(
        next => {
          console.log("id para excluir:", next);
        },
        error => {
          console.log("Error: ", error);
        },
        () => {
          console.log("success");
          this.reloadPage();
        }
      );
    }
  }

  //Utils...
  //getById temporario
  getById(id: number){
    this.loading = true;
    this.produtosService.getProdutos().subscribe((produtos: any) => {
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

  isNumber(e: any) {return typeof e === 'number'}

}
