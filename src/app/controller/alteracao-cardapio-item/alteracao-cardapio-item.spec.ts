import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlteracaoCardapioItem } from './alteracao-cardapio-item';

describe('AlteracaoCardapioItem', () => {
  let component: AlteracaoCardapioItem;
  let fixture: ComponentFixture<AlteracaoCardapioItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlteracaoCardapioItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlteracaoCardapioItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
