import {Injectable, EventEmitter} from '@angular/core';
import {FileElement} from '../shared/file-element.model';
import {v4} from 'node_modules/uuid';
import {Media} from "../shared/media.model";


export interface IFileService {
    createFile(fileElement: FileElement): void;

    remove(id: string): void;

    getAll(): FileElement[];

    get(id: string): FileElement;

    rename(id: string, updatedName: string): void;
}

@Injectable({
    providedIn: 'root'
})
export class FilesService implements IFileService {
    // map containing all file elements with their ids
    private map = new Map<string, FileElement>();
    // event for updating the UI
    fileElementsChanged = new EventEmitter<FileElement[]>();
    currentPath: string;

    public memoryMap = new Map<string, FileElement[]>();

    constructor() {
    }

    add(fileElement: FileElement): void {
        // incoming folder
        if (fileElement.id == null) {
            // check by name if folder is in memory
            let match = this.getAll().find(element => element.name === fileElement.name);
            if (typeof match === 'undefined') {
                // folder doesn't exist in memory
                fileElement.id = v4(); // generate random uuid
                this.map.set(fileElement.id, this.clone(fileElement));
            } // if folder is in memory - do nothing
        } else {
            // handle media files
            this.map.set(fileElement.id, this.clone(fileElement));
        }
    }

    addMany(filesArray: FileElement[]): void {
        filesArray.forEach((media) => {
            this.createFile(media);
        });
    }

    remove(id: string): void {
        this.deleteFromMemory(id);
        this.map.delete(id);
        this.fileElementsChanged.emit(this.getAllForPath(this.currentPath));
    }

    deleteFromMemory(id: string) {
        var index;
        for (var i = 0; i < this.memoryMap.get(this.currentPath).length; i++) {
            if (this.memoryMap.get(this.currentPath)[i].id == id) {
                index = i;
            }
        }
        // put the media to the last pos of the array to simple delete with pop()
        this.memoryMap.get(this.currentPath).push(this.memoryMap.get(this.currentPath).splice(index, 1)[0]);
        this.memoryMap.get(this.currentPath).pop();
    }

    createFile(file: FileElement): void {
        this.add(file);
        this.fileElementsChanged.emit(this.getAllForPath(this.currentPath));
    }

    get(id: string): FileElement {
        return this.map.get(id);
    }

    rename(id: string, updatedName: string): void {
        //TODO: later update / replace whole FileElement
        this.map.get(id).name = updatedName;

        for (var i = 0; i < this.memoryMap.get(this.currentPath).length; i++) {
            if (this.memoryMap.get(this.currentPath)[i].id == id) {
                this.memoryMap.get(this.currentPath)[i].name = updatedName;
            }
        }
    }

    getAllForPath(path: string): FileElement[] {
        return Array.from(this.getAll()
            .filter(element => element.filePath === path))
            .slice();
    }

    getAll(): FileElement[] {
        return Array.from(this.map.values()).slice();
    }

// Use it to clone objects
    clone(fileElement: FileElement): FileElement {
        return JSON.parse(JSON.stringify(fileElement));
    }
}
