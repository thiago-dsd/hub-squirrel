import { TestBed } from '@angular/core/testing';
import { SettingsControllerService } from './settings-controller.service';


describe('ContactControllerService', () => {
  let service: SettingsControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingsControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
