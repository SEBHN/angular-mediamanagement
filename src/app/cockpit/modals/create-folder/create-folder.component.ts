import { Component, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
 
@Component({
  selector: 'app-create-folder',
  templateUrl: './create-folder.component.html'
})
export class CreateFolderComponent {

  // injeted by ngx-bootstrap
  modalRef: BsModalRef;
  private modalService: BsModalService;

  constructor(modalService: BsModalService) {
    this.modalService = modalService;
  }
 
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}