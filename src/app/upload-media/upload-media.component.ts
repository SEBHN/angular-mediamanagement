import {Component, OnInit} from '@angular/core';
import {UploadMediaService} from "./upload-media.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Media} from "../../Media";
import {Tag} from "../../Tag";

@Component({
    selector: 'app-upload-media',
    templateUrl: './upload-media.component.html',
    styleUrls: ['./upload-media.component.css']
})
export class UploadMediaComponent implements OnInit {

    constructor(private mediaService: UploadMediaService, private http: HttpClient) {
    }

    fileName: String;
    selectedFile: File;
    postMediaUrl = "/users/999/media/";

    media = new Media("1453", "My Porsche 911", "porsche.jpg", ".jpg", "", [new Tag("Porsche"), new Tag("Auto"), new Tag("911")]);

    onFileChanged(event) {
        this.selectedFile = event.target.files[0];
        this.fileName = this.selectedFile.name;
        this.fileName = this.selectedFile.type;
        console.log(JSON.stringify(this.selectedFile.name));
    }

    onUpload() {
        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');
        console.log(JSON.stringify(this.media));
        this.http.post(this.postMediaUrl, JSON.stringify(this.media), {
            reportProgress: true,
            observe: 'events',
            headers: headers
        })
            .subscribe(event => {
                console.log(event); // handle event here
            });
    }

    ngOnInit() {
    }

}
