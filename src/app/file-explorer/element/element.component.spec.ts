import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementComponent } from './element.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Media } from '../../shared/media.model';
import { Folder } from '../../shared/folder.model';
import { FilesService } from 'src/app/services/files-service.service';

describe('ElementComponent', () => {
  let component: ElementComponent;
  let fixture: ComponentFixture<ElementComponent>;
  let filesService: FilesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [ ElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementComponent);
    // add service instance for testing
    TestBed.configureTestingModule({
      providers: [{
        useValue: FilesService
      }]
    }).compileComponents();
    component = fixture.componentInstance;
    filesService = TestBed.get(FilesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onDoubleClick()', () => {
      const file = new Media('anId', 'aName', 'aFileId', '.txt', '/', '1337');
      const folder = new Folder('aFolder', '/im/in/here/send/help', '1337');

      it('should emit navigatedToFile with media', (done) => {
          filesService.fileDownloaded.subscribe(subscribedFile => {
              expect(subscribedFile).toBe(file);
              done();
          });
          filesService.navigated.subscribe(() => fail('Is not a folder'));

          component.onDoubleClick(file);
      });

      it('should emit navigated with folder', (done) => {
          filesService.navigated.subscribe(subscribedFolder => {
              expect(subscribedFolder).toBe(folder);
              done();
          });
          filesService.fileDownloaded.subscribe(() => fail('Is not a file'));

          component.onDoubleClick(folder);
      });
  });
});
