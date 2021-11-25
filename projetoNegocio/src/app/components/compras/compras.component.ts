import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Compra } from 'src/app/models/compra';
import { ComprasService } from 'src/app/services/compras.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {

  compras!: FormGroup;
  hideBtn!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private comprasService: ComprasService
    ) { }

  ngOnInit(): void {
    this.compras = this.formBuilder.group({
      cliente: [null, Validators.required],
      produto: [null, Validators.required],
      vendedor: [null, Validators.required]
    })
  }


  onSubmit(){
    console.log("form compras:", this.compras);
    this.comprasService.setCompras(this.compras.value);
  }


  hideButton(){
    this.hideBtn = !this.hideBtn;
    if(this.hideBtn){
      this.route.navigate(['/compras/mostrar']);
    }else{
      this.route.navigate(['/compras']);
    }
    
  }

}
