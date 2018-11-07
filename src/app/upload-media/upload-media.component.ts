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
    postMediaUrl = "/users/{userID}/media/";
    postFileUrl = "/users/{userID}/media/{id}/upload";

    onFileChanged(event) {
        this.selectedFile = event.target.files[0];
        this.fileName = this.selectedFile.name;
        this.fileName = this.selectedFile.type;
        console.log(JSON.stringify(this.selectedFile.name));
        console.log(JSON.stringify(this.selectedFile.type));
    }

    onUpload() {
        var media = this.getMediaData(this.selectedFile);
        this.postMetaData(media);
        this.postFile(this.selectedFile, media.file);
    }

    postMetaData(media: Media) {
        console.log(JSON.stringify(media));
        this.http.post(this.getPostMediaUrl(), JSON.stringify(media), {
            reportProgress: true,
            observe: 'events',
            headers: this.getHeaders()
        })
            .subscribe(event => {
                console.log(event); // handle event here
            });
    }

    postFile(file: File, fileID: String) {
        console.log("POST FILE");
        let formData = new FormData();
        formData.append('file', file);

        this.http.post(this.getPostFileUrl("3"), formData, {
            reportProgress: true,
            observe: 'events',
        })
            .subscribe(event => {
                console.log(event); // handle event here
                console.log(event.type.toString());
            });
}

    getPostMediaUrl(): String {
        // TODO: User ID später aus der User Klasse nehmen
        var url = this.postMediaUrl.replace("{userID}", "999");
        return url;
    }

    getPostFileUrl(fileID: String): String {
        var url = this.postFileUrl.replace("{userID}", "999");
        var url = url.replace("{id}", fileID);
        return url;
    }

    getMediaData(file: File): Media {
        var id = Math.random().toString(36).substr(2, 20);
        var fileID = Math.random().toString(36).substr(2, 20);
        var extension;
        var fileName = file.name;
        var countDots = fileName.replace(/[^.]/g, "").length;
        if (countDots < 1) {
            extension = "undefined";
        }
        else if (countDots == 1) {
            extension = "." + fileName.split('.').pop();
        }
        else {
            var file_name_array = fileName.split(".");
            extension = "." + file_name_array[file_name_array.length - 1];
        }
        var media = new Media(id, file.name, fileID, extension, "", [new Tag("")]);
        return media;
    }

    getHeaders(): HttpHeaders {
        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');
        return headers;
    }

    ngOnInit() {
    }

}
