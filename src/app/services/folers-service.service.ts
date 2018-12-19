import { Injectable } from '@angular/core';
import {Folder} from '../shared/folder.model';
import {v4} from 'node_modules/uuid';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Media } from '../shared/media.model';
import {FilesService} from './files-service.service';





export interface IFolderService {
  remove(folder: Folder, userId: string): void;

  rename(folder: Folder,  userId:string, path: string, updatedName: string): void;
}



@Injectable({
  providedIn: 'root'
})

export class FoldersServiceService implements IFolderService{
  
  constructor(private fileService: FilesService, private http: HttpClient) { }

  remove(folder: Folder, userId: string): void {
    const encodedFolderPath = encodeURIComponent(folder.filePath);
        this.http.delete(environment.API_URL + `/users/${userId}/folders/${encodedFolderPath}`, {
            reportProgress: true,
            observe: 'response'
        });
  }

  rename(folder: Folder, userId:string, path: string, updatedName: string): void {
    const encodedCurrentPath = encodeURIComponent(folder.filePath);
    this.http.put(environment.API_URL + `/users/${userId}/folders/${encodedCurrentPath}`, updatedName,  {
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
