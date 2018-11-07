import { Component, OnInit, TemplateRef } from '@angular/core';
import { faHome,
         faCloudUploadAlt,
         faSignOutAlt,
         faArrowLeft,
         faFolderPlus } from '@fortawesome/free-solid-svg-icons';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

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

  modalRef: BsModalRef;
  private modalService: BsModalService;

  constructor(modalService: BsModalService) {
    this.modalService = modalService;
  }
 
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit() {
  }

}
