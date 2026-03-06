import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroItemCardapio } from './cadastro-item-cardapio';

describe('CadastroItemCardapio', () => {
  let component: CadastroItemCardapio;
  let fixture: ComponentFixture<CadastroItemCardapio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroItemCardapio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroItemCardapio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
