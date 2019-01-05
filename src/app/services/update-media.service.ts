import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { FilesService } from './files-service.service';
import { Media } from '../shared/media.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UpdateMediaService {

    constructor(private http: HttpClient, private filesService: FilesService) { }

    // Media Metadata POST
    putMedia(media: Media): void {
        this.http.put(`${environment.API_URL}/users/media/${media.id}`, JSON.stringify(media), {
            reportProgress: true,
            observe: 'response',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .subscribe((response) => {
                this.filesService.rename(response.body['id'], response.body['name']);
            }, error => console.log(new Error(error.message)));
    }
}
