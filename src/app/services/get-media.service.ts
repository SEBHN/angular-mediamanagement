import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Media} from "../shared/media.model";
import {FileElement} from "../shared/file-element.model";
import {FilesService} from "./files-service.service";

@Injectable({
    providedIn: 'root'
})
export class GetMediaService {

    getMediaFromUser = "/users/{userID}/media/";

    constructor(private http: HttpClient, private fileService: FilesService) {
    }

    getAllMediaFromUser() {
        this.http.get(this.getMediaUrl(), {
            reportProgress: true,
            observe: 'response'
        })
            .subscribe(response => this.getMediaResponse(response), error1 => console.log(error1));
    }

    getMediaResponse(response: HttpResponse<any>) {
        console.log(response);
        var res: FileElement[] = JSON.parse(JSON.stringify(response.body));

        var mediaArray = {} as Media[];
        mediaArray = JSON.parse(JSON.stringify(response.body));
        console.log(mediaArray);
        this.fileService.addAllFiles(mediaArray);
    }

    // returns the post Meta Data URL after it replaces the {userID} field
    getMediaUrl(): string {
        // TODO: replace the userID placeholder with the userID from user class
        var url = this.getMediaFromUser.replace("{userID}", "999");
        return url;
    }
}
