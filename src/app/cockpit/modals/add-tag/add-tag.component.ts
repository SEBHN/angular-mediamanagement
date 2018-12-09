import {Component, TemplateRef, ViewChild} from '@angular/core';
import {faEdit, faTag} from "@fortawesome/free-solid-svg-icons";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {Media} from "../../../shared/media.model";
import {UpdateMediaService} from "../../../services/update-media.service";
import {Tag} from "../../../shared/tag.model";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html'
})
export class AddTagComponent {

    faTag = faTag;

    private file: Media;
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

    onAddTag(newTag: string): void {
      if(this.file.tags == null){
          this.file.tags = new Array(Tag);
          this.file.tags.pop();
      }
      if(this.file.tags != null){
          this.file.tags.push(new Tag(newTag));
          console.log(this.file);
          this.updateMediaService.putMedia(this.file, environment.currentUserId);
          this.modalRef.hide();
      }
    }
}
