import { TestBed } from '@angular/core/testing';

import { RefreshGatewayService } from './refresh-gateway.service';

describe('RefreshGatewayService', () => {
  let service: RefreshGatewayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefreshGatewayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
