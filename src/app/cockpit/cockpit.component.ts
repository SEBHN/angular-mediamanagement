import {Component, OnInit, TemplateRef, ViewChild, ElementRef, Output, EventEmitter} from '@angular/core';
import {
    faHome,
    faCloudUploadAlt,
    faSignOutAlt,
    faArrowLeft,
    faFolderPlus
} from '@fortawesome/free-solid-svg-icons';

import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {Folder} from '../shared/folder.model';
import {UploadMediaService} from "./upload-media.service";

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
    private uploadMediaService: UploadMediaService;

    @Output() folderCreated = new EventEmitter<Folder>();

    selectedFile: File;

    constructor(modalService: BsModalService, uploadMediaService: UploadMediaService) {
        this.modalService = modalService;
        this.uploadMediaService = uploadMediaService;
    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    // if the user selects a file this method will call
    onFileChanged(event) {
        this.selectedFile = event.target.files[0];
        this.uploadMediaService.selectedFile = this.selectedFile;
        this.uploadMediaService.postMetaData(this.selectedFile);
    }

    ngOnInit() {
    }

    onOpenCreateFolderDialog(folderName: string) {
        if (folderName !== '') {
            this.folderCreated.emit(new Folder(folderName, "/"));
        }
    }
}
