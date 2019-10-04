import {TestBed} from '@angular/core/testing';

import {AgvServiceService} from './agv-service.service';

describe('AgvServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgvServiceService = TestBed.get(AgvServiceService);
    expect(service).toBeTruthy();
  });
});
