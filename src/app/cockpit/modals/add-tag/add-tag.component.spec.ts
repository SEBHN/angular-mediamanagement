import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FileExplorerComponent } from '../../../file-explorer/file-explorer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddTagComponent } from './add-tag.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule, BsModalService } from 'ngx-bootstrap';

describe('AddTagComponent', () => {
  let component: AddTagComponent;
  let fixture: ComponentFixture<AddTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTagComponent ],
      imports: [ HttpClientModule, FontAwesomeModule, ModalModule.forRoot() ],
      providers: [BsModalService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
