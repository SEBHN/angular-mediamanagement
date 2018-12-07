import { TestBed } from '@angular/core/testing';

import { DeleteMediaService } from './delete-media.service';
import { HttpClientModule } from '@angular/common/http';

describe('DeleteMediaService', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [
    HttpClientModule
  ],}));

  it('should be created', () => {
    const service: DeleteMediaService = TestBed.get(DeleteMediaService);
    expect(service).toBeTruthy();
  });
});
