import { TestBed } from '@angular/core/testing';

import { DownloadMediaService } from './download-media.service';
import { HttpClientModule } from '@angular/common/http';

describe('DownloadMediaService', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [
    HttpClientModule]}));

  it('should be created', () => {
    const service: DownloadMediaService = TestBed.get(DownloadMediaService);
    expect(service).toBeTruthy();
  });
});
