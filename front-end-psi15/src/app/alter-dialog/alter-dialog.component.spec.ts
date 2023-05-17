import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterDialogComponent } from './alter-dialog.component';

describe('AlterDialogComponent', () => {
  let component: AlterDialogComponent;
  let fixture: ComponentFixture<AlterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlterDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
