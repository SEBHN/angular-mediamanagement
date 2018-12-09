import {Injectable} from '@angular/core';
import {FilesService} from "./files-service.service";
import {environment} from "../../environments/environment";
import {HttpClient, HttpResponse} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class TagService {

    constructor(private fileService: FilesService, private http: HttpClient) {
    }

    searchForTag(currentPath: string, tag: string, userId: string): void {

        if (tag != "") {
            this.getMediaWithTags(tag, currentPath, userId);
        }
    }

    private getMediaWithTags(_tag: string, path: string, userId: string): void {
        const encodedCurrentPath = encodeURIComponent(path);
        this.http.get(environment.API_URL + `/users/${userId}/folders/${encodedCurrentPath}/taggedMedia/`, {
            reportProgress: true,
            observe: 'response'
        })
            .subscribe((response: HttpResponse<any>) => {
                // parse arrived response
                var res = JSON.parse(JSON.stringify(response.body));
                var media = res.filter(file => file.tags != null);
                var tags = media.filter(tags => tags.tags.some(tag => tag.name == _tag));
                this.fileService.fileElementsChanged.emit(tags);
            }, err => console.log(new Error(err.message)));
    }
}
