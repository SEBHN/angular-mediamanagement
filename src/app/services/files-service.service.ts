import {Injectable, EventEmitter} from '@angular/core';
import {FileElement} from '../shared/file-element.model';


import {v4} from 'node_modules/uuid';
import {Folder} from '../shared/folder.model';


export interface IFileService {
    add(fileElement: FileElement);

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
        this.map.set(v4(), new Folder("test", "/"));
        this.map.set(v4(), new Folder("interesting", "/"));
        this.map.set(v4(), new Folder("something", "/"));
        this.map.set(v4(), new Folder("notCool", "/"));
        this.map.set(v4(), new Folder("dodge", "/"));
        this.map.set(v4(), new Folder("impossibru", "/"));
        this.map.set(v4(), new Folder("heyhey", "/"));
    }

    add(fileElement: FileElement): void {
        //fileElement.id = v4(); --- Backend generatges the id
        console.log(fileElement.id);
        this.map.set(fileElement.id, this.clone(fileElement));
    }

    createFile(file: FileElement): void {
        this.add(file);
        this.fileElementsChanged.emit(this.getAll());
    }

    getAll(): FileElement[] {
        return Array.from(this.map.values()).slice();
    }

    // Use it to clone objects
    clone(fileElement: FileElement): FileElement {
        return JSON.parse(JSON.stringify(fileElement));
    }
}
