import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WmsGetDataComponent} from './wms-get-data.component';

describe('WmsGetDataComponent', () => {
  let component: WmsGetDataComponent;
  let fixture: ComponentFixture<WmsGetDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WmsGetDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WmsGetDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
