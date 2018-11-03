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
    baseUrl = "http://localhost:8080/users/999/media";

    media: Media;
    media = new Media("1453", "My Porsche 911", "porsche.jpg", ".jpg", "", [new Tag("Porsche"), new Tag("Auto"), new Tag("911")]);

    onFileChanged(event) {
        this.selectedFile = event.target.files[0];
        this.fileName = this.selectedFile.name;
        this.fileName = this.selectedFile.type;
        console.log(JSON.stringify(this.selectedFile.name));
    }

    onUpload() {
        // upload code goes here
        //this.mediaService.upload(this.selectedFile);
        /*
        this.http.post(this.baseUrl, this.selectedFile, {
            reportProgress: true,
            observe: 'events'
        })
            .subscribe(event => {
                console.log(event); // handle event here
            });*/

        console.log(JSON.stringify(this.media));
        this.http.post(this.baseUrl, JSON.stringify(this.media), {
            reportProgress: true,
            observe: 'events',
        })
            .subscribe(event => {
                console.log("HALLO " + event); // handle event here
            });
    }

    ngOnInit() {
    }

}
