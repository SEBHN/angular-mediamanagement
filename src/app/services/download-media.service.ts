import { Injectable } from '@angular/core';
import {Media} from '../shared/media.model';
import {saveAs} from 'file-saver';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DownloadMediaService {

  downloadMediaUrl = '/users/{userId}/media/{id}/download';

  constructor(private http: HttpClient) { }

  saveToFileSystem(blob, filename) {
    console.log(blob);
    saveAs(blob, filename);
  }

  downloadMedia(media: Media) {
    this.http.get(this.downloadUrlBuilder(media.id), { responseType: 'blob' })
    .subscribe(data => this.saveToFileSystem(data, media.name), error1 => console.log(error1));
  }

  private downloadUrlBuilder(id: string): string {
    return this.downloadMediaUrl.replace('{userId}', environment.currentUserId).replace('{id}', id);
  }

}
