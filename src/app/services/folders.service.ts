import { Injectable } from '@angular/core';
import {Folder} from '../shared/folder.model';
import {v4} from 'node_modules/uuid';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Media } from '../shared/media.model';
import {FilesService} from './files-service.service';
import { FetchService } from './fetch.service';
import { faHistory } from '@fortawesome/free-solid-svg-icons';


export interface IFolderService {
  remove(media: Media, userId: string): void;

  rename(media: Media,  userId: string, path: string, updatedName: string): void;
}


@Injectable({
  providedIn: 'root'
})

export class FoldersService implements IFolderService {

  constructor(private fileService: FilesService, private http: HttpClient, private fetchService: FetchService) { }

  remove(media: Media): void {
    const path = media.filePath + media.name;
    const encodedFolderPath = encodeURIComponent(path);
        this.http.delete(environment.API_URL + `/folders/${encodedFolderPath}`, {
            reportProgress: true,
            observe: 'response'
        })
        .subscribe(response => this.fileService.remove(media.id), error1 => console.log(error1));
  }

  rename(media: Media, updatedName: string): void {
    const encodedCurrentPath = encodeURIComponent(media.filePath + media.name);
    const newPath = media.filePath + updatedName;
    this.http.put(environment.API_URL + `/folders/${encodedCurrentPath}`, newPath,  {
        reportProgress: true,
        observe: 'response'
    })
    .subscribe((response: HttpResponse<any>) => {
      // update UI with file elements
      this.fileService.rename(media.id, updatedName);
  }, err => console.log(new Error(err.message)));
  }

}
