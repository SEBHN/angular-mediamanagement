import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('UsersService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [ HttpClientModule, RouterTestingModule] });
  });

  it('should be created', () => {
     const service: UsersService = TestBed.get(UsersService);
     expect(service).toBeTruthy();
  });
});
