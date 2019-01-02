import { TestBed } from '@angular/core/testing';

import { UploadMediaService } from './upload-media.service';
import { HttpClientModule } from '@angular/common/http';

describe('UploadMediaService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [ HttpClientModule], });
  });

  it('should be created', () => {
    const service: UploadMediaService = TestBed.get(UploadMediaService);
    expect(service).toBeTruthy();
  });

  describe('getMediaData()', () => {

    it('Should create with currentFolder', () => {
      const path = '/bla/';
      const service: UploadMediaService = TestBed.get(UploadMediaService);
      const data = new Blob(['Hello Stranger'], { type: 'text/plain' });
      const strangerFile = new File([data], 'stranger.txt');
      const media = service.getMediaData(strangerFile, path);
      expect(media.getFilePath()).toBe(path);
    });

  });
});
