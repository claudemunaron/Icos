import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingsAgvComponent} from './settings-agv.component';

describe('SettingsAgvComponent', () => {
  let component: SettingsAgvComponent;
  let fixture: ComponentFixture<SettingsAgvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAgvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAgvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
