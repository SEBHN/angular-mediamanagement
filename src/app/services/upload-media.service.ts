import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Media} from "../shared/media.model";
import {FilesService} from "./files-service.service";

@Injectable({
    providedIn: 'root'
})
export class UploadMediaService {

    fileService: FilesService;
    selectedFile: File;
    postMediaUrl = "/users/{userID}/media/";
    postFileUrl = "/users/{userID}/media/{id}/upload";

    constructor(private http: HttpClient) {
    }

    // REST call to post the media Data (meta data)
    postMetaData(selectedFile: File) {
        this.selectedFile = selectedFile;
        var media = this.getMediaData(selectedFile, "999"); // Todo: get owner ID from user class
        console.log(JSON.stringify(media), undefined, '\t');
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
        console.log(response);
        this.postFile(response.body["id"]);
    }

    // this Method will called, if the respons doesnt have errors.
    fileUploadResponse(response: HttpResponse<any>) {
        console.log(response);
        var media = {} as Media;
        media = JSON.parse(JSON.stringify(response.body));
        console.log(JSON.stringify(media));
        this.fileService.createFile(media);
        this.selectedFile = null;
    }

    fileUploadError(error: HttpErrorResponse) {
        console.log(error);
        this.selectedFile = null;
    }

    // returns the post Meta Data URL after it replaces the {userID} field
    getPostMediaUrl(): string {
        // TODO: replace the userID placeholder with the userID from user class
        var url = this.postMediaUrl.replace("{userID}", "999");
        return url;
    }

    // returns the post File URL after it replaces the {userID} field and {id} field
    getPostFileUrl(id: string): string {
        var url = this.postFileUrl.replace("{userID}", "999");
        var url = url.replace("{id}", id);
        return url;
    }

    // creates an media object from the file that the user selects
    getMediaData(file: File, ownerId: string): Media {
        var extension = this.getExtension(file);
        var media = {} as Media;
        media.name = file.name;
        media.fileExtension = extension;
        media.ownerId = ownerId;
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
