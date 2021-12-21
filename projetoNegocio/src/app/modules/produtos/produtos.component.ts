import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


import { ProdutosService } from 'src/app/core/services/produtos.service';
import { MostrarProdutosComponent } from './mostrar-produtos/mostrar-produtos.component';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  produtos!: FormGroup;
  hideBtn!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private produtosService: ProdutosService,
    private cf: ChangeDetectorRef
    ) { }
  @ViewChild(MostrarProdutosComponent) child!: MostrarProdutosComponent;


  /*LIFECYCLE*/
  ngOnInit(): void {
    this.hideBtn = false;
    this.produtos = this.formBuilder.group({
      id: [null],
      descricao: [null, Validators.required],
      marca: [null, Validators.required],
      valor: [null, [Validators.required]]
    })

    /*DADOS DE PESQUISA(EDITAR)*/
    this.produtos.get('id')?.setValue(this.route.snapshot.queryParamMap.get('id'));
    this.produtos.get('descricao')?.setValue(this.route.snapshot.queryParamMap.get('descricao'));
    this.produtos.get('marca')?.setValue(this.route.snapshot.queryParamMap.get('marca'));
    this.produtos.get('valor')?.setValue(this.route.snapshot.queryParamMap.get('valor'));

    /*Resolve o problema de acessar diretamente o child mostrar e não atualizar o valor no parent*/
    this.cf.detectChanges();
  }

  // ngOnChanges(){
  //   console.log("CHANGES");
  // }

  /*SUBMIT EDIT DELETE*/
  onSubmit(){
    if(this.produtos.get('id')?.value != null){
      this.produtosService.editarProduto(this.produtos.value).subscribe(
        next => {
          console.log(next);
        },
        error => {
          console.log(error);
        },
        () => {
          console.log("success");
          this.reloadPage();
        }
      );
    }else{
      this.produtos.removeControl('id');
      console.log('cadastrar enviando: ', this.produtos.value);

      //SUBSCRIBE
      this.produtosService.cadastrarProduto(this.produtos.value).subscribe(
        next => {
          console.log("Inicio do subscribe next: ", next);
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
    this.produtos.reset();
    this.reloadPage();
  }
  onEdit(dados: any){
    this.produtos.patchValue({
      "id": dados.id,
      "descricao": dados.descricao,
      "marca": dados.marca,
      "valor": dados.valor
    });
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

  reloadPage(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/produtos/mostrar']);
  }
  



  /*BUTTONS E VALIDATIONS*/
  hideButton(){
    this.hideBtn = !this.hideBtn;
    if(this.hideBtn){
      this.router.navigate(['/produtos/mostrar']);
    }else{
      this.router.navigate(['/produtos']);
    }
  }

  verificaValidTouched(campo: string){
    //return !this.formulario.controls[campo].valid && this.formulario.controls[campo].touched;
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


}