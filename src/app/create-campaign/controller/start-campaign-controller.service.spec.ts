import { TestBed } from '@angular/core/testing';
import { StartCampaignControllerService } from './start-campaign-controller.service';



describe('StartCampaignControllerService', () => {
  let service: StartCampaignControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StartCampaignControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
