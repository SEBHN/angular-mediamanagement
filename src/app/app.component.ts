import {Component, OnInit} from "@angular/core";
import {FileElement} from "./shared/file-element.model";
import {FilesService} from "./services/files-service.service";
import {FetchService} from "./services/fetch.service";
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {Folder} from "./shared/folder.model";
import {environment} from '../environments/environment';


@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {

    faArrowLeft = faArrowLeft;

    private fileElements: FileElement[];
    private canNavigateUp = false;
    private currentPath: string;

    constructor(private filesService: FilesService, private fetchService: FetchService) {
        this.currentPath = '/';
    }

    ngOnInit() {
        //console.log(this.filesService.memoryMap);
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

        // Emin
        // if (this.filesService.memoryMap.has(this.currentPath) == false) {
        //     this.fetchService.getCurrentFilesForUser(environment.currentUserId, this.currentPath); //TODO: user management
        // } else {
        //     this.filesService.addMany(this.filesService.memoryMap.get(this.currentPath));
        // }
        // console.log(this.filesService.memoryMap);

        // Bogdan
        // check if service has data from current application path
        if (!this.filesService.getMap().has(this.currentPath)) {
            // need to fetch from backend
            this.fetchService.getCurrentFilesForUser(environment.currentUserId, this.currentPath);
        } else {
            // data exists - get files with current path from service
            this.fileElements = this.filesService.getAllForPath(this.currentPath);
        }
    }

    pushToPath(element: Folder): void {
        this.currentPath += `${element.name}/`;
    }

    popFromPath(): void {
        let split = this.currentPath.split('/');
        split.splice(split.length - 2, 1);
        this.currentPath = split.join('/');
    }

    getFileElements(): FileElement[] {
        return this.fileElements;
    }

    getCurrentPath(): string {
        return this.currentPath;
    }
}
