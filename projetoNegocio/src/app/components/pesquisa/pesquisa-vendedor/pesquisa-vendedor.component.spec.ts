import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisaVendedorComponent } from './pesquisa-vendedor.component';

describe('PesquisaVendedorComponent', () => {
  let component: PesquisaVendedorComponent;
  let fixture: ComponentFixture<PesquisaVendedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PesquisaVendedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PesquisaVendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
