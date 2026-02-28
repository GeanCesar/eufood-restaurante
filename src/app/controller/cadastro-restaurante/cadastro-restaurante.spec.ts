import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroRestaurante } from './cadastro-restaurante';

describe('CadastroRestaurante', () => {
  let component: CadastroRestaurante;
  let fixture: ComponentFixture<CadastroRestaurante>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroRestaurante]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroRestaurante);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
