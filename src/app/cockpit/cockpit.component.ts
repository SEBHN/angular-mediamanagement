import {Component, OnInit, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import {
    faHome,
    faCloudUploadAlt,
    faSignOutAlt,
    faArrowLeft,
    faFolderPlus,
    faTag
} from '@fortawesome/free-solid-svg-icons';

import {Folder} from '../shared/folder.model';
import {UploadMediaService} from '../services/upload-media.service';
import { FilesService } from '../services/files-service.service';
import {TagService} from '../services/tag.service';
import {environment} from '../../environments/environment';

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
    faTag = faTag;

    // navbar toggle
    private navbarOpen = false;

    @Output() folderCreated = new EventEmitter<Folder>();
    @ViewChild('searchInput') searchInputRef: ElementRef;

    constructor(private uploadMediaService: UploadMediaService, private filesService: FilesService,
        private tagService: TagService) {
        this.uploadMediaService = uploadMediaService;
    }

    toggleNavbar(): void {
        this.navbarOpen = !this.navbarOpen;
    }

    // if the user selects a file this method will call
    onFileChanged(event) {
        var selectedFile = event.target.files[0];
        this.uploadMediaService.selectedFile = selectedFile;
        this.uploadMediaService.postMetaData(selectedFile);
        event.target.value = '';
    }

    ngOnInit() {
    }

    isNavbarOpen() {
        return this.navbarOpen;
    }

    toRoot(): void {
        // reset application path
        this.filesService.applicationPathChanged.emit('/');
        // update UI for given application path
        this.filesService.fileElementsChanged.emit(this.filesService.getAllForPath('/'));
    }

    searchTags(tags: string): void {
        this.tagService.searchForTag(this.filesService.getCurrentPath(), tags, environment.currentUserId);
        // clear search input *WARNING* not a clean solution, but for now it's okay :(
        this.searchInputRef.nativeElement.value = '';
    }
}
