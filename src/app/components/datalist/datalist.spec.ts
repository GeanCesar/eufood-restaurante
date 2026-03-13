import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Datalist } from './datalist';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

describe('Datalist', () => {
  let component: Datalist;
  let fixture: ComponentFixture<Datalist>;

  beforeEach(async () => {
    fixture = TestBed.configureTestingModule({imports: [NgSelectModule, FormsModule, Datalist]}).createComponent(Datalist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
