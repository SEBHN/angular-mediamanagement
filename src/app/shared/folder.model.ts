import { FileElement } from './file-element.model';
import { Tag } from './tag.model';

export class Folder implements FileElement {

  id: string;
  name: string;
  isFolder: boolean;
  filePath: string;
  creatorId: string;
  tags: Tag[];

  constructor(name: string, path: string, creatorId: string) {
    this.name = name;
    this.filePath = path;
    this.creatorId = creatorId;
    this.isFolder = true;
    this.tags = [];
  }

  addTag(tag: Tag): void {
    this.tags.push(tag);
  }

  removeTag(tag: Tag): void {
    // get Array index of tag
    const index: number = this.tags.indexOf(tag);
    this.tags.splice(index, 1);
  }
}
