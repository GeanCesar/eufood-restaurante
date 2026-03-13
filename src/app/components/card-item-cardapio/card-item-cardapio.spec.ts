import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardItemCardapio } from './card-item-cardapio';

describe('CardItemCardapio', () => {
  let component: CardItemCardapio;
  let fixture: ComponentFixture<CardItemCardapio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardItemCardapio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardItemCardapio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
