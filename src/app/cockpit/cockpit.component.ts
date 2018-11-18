import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {
    faHome,
    faCloudUploadAlt,
    faSignOutAlt,
    faArrowLeft,
    faFolderPlus
} from '@fortawesome/free-solid-svg-icons';

import {Folder} from '../shared/folder.model';
import {UploadMediaService} from "../services/upload-media.service";
import { FilesService } from '../services/files-service.service';

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

    // navbar toggle
    private navbarOpen: boolean = false;

    private uploadMediaService: UploadMediaService;
    private fileService: FilesService;

    @Output() folderCreated = new EventEmitter<Folder>();

    selectedFile: File;

    constructor(uploadMediaService: UploadMediaService,
                fileService: FilesService) {
        this.uploadMediaService = uploadMediaService;
        this.fileService = fileService;
    }

    toggleNavbar(): void {
        this.navbarOpen = !this.navbarOpen;
    }

    // if the user selects a file this method will call
    onFileChanged(event): void {
        this.selectedFile = event.target.files[0];
        this.uploadMediaService.selectedFile = this.selectedFile;
        this.uploadMediaService.postMetaData(this.selectedFile);
    }

    ngOnInit() {
    }

    onOpenCreateFolderDialog(folderName: string): void {
        if (folderName !== '') {
            this.fileService.createFolder(new Folder(folderName, "/"));
        }
    }
}
