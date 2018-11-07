import { Injectable } from '@angular/core';
import { FileElement } from '../shared/file-element.model';


import { v4 } from 'node_modules/uuid';

export interface IFileService {
  add(fileElement: FileElement);

}

@Injectable({
  providedIn: 'root'
})
export class FilesService implements IFileService {

  private map = new Map<string, FileElement>();

  constructor() { }

  add(fileElement: FileElement) {
    fileElement.id = v4();
    this.map.set(fileElement.id, this.clone(fileElement));
  }

  // Use it to clone objects
  clone(fileElement: FileElement): FileElement {
    return JSON.parse(JSON.stringify(fileElement));
  }
}
