import { TestBed } from '@angular/core/testing';

import { UpdateMediaService } from './update-media.service';

describe('UpdateMediaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdateMediaService = TestBed.get(UpdateMediaService);
    expect(service).toBeTruthy();
  });
});
