import { TestBed } from '@angular/core/testing';
import { AuthControllerService } from './auth-controller.service';


describe('AuthControllerService', () => {
  let service: AuthControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
