import {Injectable} from '@angular/core';
import {Media} from "../../Media";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
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
            .subscribe(response => this.validateMetaDataResponse(response), error1 => console.log(error1));
    }

    // REST call to post a file
    postFile(fileID: string) {
        let formData = new FormData();
        formData.append('file', this.selectedFile);
        // TODO: hardcoded fileID ersetzen, sobald Backend richtige Daten liefert
        this.http.post(this.getPostFileUrl(fileID), formData, {
            reportProgress: true,
            observe: 'response',
        })
            .subscribe(response => this.validateResponse(response), error1 => console.log(error1));
    }

    validateMetaDataResponse(response: HttpResponse<any>) {
        if(response.status == 200){
            console.log(response);
            this.postFile(response.body["id"]);
        }
    }

    // this Method will called, if the respons doesnt have errors.
    validateResponse(response: HttpResponse<any>) {
        console.log(response);
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
        var extension = this.getExtension();
        var media = new Media("", file.name, "", extension, "", [new Tag("")]);
        return media;
    }

    getExtension(): string {
        //TODO: check file extensions
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
}
