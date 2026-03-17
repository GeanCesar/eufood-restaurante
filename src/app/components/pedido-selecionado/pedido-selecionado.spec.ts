import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoSelecionado } from './pedido-selecionado';

describe('PedidoSelecionado', () => {
  let component: PedidoSelecionado;
  let fixture: ComponentFixture<PedidoSelecionado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidoSelecionado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidoSelecionado);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
