import { Tag } from './tag.model';
import { FileElement } from './file-element.model';

/**
 * Media of any type. Can be placed inside a Folder.
 */
export class Media implements FileElement {

    id: string;
    name: string;
    isFolder: boolean;
    filePath: string;
    creatorId: string;
    tags: Tag[];

    fileId: string;
    fileExtension: string;

    constructor(id: string, name: string, fileId: string,
                fileExtension: string, filePath: string, creatorId: string) {
        this.id = id;
        this.name = name;
        this.isFolder = false;
        this.tags = [];
        this.fileId = fileId;
        this.fileExtension = fileExtension;
        this.filePath = filePath;
        this.creatorId = creatorId;
    }

    getFileId(): string {
        return this.fileId;
    }

    getFileExtension(): string {
        return this.fileExtension;
    }

    getFilePath(): string {
        return this.filePath;
    }

    getId(): string {
        return this.id;
    }

    addTag(tag: Tag): void {
        this.tags.push(tag);
    }

    removeTag(tag: Tag): void {
        throw new Error('Not yet implemented');
    }
}
