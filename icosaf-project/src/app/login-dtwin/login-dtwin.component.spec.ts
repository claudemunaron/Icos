import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginDTWINComponent } from './login-dtwin.component';

describe('LoginDTWINComponent', () => {
  let component: LoginDTWINComponent;
  let fixture: ComponentFixture<LoginDTWINComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginDTWINComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginDTWINComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
