import { Injectable } from '@angular/core';
import {Media} from '../shared/media.model';
import {saveAs} from 'file-saver';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DownloadMediaService {


  constructor(private http: HttpClient) {}

  downloadMedia(media: Media, userId: string): void {
    this.http.get(`/users/${userId}/media/${media.id}/download`,
     { responseType: 'blob' })
    .subscribe((data) => {
      saveAs(data, media.name);
    }, error => console.log(new Error(error.message)));
  }
}
