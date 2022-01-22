import { Component, Inject, OnInit, forwardRef } from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';


import { Vendedor } from 'src/app/shared/models/vendedor';
import { VendedoresService } from 'src/app/core/services/vendedores.service';
import { VendedoresComponent } from '../vendedores.component';
declare let alertify: any;


@Component({
  selector: 'app-mostrar-vendedores',
  templateUrl: './mostrar-vendedores.component.html',
  styleUrls: ['./mostrar-vendedores.component.css']
})
export class MostrarVendedoresComponent implements OnInit {

  vendedores$!: Observable<Vendedor[]>;
  error$ = new Subject<boolean>();
  dataLoaded!: boolean;
  firstExecution!: boolean;
  constructor(
    private vendedoresService: VendedoresService,
    @Inject (forwardRef(() => VendedoresComponent)) private _parent: VendedoresComponent
    ) { }

  //Lifecyclehooks
  ngOnInit(): void {
    this.loadVendedores();
    this._parent.hideBtn = true;
    this.dataLoaded = false;
    this.firstExecution = true;
  }

  ngAfterViewInit(): void {
    window.scroll(0, 500);
  }

  ngAfterViewChecked(): void {
    if(this.dataLoaded && this.firstExecution){
      window.scroll(0, 1150);
      this.firstExecution = false;
    }
  }
  
  //Functions
  loadVendedores(){
    this.vendedores$ = this.vendedoresService.getVendedores().pipe(
      catchError(error => {
        console.log(error);
        this.error$.next(true);
        // ALERT
        alertify.dismissAll();
        alertify.set('notifier','delay', 2);
        alertify.set('notifier', 'position', 'top-center');
        alertify.error('Falha em carregar vendedores!');
        return EMPTY;
      })
    );
  }

  onEdit(dados: Vendedor){
    this._parent.onEdit(dados);
  }

  onDelete(dados: Vendedor){
    this._parent.onDelete(dados);
  }

  changeLoaded(){
    this.dataLoaded = true;
  }

}
