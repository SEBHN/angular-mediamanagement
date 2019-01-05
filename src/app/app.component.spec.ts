import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FileExplorerComponent} from './file-explorer/file-explorer.component';
import { CockpitComponent } from './cockpit/cockpit.component';
import { CreateFolderComponent } from './cockpit/modals/create-folder/create-folder.component';
import { ElementComponent } from './file-explorer/element/element.component';
import { ContextMenuModule } from 'ngx-contextmenu';
import { RenameFileComponent } from './cockpit/modals/rename-file/rename-file.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { AddTagComponent } from './cockpit/modals/add-tag/add-tag.component';
import { SidebarModule } from 'ng-sidebar';
import { OAuthModule } from 'angular-oauth2-oidc';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule,
        ContextMenuModule,
        HttpClientModule,
        RouterTestingModule,
        ModalModule.forRoot(),
        ContextMenuModule.forRoot({
          useBootstrap4: true,
        }),
        SidebarModule.forRoot(),
        OAuthModule.forRoot({
          resourceServer: {
              allowedUrls: ['http://localhost:8080', 'https://mvs-18-ws-spring-in-cloud.appspot.com'],
              sendAccessToken: true
          }
        }),
        FormsModule
      ],
      declarations: [
        AppComponent,
        CockpitComponent,
        FileExplorerComponent,
        CreateFolderComponent,
        ElementComponent,
        RenameFileComponent,
        AddTagComponent
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
