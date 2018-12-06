import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileExplorerComponent } from './file-explorer.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ElementComponent } from './element/element.component';
import { ContextMenuModule } from 'ngx-contextmenu';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalModule } from 'ngx-bootstrap';
import { RenameFileComponent } from '../cockpit/modals/rename-file/rename-file.component';

describe('RegisterComponent', () => {
  let component: FileExplorerComponent;
  let fixture: ComponentFixture<FileExplorerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileExplorerComponent, ElementComponent, RenameFileComponent ],
      imports: [RouterTestingModule, ContextMenuModule, FontAwesomeModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
