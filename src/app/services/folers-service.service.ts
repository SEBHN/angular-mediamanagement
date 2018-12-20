import { Injectable } from '@angular/core';
import {Folder} from '../shared/folder.model';
import {v4} from 'node_modules/uuid';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Media } from '../shared/media.model';
import {FilesService} from './files-service.service';





export interface IFolderService {
  remove(media: Media, userId: string): void;

  rename(media: Media,  userId:string, path: string, updatedName: string): void;
}



@Injectable({
  providedIn: 'root'
})

export class FoldersServiceService implements IFolderService{
  
  constructor(private fileService: FilesService, private http: HttpClient) { }

  remove(media: Media, userId: string): void {
    const path = media.filePath + media.name;
    const encodedFolderPath = encodeURIComponent(path);
        this.http.delete(environment.API_URL + `/users/${userId}/folders/${encodedFolderPath}`, {
            reportProgress: true,
            observe: 'response'
        })
        .subscribe(response => this.fileService.remove(media.id), error1 => console.log(error1));
  }

  rename(media: Media, userId: string, updatedName: string): void {
    const encodedCurrentPath = encodeURIComponent(media.filePath + media.name);
    const encodedNewPath = encodeURIComponent(media.filePath + updatedName);
    this.http.put(environment.API_URL + `/users/${userId}/folders/${encodedCurrentPath}`, encodedNewPath,  {
        reportProgress: true,
        observe: 'response'
    })
    .subscribe((response: HttpResponse<any>) => {
      // filter out media files without tags
      const mediaInFolder: Media[] = response.body;
      // update UI with file elements only containing specified tag
      this.fileService.fileElementsChanged.emit();
  }, err => console.log(new Error(err.message)));
  }

}
