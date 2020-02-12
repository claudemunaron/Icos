import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WmsInsertDataComponent} from './wms-insert-data.component';

describe('WmsInsertDataComponent', () => {
  let component: WmsInsertDataComponent;
  let fixture: ComponentFixture<WmsInsertDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WmsInsertDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WmsInsertDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
