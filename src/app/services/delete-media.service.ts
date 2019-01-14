import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {FilesService} from './files-service.service';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DeleteMediaService {

    constructor(private http: HttpClient, private fileService: FilesService) {
    }

    deleteMediaUrl = environment.API_URL + '/media/{id}';
    tempID: string;

    // REST call to delet media
    deleteMedia(mediaId: string) {
        this.tempID = mediaId;
        this.http.delete(this.getDeleteMediaUrl(mediaId), {
            reportProgress: true,
            observe: 'response'
        })
            .subscribe(response => this.deleteMediaResponse(response), error1 => console.log(error1));
    }

    deleteMediaResponse(response: HttpResponse<any>) {
        this.fileService.remove(this.tempID);
    }

    // returns the delete media URL after it replaces the {userID} field and {id} field
    getDeleteMediaUrl(mediaId: string): string {
        // TODO: replace the userID placeholder with the userID from user class
        return  this.deleteMediaUrl.replace('{id}', mediaId);
    }
}
