import {Injectable} from '@angular/core';
import {FilesService} from './files-service.service';
import {environment} from '../../environments/environment';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { Media } from '../shared/media.model';

@Injectable({
    providedIn: 'root'
})
export class TagService {

    constructor(private fileService: FilesService, private http: HttpClient) {
    }

    searchForTag(currentPath: string, tag: string, userId: string): void {
        if (tag !== '') {
            this.getMediaForTag(tag, currentPath, userId);
        }
    }

    /**
     * @emits filesElementsChanged event to update the UI to show only media files with specific tag
     * @param _tag the tag passed from the search input
     * @param path the current application path we search in
     * @param userId the current user id
     * @author Emin
     */
    private getMediaForTag(_tags: string, path: string, userId: string): void {
        const encodedCurrentPath = encodeURIComponent(path);
        const tagArray = _tags.split(',');
        
        let tagsSearchUri = `?tag${tagArray[0].trim()}`;
        tagArray.unshift();
        tagArray.forEach(tag => {
            tagsSearchUri = tagsSearchUri + '&tag=' + tag.trim();
        });

        this.http.get(environment.API_URL + `/users/${userId}/folders/${encodedCurrentPath}/taggedMedia${tagsSearchUri}`, {
            reportProgress: true,
            observe: 'response'
        })
            .subscribe((response: HttpResponse<any>) => {
                // filter out media files without tags
                const mediaWithTags: Media[] = response.body.filter(file => file.tags != null);
                // update UI with file elements only containing specified tag
                this.fileService.fileElementsChanged.emit(mediaWithTags);
            }, err => console.log(new Error(err.message)));
    }
}
