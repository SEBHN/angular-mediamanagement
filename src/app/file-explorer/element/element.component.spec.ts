import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementComponent } from './element.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Media } from '../../shared/media.model';
import { Folder } from '../../shared/folder.model';

describe('ElementComponent', () => {
  let component: ElementComponent;
  let fixture: ComponentFixture<ElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [ ElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onNavigate()', () => {
      const file = new Media('anId', 'aName', 'aFileId', '.txt', '/', '1337');
      const folder = new Folder('aFolder', '/im/in/here/send/help', '1337');

      it('should emit navigatedToFile with media', (done) => {
          component.fileDownloaded.subscribe(subscribedFile => {
              expect(subscribedFile).toBe(file);
              done();
          });
          component.navigated.subscribe(() => fail('Is not a folder'));

          component.onDoubleClick(file);
      });

      it('should emit navigated with folder', (done) => {
          component.navigated.subscribe(subscribedFolder => {
              expect(subscribedFolder).toBe(folder);
              done();
          });
          component.fileDownloaded.subscribe(() => fail('Is not a file'));

          component.onDoubleClick(folder);
      });
  });
});
