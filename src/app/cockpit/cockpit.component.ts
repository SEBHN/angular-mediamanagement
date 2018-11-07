import { Component, OnInit, TemplateRef, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { faHome,
         faCloudUploadAlt,
         faSignOutAlt,
         faArrowLeft,
         faFolderPlus } from '@fortawesome/free-solid-svg-icons';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Folder } from '../shared/folder.model';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  // Font Awesome Icons
  faHome = faHome;
  faCloudUploadAlt = faCloudUploadAlt;
  faSignOutAlt = faSignOutAlt;
  faArrowLeft = faArrowLeft;
  faFolderPlus = faFolderPlus;

  // Injected by ngx bootstrap
  modalRef: BsModalRef;
  private modalService: BsModalService;

  @Output() folderCreated = new EventEmitter<Folder>();

  constructor(modalService: BsModalService) {
    this.modalService = modalService;
  }
 
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit() {
  }

  onOpenCreateFolderDialog(folderName: string) {
    if (folderName !== '') {
      this.folderCreated.emit(new Folder(folderName, "/"));
    }
  }
}
