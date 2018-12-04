import {Component, OnInit} from "@angular/core";
import {FileElement} from "./shared/file-element.model";
import {FilesService} from "./services/files-service.service";
import { FetchService } from "./services/fetch.service";
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { Folder } from "./shared/folder.model";
import {environment} from '../environments/environment';


@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
    constructor() {
    }

    ngOnInit() {
    }

}
