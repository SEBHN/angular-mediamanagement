import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Media} from '../shared/media.model';
import {FilesService} from './files-service.service';
import {environment} from '../../environments/environment';

const API_URL = environment.API_URL;

@Injectable({
    providedIn: 'root'
})
export class UploadMediaService {

    selectedFile: File;

    constructor(private http: HttpClient, private filesService: FilesService) {
    }

    // POST File Metadata
    postMetaData(selectedFile: File, userId: string = environment.currentUserId): void {
        this.selectedFile = selectedFile;
        const media = this.getMediaData(selectedFile, this.filesService.currentPath, userId); // Todo: get owner ID from user class
        this.http.post(API_URL + `/users/${userId}/media/`, JSON.stringify(media), {
            reportProgress: true,
            observe: 'response',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .subscribe((response: HttpResponse<any>) => {
                console.log(response);
                this.postFile(userId, response.body['id']);
            }, error => console.log(new Error(error.message)));
    }

    // POST
    postFile(userId: string, fileId: string): void {
        const formData = new FormData();
        formData.append('file', this.selectedFile);
        this.http.post(API_URL + `/users/${userId}/media/${fileId}/upload`, formData, {
            reportProgress: true,
            observe: 'response',
        })
            .subscribe((response: HttpResponse<any>) => {
                const media = JSON.parse(JSON.stringify(response.body));
                this.filesService.memoryMap.get(this.filesService.currentPath).push(media);
                this.filesService.createFile(media);
                this.selectedFile = null;
                console.log(media);
            }, (error) => console.log(new Error(error.message)));
    }

    // creates an media object from the file that the user selects
    getMediaData(file: File, filePath: string, creatorId: string): Media {
        return new Media(null, file.name, null, this.getExtension(file), filePath, creatorId);
    }

    getExtension(file: File): string {
        const fileName = file.name;
        const countDots = fileName.replace(/[^.]/g, '').length;
        let extension;
        if (countDots < 1) {
            return extension = 'undefined';
        } else if (countDots === 1) {
            return extension = '.' + fileName.split('.').pop();
        } else {
            const file_name_array = fileName.split('.');
            return extension = '.' + file_name_array[file_name_array.length - 1];
        }
    }
}
