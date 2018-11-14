import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Media} from "../shared/media.model";
import {FileElement} from "../shared/file-element.model";
import {FilesService} from "./files-service.service";

@Injectable({
    providedIn: 'root'
})
export class GetMediaService {

    fileService: FilesService;
    getMediaFromUser = "/users/{userID}/media/";

    constructor(private http: HttpClient) {
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
        console.log(res);

        for (var i = 0; i < res.length; i++) {
            if (res[i]["name"] != null) {
                var media = {} as Media;
                media.id = res[i]["id"];
                media.name = res[i]["name"];
                media.fileId = res[i]["fileId"];
                media.fileExtension = res[i]["fileExtension"];
                media.filePath = res[i]["filePath"];
                media.tags = res[i]["tags"];
                media.isFolder = false;
                this.fileService.createFolder(media);
            }
        }
    }

    // returns the post Meta Data URL after it replaces the {userID} field
    getMediaUrl(): string {
        // TODO: replace the userID placeholder with the userID from user class
        var url = this.getMediaFromUser.replace("{userID}", "999");
        return url;
    }
}
