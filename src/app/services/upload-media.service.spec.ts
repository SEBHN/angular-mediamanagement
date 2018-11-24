import { TestBed } from '@angular/core/testing';

import { UploadMediaService } from './upload-media.service';
import { HttpClientModule } from "@angular/common/http";

describe('UploadMediaService', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [
    HttpClientModule
  ],}));

  it('should be created', () => {
    const service: UploadMediaService = TestBed.get(UploadMediaService);
    expect(service).toBeTruthy();
  });
});
