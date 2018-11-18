import { Component, TemplateRef, Input, ViewChild } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FileElement } from 'src/app/shared/file-element.model';
 
@Component({
  selector: 'app-rename-file',
  templateUrl: './rename-file.component.html'
})
export class RenameFileComponent {
  faEdit = faEdit;

   private file: FileElement;
   @ViewChild('renameFile') renameModal: TemplateRef<any>;

  // injeted by ngx-bootstrap
  modalRef: BsModalRef;
  private modalService: BsModalService;

  constructor(modalService: BsModalService) {
    this.modalService = modalService;
  }
 
  openModal(selectedFile: FileElement) {
    this.file = selectedFile;
    this.modalRef = this.modalService.show(this.renameModal);
  }
}