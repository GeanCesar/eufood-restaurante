import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Datalist } from './datalist';

describe('Datalist', () => {
  let component: Datalist;
  let fixture: ComponentFixture<Datalist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Datalist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Datalist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
