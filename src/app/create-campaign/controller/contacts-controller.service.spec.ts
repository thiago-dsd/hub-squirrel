import { TestBed } from '@angular/core/testing';
import { CreateCampaignControllerService } from './campaign-controller.service';



describe('CreateCampaignControllerService', () => {
  let service: CreateCampaignControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateCampaignControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
