import { TestBed } from '@angular/core/testing';

import { FoldersServiceService } from './folders-service.service';

describe('FolersServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FoldersServiceService = TestBed.get(FoldersServiceService);
    expect(service).toBeTruthy();
  });
});
