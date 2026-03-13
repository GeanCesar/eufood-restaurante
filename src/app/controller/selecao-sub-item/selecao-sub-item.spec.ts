import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecaoSubItem } from './selecao-sub-item';

describe('SelecaoSubItem', () => {
  let component: SelecaoSubItem;
  let fixture: ComponentFixture<SelecaoSubItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelecaoSubItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelecaoSubItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
