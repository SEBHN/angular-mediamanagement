import { TestBed } from '@angular/core/testing';

import { FolersServiceService } from './folers-service.service';

describe('FolersServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FolersServiceService = TestBed.get(FolersServiceService);
    expect(service).toBeTruthy();
  });
});
