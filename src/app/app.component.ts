import {Component, OnInit} from "@angular/core";
import {FileElement} from "./shared/file-element.model";
import {FilesService} from "./services/files-service.service";
import { FetchService } from "./services/fetch.service";
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { Folder } from "./shared/folder.model";


@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
    
    faArrowLeft = faArrowLeft;

    private fileElements: FileElement[];
    private canNavigateUp: boolean = false;
    private currentPath: string;

    constructor(private filesService: FilesService, private fetchService: FetchService) {
        this.currentPath = '/'
    }

    ngOnInit() {
        this.updateQuery();
        this.fileElements = this.filesService.getAllForPath(this.currentPath);
    }

    /**
     * Navigate down. Gets invoked via event binding from template.
     * @param folder the folder to navigate into
     */
    navigateToFolder(folder: FileElement): void {
        this.canNavigateUp = true;
        this.pushToPath(folder);
        this.updateQuery();
    }

    navigateUp() {
        // if (this.currentRoot && this.currentRoot.ownerId === 'root') {
        //     // on navigating up we reach the top root
        //     this.updateElementQuery();
        //     this.canNavigateUp = false;
        // } else {
        //     // move to upper root
        //     this.currentRoot = this.filesService.get(this.currentRoot.ownerId);
        //     this.updateElementQuery();
        // }
        // this.currentPath = this.popFromPath(this.currentPath);
        if (this.currentPath === '/') {
            this.canNavigateUp = false;
            this.updateQuery();
        } else {
            this.popFromPath();
            this.updateQuery();
        }
    }

    updateQuery(): void {
        this.filesService.currentPath = this.currentPath;
        this.fetchService.getCurrentFilesForUser('8', this.currentPath); //TODO: user management
    }

    pushToPath(element: Folder): void {
        this.currentPath += `${element.name}/`;
    }

    popFromPath(): void {
        let split = this.currentPath.split('/');
        split.splice(split.length - 2, 1);
        this.currentPath = split.join('/');
    }
}
