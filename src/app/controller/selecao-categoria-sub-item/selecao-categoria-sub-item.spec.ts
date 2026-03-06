import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecaoCategoriaSubItem } from './selecao-categoria-sub-item';

describe('SelecaoCategoriaSubItem', () => {
  let component: SelecaoCategoriaSubItem;
  let fixture: ComponentFixture<SelecaoCategoriaSubItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelecaoCategoriaSubItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelecaoCategoriaSubItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
