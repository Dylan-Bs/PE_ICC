import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdpforgotDialogComponent } from './mdpforgot-dialog.component';

describe('MdpforgotDialogComponent', () => {
  let component: MdpforgotDialogComponent;
  let fixture: ComponentFixture<MdpforgotDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MdpforgotDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MdpforgotDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
