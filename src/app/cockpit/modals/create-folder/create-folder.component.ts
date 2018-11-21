import { Component, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { FilesService } from 'src/app/services/files-service.service';
import { Folder } from 'src/app/shared/folder.model';
import { AppComponent } from 'src/app/app.component';
 
@Component({
  selector: 'app-create-folder',
  templateUrl: './create-folder.component.html'
})
export class CreateFolderComponent {

  faFolderPlus = faFolderPlus;
  @ViewChild('createFolder') createFolderRef: TemplateRef<any>;

  // injeted by ngx-bootstrap
  modalRef: BsModalRef;
  private modalService: BsModalService;

  constructor(modalService: BsModalService, private filesService: FilesService) {
    this.modalService = modalService;
  }
 
  openModal() {
    this.modalRef = this.modalService.show(this.createFolderRef);
  }

  onCreateFolder(folderName: string): void {
    if (folderName !== '') {
      this.filesService.createFile(new Folder(folderName, '/',
        this.filesService.getCurrentRootId() ? this.filesService.getCurrentRootId() : 'root'));
    }
  }
}