import { TestBed } from '@angular/core/testing';

import { DeleteMediaService } from './delete-media.service';

describe('DeleteMediaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeleteMediaService = TestBed.get(DeleteMediaService);
    expect(service).toBeTruthy();
  });
});
