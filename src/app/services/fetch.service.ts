import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {FilesService} from "./files-service.service";
import { FileElement } from '../shared/file-element.model';
import { Media } from '../shared/media.model';

@Injectable({
    providedIn: 'root'
})
export class FetchService {

    constructor(private http: HttpClient, private filesService: FilesService) {
    }

    getCurrentFilesForUser(userId: string, currentPath: string) {
        var encodedCurrentPath = encodeURIComponent(currentPath)
        this.http.get(`/users/${userId}/folders/${encodedCurrentPath}/media/`, {
            reportProgress: true,
            observe: 'response'
        })
            .subscribe((response: HttpResponse<any>) => {
                // parse arrived response
                let responseObj = JSON.parse(JSON.stringify(response.body));
                let filesArray: FileElement[] = [];
                // if there are no subfolders in the current path
                // don't iterate
                if (responseObj.subfolders.length > 0) {
                    // mark all subfolders as such
                    responseObj.subfolders.forEach((subfolder: FileElement) => {
                        subfolder.isFolder = true;
                        subfolder.filePath = currentPath;
                        filesArray.push(subfolder);
                    });
                }
                // add all media from response to result array
                responseObj.media.forEach((media: Media) => {
                    filesArray.push(media);
                });
                // feed files service with data
                this.filesService.addMany(filesArray);
            }, err => console.log(new Error(err.message)));
    }
}
