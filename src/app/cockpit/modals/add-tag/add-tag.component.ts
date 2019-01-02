import {Component, TemplateRef, ViewChild} from '@angular/core';
import {faTag} from '@fortawesome/free-solid-svg-icons';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {Media} from '../../../shared/media.model';
import {UpdateMediaService} from '../../../services/update-media.service';
import {Tag} from '../../../shared/tag.model';
import {environment} from '../../../../environments/environment';
import { FileElement } from 'src/app/shared/file-element.model';

@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html'
})
export class AddTagComponent {

    faTag = faTag;

    private file: FileElement;
    @ViewChild('addTag') addTagModal: TemplateRef<any>;

    // injeted by ngx-bootstrap
    modalRef: BsModalRef;
    private modalService: BsModalService;

    constructor(modalService: BsModalService, private updateMediaService: UpdateMediaService) {
        this.modalService = modalService;
    }

    openModal(selectedFile: Media) {
        this.file = selectedFile;
        this.modalRef = this.modalService.show(this.addTagModal);
    }

    onAddTag(tagName: string): void {
      if (this.file.tags == null) {
          this.file.tags = new Array();
      }
      if (this.file.tags != null) {
          this.file.tags.push(new Tag(tagName));
          this.updateMediaService.putMedia(this.file as Media);
          this.modalRef.hide();
      }
    }
}
