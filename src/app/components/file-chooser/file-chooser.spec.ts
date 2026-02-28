import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileChooser } from './file-chooser';

describe('FileChooser', () => {
  let component: FileChooser;
  let fixture: ComponentFixture<FileChooser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileChooser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileChooser);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
