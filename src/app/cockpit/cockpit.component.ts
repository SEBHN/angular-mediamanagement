import { Component, OnInit, TemplateRef, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { faHome,
         faCloudUploadAlt,
         faSignOutAlt,
         faArrowLeft,
         faFolderPlus } from '@fortawesome/free-solid-svg-icons';

import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Media} from "../../Media";
import {Tag} from "../../Tag";
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Folder } from '../shared/folder.model';

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

  @Output() folderCreated = new EventEmitter<Folder>();

  constructor(modalService: BsModalService) {
    this.modalService = modalService;
  }
 
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
    fileName: string;
    selectedFile: File;
    postMediaUrl = "/users/{userID}/media/";
    postFileUrl = "/users/{userID}/media/{id}/upload";

    constructor(modalService: BsModalService, private http: HttpClient) {
        this.modalService = modalService;
    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    onFileChanged(event) {
        this.selectedFile = event.target.files[0];
        this.fileName = this.selectedFile.name;
        if (this.selectedFile != null) {
            var media = this.getMediaData(this.selectedFile);
            this.postMetaData(media);
            this.postFile(this.selectedFile, media.file);
        }
    }

    // REST call to post the media Data (meta data)
    postMetaData(media: Media) {
        console.log(JSON.stringify(media));
        this.http.post(this.getPostMediaUrl(), JSON.stringify(media), {
            reportProgress: true,
            observe: 'response',
            headers: this.getHeaders()
        })
            .subscribe(response => console.log(response.status), error1 => console.log(error1));
    }

    // REST call to post a file
    postFile(file: File, fileID: string) {
        let formData = new FormData();
        formData.append('file', file);
        // TODO: hardcoded fileID ersetzen, sobald Backend richtige Daten liefert
        this.http.post(this.getPostFileUrl(fileID), formData, {
            reportProgress: true,
            observe: 'response',
        })
            .subscribe(response => this.validateResponse(response), error1 => console.log(error1));
    }

    // this Method will called, if the respons doesnt have errors.
    validateResponse(response: HttpResponse<any>) {
        console.log(response.status.toString());
        this.selectedFile = null; // set the selected file to null
    }

    // returns the post Meta Data URL after it replaces the {userID} field
    getPostMediaUrl(): string {
        // TODO: User ID später aus der User Klasse nehmen
        var url = this.postMediaUrl.replace("{userID}", "999");
        return url;
    }

    // returns the post File URL after it replaces the {userID} field and {id} field
    getPostFileUrl(fileID: string): string {
        var url = this.postFileUrl.replace("{userID}", "999");
        var url = url.replace("{id}", fileID);
        return url;
    }

    // creates an media object from the file that the user selects
    getMediaData(file: File): Media {
        var id = Math.random().toString(36).substr(2, 20);
        var fileID = Math.random().toString(36).substr(2, 20);
        var extension = this.getExtension();
        var media = new Media(id, file.name, fileID, extension, "", [new Tag("")]);
        return media;
    }

    getExtension(): string {
        var fileName = this.selectedFile.name;
        var countDots = fileName.replace(/[^.]/g, "").length;
        var extension;
        if (countDots < 1) {
            return extension = "undefined";
        }
        else if (countDots == 1) {
            return extension = "." + fileName.split('.').pop();
        }
        else {
            var file_name_array = fileName.split(".");
            return extension = "." + file_name_array[file_name_array.length - 1];
        }
    }

    getHeaders(): HttpHeaders {
        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');
        return headers;
    }

    ngOnInit() {
    }

  onOpenCreateFolderDialog(folderName: string) {
    if (folderName !== '') {
      this.folderCreated.emit(new Folder(folderName, "/"));
    }
  }
}
