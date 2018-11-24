import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FileExplorerComponent} from './file-explorer/file-explorer.component'
import { CockpitComponent } from './cockpit/cockpit.component'
import { CreateFolderComponent } from './cockpit/modals/create-folder/create-folder.component'
import { ElementComponent } from './file-explorer/element/element.component'
import { ContextMenuModule } from 'ngx-contextmenu';
import { RenameFileComponent } from './cockpit/modals/rename-file/rename-file.component'
import { HttpClientModule } from "@angular/common/http";
import { ModalModule } from 'ngx-bootstrap';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule, 
        ContextMenuModule, 
        HttpClientModule, 
        ModalModule.forRoot(), 
        ContextMenuModule.forRoot({
          useBootstrap4: true,
        })
      ],
      declarations: [
        AppComponent, 
        CockpitComponent, 
        FileExplorerComponent, 
        CreateFolderComponent, 
        ElementComponent, 
        RenameFileComponent
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
