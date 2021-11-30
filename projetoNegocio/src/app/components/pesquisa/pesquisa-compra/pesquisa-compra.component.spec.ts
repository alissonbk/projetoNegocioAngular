import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisaCompraComponent } from './pesquisa-compra.component';

describe('PesquisaCompraComponent', () => {
  let component: PesquisaCompraComponent;
  let fixture: ComponentFixture<PesquisaCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PesquisaCompraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PesquisaCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
