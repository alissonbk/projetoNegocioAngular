import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';


import { EstadoBr } from 'src/app/shared/models/estado-br';
import { CepService } from 'src/app/core/services/cep.service';
import { ClientesService } from 'src/app/core/services/clientes.service';
import { DropdownService } from 'src/app/core/services/dropdown.service';
import { FormValidations } from '../../shared/components/form-validations';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes!: FormGroup;
  hideBtn!: boolean;
  todosEstados!: EstadoBr[];
  xd!: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private clientesService: ClientesService,
    private cepService: CepService,
    private dropdownService: DropdownService
    ) { }

  ngOnInit(): void {
    // FORMULARIO
    this.clientes = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      cpf: [null, [Validators.required, FormValidations.cpfValidator] ],
      email: [null, [Validators.required, Validators.email]],
      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, FormValidations.cepValidator]],
        numero: [null, Validators.required],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      })
    });
    //VIACEP
    this.clientes.get('endereco.cep')?.statusChanges
    .pipe(
      distinctUntilChanged(),
      //tap(value => console.log(value)),
      switchMap(status => status === 'VALID' ? this.cepService.consultaCEP(this.clientes.get('endereco.cep')?.value)
        : EMPTY)
      ).subscribe(dados => dados ? this.populaFormCep(dados) : { });

    //Estados
    this.dropdownService.getEstadosBr().subscribe((estado: any) =>{
      this.todosEstados = estado;
    })
    //path param
    console.log(this.route.snapshot.queryParamMap.get('cep'));
    this.clientes.get('id')?.setValue(this.route.snapshot.queryParamMap.get('id'));
    this.clientes.get('nome')?.setValue(this.route.snapshot.queryParamMap.get('nome'));
    this.clientes.get('email')?.setValue(this.route.snapshot.queryParamMap.get('email'));
    this.clientes.get('cpf')?.setValue(this.route.snapshot.queryParamMap.get('cpf'));
    this.clientes.get('endereco.cep')?.setValue(this.route.snapshot.queryParamMap.get('cep'));
    this.clientes.get('endereco.numero')?.setValue(this.route.snapshot.queryParamMap.get('numero'));
    this.clientes.get('endereco.rua')?.setValue(this.route.snapshot.queryParamMap.get('rua'));
    this.clientes.get('endereco.bairro')?.setValue(this.route.snapshot.queryParamMap.get('bairro'));
    this.clientes.get('endereco.cidade')?.setValue(this.route.snapshot.queryParamMap.get('cidade'));
    this.clientes.get('endereco.estado')?.setValue(this.route.snapshot.queryParamMap.get('estado'));
    // console.log(this.clientes.get('id')?.value);
  }


  onSubmit(){
    if(this.clientes.get('id')?.value == null){
      this.clientesService.cadastrarCliente(this.clientes.value);
    }else{
      this.clientesService.editarCliente(this.clientes.value);
    }
    
    this.clientes.reset();
  }

  onEdit(dados: any){
    this.clientes.patchValue({
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
    window.scroll(0, -300);
  }

  onDelete(dados: any){
    if(confirm(`Você tem certeza que deseja excluir o cliente ${dados.nome}?`)){
      this.clientesService.excluirCliente(dados.id);
    }
  }



  hideButton(){
    this.hideBtn = !this.hideBtn;
    if(this.hideBtn){
      this.router.navigate(['/clientes/mostrar']);
    }else{
      this.router.navigate(['/clientes']);
    }
  }

  // VALIDATION FUNCTIONS

  verificaValidTouched(campo: string){
    //return !this.formulario.controls[campo].valid && this.formulario.controls[campo].touched;
    return (
      !this.clientes.get(campo)?.valid &&
      (this.clientes.get(campo)?.touched || this.clientes.get(campo)?.dirty)
      );
  }


  cssErro(campo: string){
    return {
      'is-invalid': this.verificaValidTouched(campo)
    }
  }


  populaFormCep(dados: any){
    this.clientes.patchValue({
      "endereco": {
        "rua": dados.logradouro,
        "bairro": dados.bairro,
        "cidade": dados.localidade,
        "estado": dados.uf
      }
    });
  }

}
