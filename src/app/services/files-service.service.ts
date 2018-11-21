import { Injectable, EventEmitter } from '@angular/core';
import { FileElement } from '../shared/file-element.model';
import { v4 } from 'node_modules/uuid';
import { Folder } from '../shared/folder.model';
import {Media} from "../shared/media.model";



export interface IFileService {
  createFile(fileElement: FileElement): void;
  remove(id: string): void;
  getAll(): FileElement[];
  get(id: string): FileElement;
  rename(id: string, updatedName: string): void;
  queryInFolder(folderId: string);
}

@Injectable({
    providedIn: 'root'
})
export class FilesService implements IFileService {
  // map containing all file elements with their ids
  private map = new Map<string, FileElement>();
  // event for updating the UI
  fileElementsChanged = new EventEmitter<FileElement[]>();
  private currentRootId: string;

  constructor() {
    this.add(new Folder('interesting', '/', 'root'));
    this.add(new Folder('something', '/', 'root'));
    this.add(new Folder('notCool', '/', 'root'));
    this.add(new Folder('dodge', '/', 'root'));
    this.add(new Folder('impossibru', '/', 'root'));
    this.add(new Folder('heyhey', '/', 'root'));
    this.add(new Folder('girls', '/', 'root'));
    this.add(new Folder('boys', '/', 'root'));
   }

  add(fileElement: FileElement): void {
    if(fileElement.id == null) {
        fileElement.id = v4();
    }
    this.map.set(fileElement.id, this.clone(fileElement));
  }

  addMany(mediaArray: Media[]): void {
    mediaArray.forEach((media) => {
      this.createFile(media);
    });
  }

  remove(id: string): void {
    this.map.delete(id);
    this.fileElementsChanged.emit();
  }

  createFile(file: FileElement): void {
    this.add(file);
    this.fileElementsChanged.emit(this.getAll());
  }

  get(id: string): FileElement {
    return this.map.get(id);
  }

  rename(id: string, updatedName: string): void {
    this.map.get(id).name = updatedName;
    //TODO: later update / replace whole FileElement
  }

  queryInFolder(folderId: string): FileElement[] {
    this.currentRootId = folderId;
    return Array.from(this.getAll()
        .filter(element => element.ownerId === folderId))
        .slice();
  }

  getAll(): FileElement[] {
    return Array.from(this.map.values()).slice();
  }

  getCurrentRootId(): string {
    return this.currentRootId;
  }

  // Use it to clone objects
  clone(fileElement: FileElement): FileElement {
    return JSON.parse(JSON.stringify(fileElement));
  }
}
