import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';


import { EstadoBr } from 'src/app/shared/models/estado-br';
import { CepService } from 'src/app/core/services/cep.service';
import { ClientesService } from 'src/app/core/services/clientes.service';
import { DropdownService } from 'src/app/core/services/dropdown.service';
import { FormValidations } from '../../shared/components/form-validations';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Cliente } from 'src/app/shared/models/cliente';
declare let alertify: any;

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes!: FormGroup;
  hideBtn!: boolean;
  todosEstados!: EstadoBr[];
  paramId!: any;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private clientesService: ClientesService,
    private cepService: CepService,
    private dropdownService: DropdownService,
    private cf: ChangeDetectorRef
    ) { }

  //Lifecyclehooks
  ngOnInit(): void {
    // Form
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
    //API Viacep
    this.clientes.get('endereco.cep')?.statusChanges
    .pipe(
      distinctUntilChanged(),
      switchMap(status => status === 'VALID' ? this.cepService.consultaCEP(this.clientes.get('endereco.cep')?.value)
        : EMPTY))
    .subscribe(dados => dados ? this.populaFormCep(dados) : { });

    //Estados
    this.dropdownService.getEstadosBr().subscribe((estado: any) =>{
      this.todosEstados = estado;
    });

    //Path param
    this.paramId = this.route.snapshot.queryParamMap.get('id');
    if(this.paramId != null){
      this.getById(this.paramId);
    }

    this.cf.detectChanges();
  }


  //Funções principais
  onSubmit(){
    let cliente = new Cliente(
      this.clientes.get('nome')?.value, 
      this.clientes.get('cpf')?.value, 
      this.clientes.get('email')?.value, 
      this.clientes.get('endereco')?.value, 
      this.clientes.get('id')?.value
    );
    if(cliente.id == null){
      cliente.id = undefined;
      this.clientesService.cadastrarCliente(cliente);
    }else{
      this.clientesService.editarCliente(cliente);
    }
    this.clientes.reset();
    this.reloadPage();
  }

  onEdit(dados: Cliente){
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
    this.loading = false;
    window.scroll(0, -300);
  }

  onDelete(dados: Cliente){
    alertify.confirm(`Você tem certeza que deseja excluir o cliente ${dados.nome}?`, () => {
      this.clientesService.excluirCliente(dados);
      this.reloadPage();
    })
  }

  //Utils
  //getById temporario, antes da API
  getById(id: number){
    this.loading = true;
    this.clientesService.getClientes().subscribe((clientes: any) => {
      for(let cliente of clientes){
        if(cliente.id == id){
          this.onEdit(cliente);
        }
      }
    });
  }

  reloadPage(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/clientes/mostrar']);
  }
  
  hideButton(){
    this.hideBtn = !this.hideBtn;
    if(this.hideBtn){
      this.router.navigate(['/clientes/mostrar']);
    }else{
      this.router.navigate(['/clientes']);
    }
  }

  verificaValidTouched(campo: string){
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
