import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';


import { EstadoBr } from 'src/app/shared/models/estado-br';
import { CepService } from 'src/app/core/services/cep.service';
import { DropdownService } from 'src/app/core/services/dropdown.service';
import { VendedoresService } from 'src/app/core/services/vendedores.service';
import { FormValidations } from '../../shared/components/form-validations';
import { Vendedor } from 'src/app/shared/models/vendedor';
declare let alertify: any;

@Component({
  selector: 'app-vendedores',
  templateUrl: './vendedores.component.html',
  styleUrls: ['./vendedores.component.css']
})
export class VendedoresComponent implements OnInit {

  formVendedor!: FormGroup;
  hideBtn!: boolean;
  todosEstados!: EstadoBr[];
  paramId!: any;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private vendedoresService: VendedoresService,
    private cepService: CepService,
    private dropdownService: DropdownService,
    private cf: ChangeDetectorRef
    ) { }

  //Lifecyclehooks
  ngOnInit(): void {
    this.hideBtn = false;
    this.formVendedor = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)] ],
      cpf: [null, [Validators.required, FormValidations.cpfValidator]],
      email: [null, [Validators.required, Validators.email]],
      senha: [null, [Validators.required, Validators.minLength(4)]],
      confirmarSenha: [null, [Validators.required, FormValidations.equalsTo('senha')]],
      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, FormValidations.cepValidator]],
        numero: [null, Validators.required],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      })
    })

    //VIACEP
    this.formVendedor.get('endereco.cep')?.statusChanges
    .pipe(
      distinctUntilChanged(),
      //tap(value => console.log(value)),
      switchMap(status => status === 'VALID' ? this.cepService.consultaCEP(this.formVendedor.get('endereco.cep')?.value)
        : EMPTY)
      ).subscribe(dados => dados ? this.populaFormCep(dados) : { });

    //Estados
    this.dropdownService.getEstadosBr().subscribe((estados: any) => {
      this.todosEstados = estados;
    })

    //Path param
    this.paramId = this.route.snapshot.queryParamMap.get('id');
    if(this.paramId != null){
      this.getById(this.paramId);
    }

    this.cf.detectChanges();
  }

  //Fun????es principais
  onSubmit(){
    let vendedor: Vendedor = new Vendedor(
      this.formVendedor.get('nome')?.value,
      this.formVendedor.get('cpf')?.value,
      this.formVendedor.get('email')?.value,
      this.formVendedor.get('senha')?.value,
      this.formVendedor.get('endereco')?.value,
      this.formVendedor.get('id')?.value,
    ); 
    if(vendedor.id != null){
      this.vendedoresService.editarVendedor(vendedor);
    }else{
      vendedor.id = undefined;
      this.vendedoresService.cadastrarVendedor(vendedor);
    }
    this.formVendedor.reset();
  }

  onEdit(dados: Vendedor){
    this.formVendedor.patchValue({
      "id": dados.id,
      "nome": dados.nome,
      "cpf": dados.cpf,
      "email": dados.email,
      "endereco": {
        "cep": dados.endereco.cep,
        "numero": dados.endereco.numero,
        "rua": dados.endereco.rua,
        "bairro": dados.endereco.bairro,
        "cidade": dados.endereco.cidade,
        "estado": dados.endereco.estado
    }
    });
    this.loading = false;
    window.scroll(0, -300);
  }

  onDelete(dados: Vendedor){
    alertify.confirm(`Voc?? tem certeza que deseja excluir o vendedor ${dados.nome}?`, () => {
      this.vendedoresService.excluirVendedor(dados);
    })
    
  }

  //Utils...
  //getById temporario
  getById(id: number){
    this.loading = true;
    this.vendedoresService.getVendedores().subscribe((vendedores: any) => {
      for(let vendedor of vendedores){
        if(vendedor.id == id){
          this.onEdit(vendedor);
        }
      }
    });
  }

  hideButton(){
    this.hideBtn = !this.hideBtn;
    if(this.hideBtn){
      this.router.navigate(['/vendedores/mostrar']);
    }else{
      this.router.navigate(['/vendedores']);
    }
    
  }

  verificaValidTouched(campo: string){
    return (
      !this.formVendedor.get(campo)?.valid &&
      (this.formVendedor.get(campo)?.touched || this.formVendedor.get(campo)?.dirty)
      );
  }

  cssErro(campo: string){
    return {
      'is-invalid': this.verificaValidTouched(campo)
    }
  }

  populaFormCep(dados: any){
    this.formVendedor.patchValue({
      "endereco": {
        "rua": dados.logradouro,
        "bairro": dados.bairro,
        "cidade": dados.localidade,
        "estado": dados.uf
      }
    });
  }
}
