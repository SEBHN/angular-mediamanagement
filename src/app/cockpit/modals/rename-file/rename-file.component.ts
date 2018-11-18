import { Component, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FileElement } from 'src/app/shared/file-element.model';
 
@Component({
  selector: 'app-rename-file',
  templateUrl: '../../cockpit.component.html'
})
export class RenameFileComponent {

  private file: FileElement;

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