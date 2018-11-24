import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CockpitComponent } from './cockpit.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CreateFolderComponent } from './modals/create-folder/create-folder.component';
import { HttpClientModule } from "@angular/common/http";

describe('CockpitComponent', () => {
  let component: CockpitComponent;
  let fixture: ComponentFixture<CockpitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CockpitComponent,  CreateFolderComponent],
      imports: [FontAwesomeModule, HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CockpitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
