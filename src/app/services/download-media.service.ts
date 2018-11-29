import { Injectable } from '@angular/core';
import {Media} from '../shared/media.model';
import {saveAs} from 'file-saver';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DownloadMediaService {

  downloadMediaUrl = environment.API_URL + '/users/{userId}/media/{id}/download';

  constructor(private http: HttpClient) { }

  saveToFileSystem(blob, filename) {
    saveAs(blob, filename);
  }

  downloadMedia(media: Media) {
    this.http.get(this.downloadUrlBuilder(media.id), { responseType: 'blob' })
    .subscribe(data => saveAs(data, media.name), error => console.log(error));
  }

  private downloadUrlBuilder(id: string): string {
    return this.downloadMediaUrl.replace('{userId}', environment.currentUserId).replace('{id}', id);
  }

}
