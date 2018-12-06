import { TestBed } from '@angular/core/testing';

import { UpdateMediaService } from './update-media.service';
import { HttpClientModule } from '@angular/common/http';

describe('UpdateMediaService', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [
    HttpClientModule
  ],}));

  it('should be created', () => {
    const service: UpdateMediaService = TestBed.get(UpdateMediaService);
    expect(service).toBeTruthy();
  });
});
