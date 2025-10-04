import { TestBed } from '@angular/core/testing';

import { Supportticketservice } from './supportticketservice';

describe('Supportticketservice', () => {
  let service: Supportticketservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Supportticketservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
