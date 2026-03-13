import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSubitemCardapio } from './card-subitem-cardapio';

describe('CardSubitemCardapio', () => {
  let component: CardSubitemCardapio;
  let fixture: ComponentFixture<CardSubitemCardapio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardSubitemCardapio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardSubitemCardapio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
