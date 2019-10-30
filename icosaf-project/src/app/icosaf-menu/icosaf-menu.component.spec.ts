import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcosafMenuComponent } from './icosaf-menu.component';

describe('IcosafMenuComponent', () => {
  let component: IcosafMenuComponent;
  let fixture: ComponentFixture<IcosafMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcosafMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcosafMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
