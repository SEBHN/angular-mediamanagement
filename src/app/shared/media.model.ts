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
    member: string; // used only for the typeguard at runtime
    fileMetaData: Map<string, string>;

    fileId: string;
    fileExtension: string;

    constructor(id: string, name: string, fileId: string,
                fileExtension: string, filePath: string, creatorId: string, fileMetaData: Map<string, string>) {
        this.id = id;
        this.name = name;
        this.isFolder = false;
        this.tags = [];
        this.fileId = fileId;
        this.fileExtension = fileExtension;
        this.filePath = filePath;
        this.creatorId = creatorId;
        this.member = 'Media';
        this.fileMetaData = fileMetaData;
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

    addTag(name: string): void {
        this.tags.push(new Tag(name));
    }

    removeTag(tag: Tag): void {
        throw new Error('Not yet implemented');
    }

    getTags(): Tag[] {
        return this.tags;
    }

    setTags(tags: Tag[]): void {
        this.tags = tags;
    }
}
