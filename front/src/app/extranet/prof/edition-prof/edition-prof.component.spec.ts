import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditionProfComponent } from './edition-prof.component';

describe('EditionProfComponent', () => {
  let component: EditionProfComponent;
  let fixture: ComponentFixture<EditionProfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditionProfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditionProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
