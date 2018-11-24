import { TestBed } from '@angular/core/testing';

import { GetMediaService } from './get-media.service';
import { HttpClientModule } from "@angular/common/http";

describe('GetMediaService', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [
    HttpClientModule
  ],}));

  it('should be created', () => {
    const service: GetMediaService = TestBed.get(GetMediaService);
    expect(service).toBeTruthy();
  });
});
