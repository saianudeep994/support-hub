import { TestBed } from '@angular/core/testing';

import { Myticketservice } from './myticketservice';

describe('Myticketservice', () => {
  let service: Myticketservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Myticketservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
