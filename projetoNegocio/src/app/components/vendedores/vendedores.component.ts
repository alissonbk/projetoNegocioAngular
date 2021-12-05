import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';
import { EstadoBr } from 'src/app/models/estado-br';
import { CepService } from 'src/app/services/cep.service';
import { DropdownService } from 'src/app/services/dropdown.service';
import { VendedoresService } from 'src/app/services/vendedores.service';
import { FormValidations } from '../shared/form-validations';

@Component({
  selector: 'app-vendedores',
  templateUrl: './vendedores.component.html',
  styleUrls: ['./vendedores.component.css']
})
export class VendedoresComponent implements OnInit {

  vendedores!: FormGroup;
  hideBtn!: boolean;
  todosEstados!: EstadoBr[];

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private vendedoresService: VendedoresService,
    private cepService: CepService,
    private dropdownService: DropdownService
    ) { }

  ngOnInit(): void {
    this.vendedores = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)] ],
      cpf: [null, [Validators.required, FormValidations.cpfValidator]],
      email: [null, [Validators.required, Validators.email]],
      senha: [null, [Validators.required, Validators.minLength(4)]],
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
    this.vendedores.get('endereco.cep')?.statusChanges
    .pipe(
      distinctUntilChanged(),
      //tap(value => console.log(value)),
      switchMap(status => status === 'VALID' ? this.cepService.consultaCEP(this.vendedores.get('endereco.cep')?.value)
        : EMPTY)
      ).subscribe(dados => dados ? this.populaFormCep(dados) : { });

    //Estados
    this.dropdownService.getEstadosBr().subscribe((estados: any) => {
      this.todosEstados = estados;
    })
  }


  onSubmit(){
    if(this.vendedores.get('id')?.value == null){
      this.vendedoresService.cadastrarVendedor(this.vendedores.value);
    }else{
      this.vendedoresService.editarVendedor(this.vendedores.value);
    }
    this.vendedores.reset();
  }

  onEdit(dados: any){
    this.vendedores.patchValue({
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
  }

  onDelete(dados: any){
    if(confirm(`Você tem certeza que deseja excluir o vendedor ${dados.nome}?`)){
      this.vendedoresService.excluirVendedor(dados.id);
    }
  }

  hideButton(){
    this.hideBtn = !this.hideBtn;
    if(this.hideBtn){
      this.route.navigate(['/vendedores/mostrar']);
    }else{
      this.route.navigate(['/vendedores']);
    }
    
  }

  verificaValidTouched(campo: string){
    //return !this.formulario.controls[campo].valid && this.formulario.controls[campo].touched;
    return (
      !this.vendedores.get(campo)?.valid &&
      (this.vendedores.get(campo)?.touched || this.vendedores.get(campo)?.dirty)
      );
  }


  cssErro(campo: string){
    return {
      'is-invalid': this.verificaValidTouched(campo)
    }
  }

  populaFormCep(dados: any){
    this.vendedores.patchValue({
      "endereco": {
        "rua": dados.logradouro,
        "bairro": dados.bairro,
        "cidade": dados.localidade,
        "estado": dados.uf
      }
    });
  }

}
