import { TestBed } from '@angular/core/testing';

import { FoldersServiceService } from './folders-service.service';
import { HttpClientModule } from '@angular/common/http';

describe('FolersServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [
    HttpClientModule
  ]}));

  it('should be created', () => {
    const service: FoldersServiceService = TestBed.get(FoldersServiceService);
    expect(service).toBeTruthy();
  });
});
