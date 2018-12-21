import {Component, TemplateRef, ViewChild} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {Media} from '../../../shared/media.model';
import {UpdateMediaService} from '../../../services/update-media.service';
import { environment } from 'src/environments/environment';
import {FoldersServiceService} from '../../../services/folders-service.service';

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

    constructor(modalService: BsModalService, private updateMediaService: UpdateMediaService
        , private foldersService: FoldersServiceService) {
        this.modalService = modalService;
    }

    openModal(selectedFile: Media) {
        this.file = selectedFile;
        this.modalRef = this.modalService.show(this.renameModal);
    }

    onRename(name: string): void {
        if (this.file.isFolder) {
            this.foldersService.rename(this.file, environment.currentUserId, name);
        } else {
            if (name.includes('.' + this.file.fileExtension) === false) {
                name = name + '.' + this.file.fileExtension;
            }
            this.file.name = name;
            this.updateMediaService.putMedia(this.file, environment.currentUserId); // TODO: later user management
            this.modalRef.hide();
        }
    }
}
