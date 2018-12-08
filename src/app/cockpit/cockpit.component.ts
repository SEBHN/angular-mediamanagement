import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {
    faHome,
    faCloudUploadAlt,
    faSignOutAlt,
    faArrowLeft,
    faFolderPlus
} from '@fortawesome/free-solid-svg-icons';

import {Folder} from '../shared/folder.model';
import {UploadMediaService} from '../services/upload-media.service';
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
    private navbarOpen = false;

    @Output() folderCreated = new EventEmitter<Folder>();

    selectedFile: File;

    constructor(private uploadMediaService: UploadMediaService, private filesService: FilesService) {
        this.uploadMediaService = uploadMediaService;
    }

    toggleNavbar(): void {
        this.navbarOpen = !this.navbarOpen;
    }

    // if the user selects a file this method will call
    onFileChanged(event) {
        this.selectedFile = event.target.files[0];
        this.uploadMediaService.selectedFile = this.selectedFile;
        this.uploadMediaService.postMetaData(this.selectedFile);
    }

    ngOnInit() {
    }

    isNavbarOpen() {
        return this.navbarOpen;
    }

    toRoot(): void {
        // reset application path
        // this.filesService.setCurrentPath('/');
        this.filesService.applicationPathChanged.emit('/');
        // update UI for given application path
        this.filesService.fileElementsChanged.emit(this.filesService.getAllForPath('/'));
    }

    searchTag(tagName: string):void {
        console.log(tagName);
    }
}
