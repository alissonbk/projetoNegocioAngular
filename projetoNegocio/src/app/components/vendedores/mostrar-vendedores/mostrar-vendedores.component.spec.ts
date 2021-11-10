import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarVendedoresComponent } from './mostrar-vendedores.component';

describe('MostrarVendedoresComponent', () => {
  let component: MostrarVendedoresComponent;
  let fixture: ComponentFixture<MostrarVendedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarVendedoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarVendedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
