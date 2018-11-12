import {Injectable} from '@angular/core';
import {Media} from "../../Media";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Tag} from "../../Tag";

@Injectable({
    providedIn: 'root'
})
export class UploadMediaService {

    selectedFile: File;
    postMediaUrl = "/users/{userID}/media/";
    postFileUrl = "/users/{userID}/media/{id}/upload";

    constructor(private http: HttpClient) {
    }

    // REST call to post the media Data (meta data)
    postMetaData(selectedFile: File) {
        this.selectedFile = selectedFile;
        var media = this.getMediaData(selectedFile);
        console.log(JSON.stringify(media));
        this.http.post(this.getPostMediaUrl(), JSON.stringify(media), {
            reportProgress: true,
            observe: 'response',
            headers: this.getHeaders()
        })
            .subscribe(response => this.metaDataResponse(response), error1 => console.log(error1));
    }

    // REST call to post a file
    postFile(id: string) {
        let formData = new FormData();
        formData.append('file', this.selectedFile);
        this.http.post(this.getPostFileUrl(id), formData, {
            reportProgress: true,
            observe: 'response',
        })
            .subscribe(response => this.fileUploadResponse(response), error1 => this.fileUploadError(error1));
    }

    metaDataResponse(response: HttpResponse<any>) {
        if(response.status == 200){
            console.log(response);
            this.postFile(response.body["id"]);
        }
    }

    // this Method will called, if the respons doesnt have errors.
    fileUploadResponse(response: HttpResponse<any>) {
        console.log(response);
        this.selectedFile = null; // set the selected file to null
    }

    fileUploadError(error: HttpErrorResponse){
        console.log(error);
        this.selectedFile = null;
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
        var extension = this.getExtension(file);
        var media = new Media("", file.name, "", extension, "", [new Tag("")]);
        return media;
    }

    getExtension(file: File): string {
        var fileName = file.name;
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
}
