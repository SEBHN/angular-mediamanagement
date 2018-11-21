import {Component, OnInit} from "@angular/core";
import {FileElement} from "./shared/file-element.model";
import {FilesService} from "./services/files-service.service";
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {GetMediaService} from "./services/get-media.service";
import { Folder } from "./shared/folder.model";
import { element } from "@angular/core/src/render3";


@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
    
    faArrowLeft = faArrowLeft;
    private currentRoot: FileElement;

    private fileElements: FileElement[];
    private canNavigateUp: boolean = false;
    private currentPath: string;

    constructor(private filesService: FilesService, private getMediaService: GetMediaService) {
    }

    ngOnInit() {
        this.fileElements = this.filesService.getAll();
        this.getMediaService.getAllMediaFromUser('1337'); //TODO: user management
    }

    /**
     * Navigate down. Gets invoked via event binding from template.
     * @param folder the folder to navigate into
     */
    navigateToFolder(folder: FileElement): void {
        this.currentRoot = folder;
        this.updateElementQuery();
        this.canNavigateUp = true;
        this.currentPath = this.pushToPath(this.currentPath, folder);
    }

    navigateUp() {
        if (this.currentRoot && this.currentRoot.ownerId === 'root') {
            // on navigating up we reach the top root
            this.currentRoot = null;
            this.updateElementQuery();
            this.canNavigateUp = false;
        } else {
            // move to upper root
            this.currentRoot = this.filesService.get(this.currentRoot.ownerId);
            this.updateElementQuery();
        }
        this.currentPath = this.popFromPath(this.currentPath);
    }

    updateElementQuery() {
        this.filesService.fileElementsChanged
            .emit(this.filesService.queryInFolder(this.currentRoot ? this.currentRoot.id : 'root'));
    }

    getCurrentRoot(): FileElement {
        return this.currentRoot;
    }

    pushToPath(path: string, element: Folder): string {
        let p = path ? path : '';
        p += `${element.name} / `;
        return p;
    }

    popFromPath(path: string): string {
        let p = path ? path : '';
        let split = p.split('/');
        split.splice(split.length - 2, 1);
        p = split.join('/');
        return p;
    }
}
