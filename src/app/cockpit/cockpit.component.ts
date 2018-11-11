import {Component, OnInit, TemplateRef, ViewChild, ElementRef, Output, EventEmitter} from '@angular/core';
import {
    faHome,
    faCloudUploadAlt,
    faSignOutAlt,
    faArrowLeft,
    faFolderPlus
} from '@fortawesome/free-solid-svg-icons';

import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Media} from "../../Media";
import {Tag} from "../../Tag";
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

    fileName: string;
    selectedFile: File;
    postMediaUrl = "/users/{userID}/media/";
    postFileUrl = "/users/{userID}/media/{id}/upload";

    constructor(modalService: BsModalService, uploadMediaService: UploadMediaService) {
        this.modalService = modalService;
        this.uploadMediaService = uploadMediaService;
    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    onFileChanged(event) {
        this.selectedFile = event.target.files[0];
        this.fileName = this.selectedFile.name;
        this.uploadMediaService.selectedFile = this.selectedFile;
        if (this.uploadMediaService.selectedFile != null) {
            this.uploadMediaService.postMetaData(this.selectedFile);
        }
    }

    ngOnInit() {
    }

    onOpenCreateFolderDialog(folderName: string) {
        if (folderName !== '') {
            this.folderCreated.emit(new Folder(folderName, "/"));
        }
    }
}
