import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemPedidos } from './listagem-pedidos';

describe('ListagemPedidos', () => {
  let component: ListagemPedidos;
  let fixture: ComponentFixture<ListagemPedidos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListagemPedidos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListagemPedidos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
