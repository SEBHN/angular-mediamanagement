import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Media} from "../shared/media.model";
import {FilesService} from "./files-service.service";

@Injectable({
    providedIn: 'root'
})
export class GetMediaService {

    constructor(private http: HttpClient, private fileService: FilesService) {
    }

    getAllMediaFromUser(userId: string) {
        this.http.get(`/users/${userId}/media/`, {
            reportProgress: true,
            observe: 'response'
        })
            .subscribe((response: HttpResponse<any>) => {
                let mediaArray: Media[] = JSON.parse(JSON.stringify(response.body));
                console.log(mediaArray);
                this.fileService.addMany(mediaArray);
            }, err => console.log(new Error(err.message)));
    }
}
