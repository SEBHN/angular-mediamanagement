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
    ownerId: string;
    tags: Tag[];

    fileId: string;
    fileExtension: string;

    constructor(id: string, name: string, fileId: string,
                fileExtension: string, ownerId: string) {
        this.id = id;
        this.name = name;
        this.isFolder = false;
        this.tags = [];
        this.fileId = fileId;
        this.fileExtension = fileExtension;
        this.ownerId = ownerId;
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
