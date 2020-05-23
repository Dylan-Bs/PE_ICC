import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDesComptesComponent } from './gestion-des-comptes.component';

describe('GestionDesComptesComponent', () => {
  let component: GestionDesComptesComponent;
  let fixture: ComponentFixture<GestionDesComptesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionDesComptesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionDesComptesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
