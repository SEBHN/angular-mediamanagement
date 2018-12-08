import {Injectable} from '@angular/core';
import {FilesService} from "./files-service.service";

@Injectable({
    providedIn: 'root'
})
export class TagService {

    constructor(private fileService: FilesService) {
    }

    searchForTag(currentPath: string, tag: string): void {

        if (currentPath == '/') {
            // Suche im Root nach allen Medien, die den eingegebenen Tag beinhalten
            this.searchAllMediaForTag(tag);
        } else {
            // Suche im aktuellen Ordner nach Tag dem Tag, das man eingegeben hat
            console.log(currentPath);
        }
    }

    private searchAllMediaForTag(_tag: string): void {
        var media = this.fileService.getAll().filter(file => file.tags != null);
        var tags = media.filter(tags => tags.tags.some(tag => tag.name == _tag));
        this.fileService.fileElementsChanged.emit(tags);
    }
}
