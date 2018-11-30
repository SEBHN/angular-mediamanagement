import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Media} from "../shared/media.model";
import {FilesService} from "./files-service.service";
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UpdateMediaService {

    constructor(private http: HttpClient, private filesService: FilesService) { }

    // Media Metadata POST
    putMedia(media: Media) {
        this.http.put(`/users/${environment.currentUserId}/media/${media.id}`, JSON.stringify(media), {
            reportProgress: true,
            observe: 'response',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .subscribe((response) => {
                this.filesService.rename(response.body["id"], response.body["name"]);
            }, error => console.log(new Error(error.message)));
    }
}
