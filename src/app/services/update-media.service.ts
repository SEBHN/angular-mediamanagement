import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Media} from "../shared/media.model";
import {FilesService} from "./files-service.service";
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UpdateMediaService {

    putMediaUrl = "/users/{userId}/media/{id}";

    constructor(private http: HttpClient, private filesService: FilesService) { }

    // REST call to post the media Data (meta data)
    putMedia(media: Media) {
        this.http.put(this.putMediaUrlBuilder(media.id), JSON.stringify(media), {
            reportProgress: true,
            observe: 'response',
            headers: this.getHeaders()
        })
            .subscribe(response => this.putMediaResponse(response), error1 => console.log(error1));
    }

    private putMediaResponse(response: HttpResponse<any>){
      console.log(response);
      this.filesService.rename(response.body["id"], response.body["name"]);
    }
    // returns the post File URL after it replaces the {userID} field and {id} field
    putMediaUrlBuilder(id: string): string {
        var url = this.putMediaUrl.replace("{userId}", environment.currentUserId);
        var url = url.replace("{id}", id);
        return url;
    }

    getHeaders(): HttpHeaders {
        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');
        return headers;
    }
}
