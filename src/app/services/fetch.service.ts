import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {FilesService} from './files-service.service';
import { FileElement } from '../shared/file-element.model';
import { Media } from '../shared/media.model';
import { environment } from '../../environments/environment';
import { Folder } from '../shared/folder.model';
import { Tag } from '../shared/tag.model';

@Injectable({
    providedIn: 'root'
})
export class FetchService {

    constructor(private http: HttpClient, private filesService: FilesService) {
    }

    getCurrentFilesForUser(userId: string, currentPath: string) {
        const encodedCurrentPath = encodeURIComponent(currentPath);
        this.http.get(environment.API_URL + `/users/${userId}/folders/${encodedCurrentPath}/media/`, {
            reportProgress: true,
            observe: 'response'
        })
            .subscribe((response: HttpResponse<FileElement>) => {
                // parse arrived response
                const responseObj = JSON.parse(JSON.stringify(response.body));
                const filesArray: FileElement[] = [];
                // if there are no subfolders in the current path
                // don't iterate
                if (responseObj.subfolders.length > 0) {
                    // mark all subfolders as such
                    responseObj.subfolders.forEach((subfolder: FileElement) => {
                        const folder = new Folder(subfolder.name, currentPath, userId);
                        // apply type guard
                        folder.member = 'Folder';
                        filesArray.push(folder);
                    });
                }
                // add all media from response to result array
                responseObj.media.forEach((media: Media) => {
                    // parse response to frontend media object
                    const mediaFile = new Media(media.id, media.name, media.fileId, media.fileExtension, media.filePath, media.creatorId);
                    // set type guard
                    mediaFile.member = 'Media';
                    // if media from response has tags
                    if (media.tags != null) {
                        // add received tags from backend to the specific media
                        media.tags.forEach(tag => mediaFile.addTag(tag.name));
                    }

                    if (media.fileId != "") {
                        filesArray.push(mediaFile);
                    }
                });
                // feed files service with data
                this.filesService.addMany(filesArray);
            }, err => console.log(new Error(err.message)));
    }
}
