import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {FilesService} from "./files-service.service";
import { FileElement } from '../shared/file-element.model';

@Injectable({
    providedIn: 'root'
})
export class GetMediaService {

    constructor(private http: HttpClient, private fileService: FilesService) {
    }

    getAllMediaFromUser(userId: string): void {
        this.http.get(`/users/${userId}/media/`, {
            reportProgress: true,
            observe: 'response'
        })
            .subscribe((response: HttpResponse<any>) => {
                // parse arrived response
                let responseObj = JSON.parse(JSON.stringify(response.body));
                let filesArray: FileElement[] = [];
                responseObj.subfolders.forEach((subfolder: FileElement) => {
                    subfolder.isFolder = true;
                    filesArray.push(subfolder);
                });
                responseObj.media.forEach((media) => {
                    filesArray.push(media);
                });
                this.fileService.addMany(filesArray);
            }, err => console.log(new Error(err.message)));
    }
}
