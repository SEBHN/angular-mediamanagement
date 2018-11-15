import { Injectable, EventEmitter } from '@angular/core';
import { FileElement } from '../shared/file-element.model';
import { v4 } from 'node_modules/uuid';
import { Folder } from '../shared/folder.model';



export interface IFileService {
  add(fileElement: FileElement);
  remove(id: string);
}

@Injectable({
    providedIn: 'root'
})
export class FilesService implements IFileService {
  // map containing all file elements with their ids
  private map = new Map<string, FileElement>();
  // event for updating the UI
  fileElementsChanged = new EventEmitter<FileElement[]>();

  constructor() {
    this.add(new Folder("test", "/"));
    this.add(new Folder("interesting", "/"));
    this.add(new Folder("something", "/"));
    this.add(new Folder("notCool", "/"));
    this.add(new Folder("dodge", "/"));
    this.add(new Folder("impossibru", "/"));
    this.add(new Folder("heyhey", "/"));
   }

  add(fileElement: FileElement): void {
    fileElement.id = v4(); // -> backend generated id (This is so that we see dummy files)
    this.map.set(fileElement.id, this.clone(fileElement));
  }

  remove(id: string): void {
    this.map.delete(id);
    this.fileElementsChanged.emit(this.getAll());
  }

  createFile(file: FileElement): void {
    this.add(file);
    this.fileElementsChanged.emit(this.getAll());
}

  getAll(): FileElement[] {
    console.log(Array.from(this.map.values()).length);
    return Array.from(this.map.values()).slice();
  }

  // Use it to clone objects
  clone(fileElement: FileElement): FileElement {
    return JSON.parse(JSON.stringify(fileElement));
  }
}
