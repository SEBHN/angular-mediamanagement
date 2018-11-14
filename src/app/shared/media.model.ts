import { Tag } from "./tag.model";
import { FileElement } from "./file-element.model";

/**
 * Media of any type. Can be placed inside a Folder.
 */
export class Media implements FileElement {

    id: string;
    name: string;
    isFolder: boolean;
    filePath: string;
    tags: Tag[];

    fileId: string;
    fileExtension: string;


    constructor() {
    }

    constructor(id: string, name: string, fileId: string,
                fileExtension: string) {
        this.id = id;
        this.name = name;
        this.isFolder = false;
        this.tags = [];
        this.fileId = fileId;
        this.fileExtension = fileExtension;
    }

    getFileId(): string {
        return this.fileId;
    }

    getFileExtension(): string {
        return this.fileExtension;
    }

    getId(): string {
        return this.id;
    }

    addTag(tag: Tag) {

    }

    removeTag(tag: Tag) {

    }
}
