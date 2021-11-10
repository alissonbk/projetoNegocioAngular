import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarProdutosComponent } from './mostrar-produtos.component';

describe('MostrarProdutosComponent', () => {
  let component: MostrarProdutosComponent;
  let fixture: ComponentFixture<MostrarProdutosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarProdutosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
