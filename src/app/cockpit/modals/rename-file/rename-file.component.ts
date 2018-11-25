import {Component, TemplateRef, Input, ViewChild} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {Media} from "../../../shared/media.model";
import {UpdateMediaService} from "../../../services/update-media.service";

@Component({
    selector: 'app-rename-file',
    templateUrl: './rename-file.component.html'
})
export class RenameFileComponent {
    faEdit = faEdit;

    private file: Media;
    @ViewChild('renameFile') renameModal: TemplateRef<any>;

    // injeted by ngx-bootstrap
    modalRef: BsModalRef;
    private modalService: BsModalService;

    constructor(modalService: BsModalService, private updateMediaService: UpdateMediaService) {
        this.modalService = modalService;
    }

    openModal(selectedFile: Media) {
        this.file = selectedFile;
        this.modalRef = this.modalService.show(this.renameModal);
    }

    onRename(name: string): void {
        console.log(this.file);
        if (name.includes("." + this.file.fileExtension) == false) {
            name = name + "." + this.file.fileExtension;
            console.log(name);
        }
        this.file.name = name;
        this.updateMediaService.putMedia(this.file);
    }
}