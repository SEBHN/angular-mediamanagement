import { TestBed } from '@angular/core/testing';

import { FoldersService } from './folders.service';
import { HttpClientModule } from '@angular/common/http';

describe('FolersServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [
    HttpClientModule
  ]}));

  it('should be created', () => {
    const service: FoldersService = TestBed.get(FoldersService);
    expect(service).toBeTruthy();
  });
});
