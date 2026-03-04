import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeletarRestaurante } from './modal-deletar-restaurante';

describe('ModalDeletarRestaurante', () => {
  let component: ModalDeletarRestaurante;
  let fixture: ComponentFixture<ModalDeletarRestaurante>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDeletarRestaurante]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDeletarRestaurante);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
