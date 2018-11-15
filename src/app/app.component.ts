import {Component, OnInit} from "@angular/core";
import {FileElement} from "./shared/file-element.model";
import {FilesService} from "./services/files-service.service";
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {GetMediaService} from "./services/get-media.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
    faArrowLeft = faArrowLeft;

    private fileElements: FileElement[];
    public fileService: FilesService;
    private getMediaService: GetMediaService;

    constructor(fileService: FilesService, getMediaService: GetMediaService) {
        this.fileService = fileService;
        this.getMediaService = getMediaService;
    }

    ngOnInit() {
        this.fileService.fileElementsChanged
            .subscribe((updatedFileElements: FileElement[]) => {
                this.fileElements = updatedFileElements;
            });
        this.getMediaService.getAllMediaFromUser();
        this.fileElements = this.fileService.getAll();
    }
}
