import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSelecaoItem } from './modal-selecao-item';

describe('SelecaoItemModal', () => {
  let component: ModalSelecaoItem;
  let fixture: ComponentFixture<ModalSelecaoItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalSelecaoItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalSelecaoItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
