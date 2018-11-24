import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Media} from "../shared/media.model";
import {FilesService} from "./files-service.service";

@Injectable({
    providedIn: 'root'
})
export class UploadMediaService {

    selectedFile: File;

    constructor(private http: HttpClient, private filesService: FilesService) {
    }

    // POST File Metadata
    postMetaData(selectedFile: File, userId: string = '8'): void {
        this.selectedFile = selectedFile;
        var media = this.getMediaData(selectedFile, userId); // Todo: get owner ID from user class
        this.http.post(`/users/${userId}/media/`, JSON.stringify(media), {
            reportProgress: true,
            observe: 'response',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .subscribe((response: HttpResponse<any>) => {
                this.postFile(userId, response.body["id"]);
            }, error => console.log(new Error(error.message)));
    }

    // POST
    postFile(userId: string, fileId: string): void {
        let formData = new FormData();
        formData.append('file', this.selectedFile);
        this.http.post(`/users/${userId}/media/${fileId}/upload`, formData, {
            reportProgress: true,
            observe: 'response',
        })
            .subscribe((response: HttpResponse<any>) => {
                let media = JSON.parse(JSON.stringify(response.body));
                this.filesService.createFile(media);
                this.selectedFile = null;
                console.log(media);
            }, (error) => console.log(new Error(error.message)));
    }

    // creates an media object from the file that the user selects
    getMediaData(file: File, creatorId: string): Media {
        return new Media(null, file.name, null, this.getExtension(file), creatorId);
    }

    getExtension(file: File): string {
        let fileName = file.name;
        let countDots = fileName.replace(/[^.]/g, "").length;
        let extension;
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
}
