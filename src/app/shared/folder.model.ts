import { FileElement } from './file-element.model';
import { Tag } from './tag.model';

export class Folder implements FileElement {

  id: string;
  name: string;
  isFolder: boolean;
  filePath: string;
  creatorId: string;
  tags: Tag[];
  member: string; // used only for the type guard at runtime

  constructor(name: string, path: string, creatorId: string) {
    this.name = name;
    this.filePath = path;
    this.creatorId = creatorId;
    this.isFolder = true;
    this.tags = [];
  }

  addTag(name: string): void {
    this.tags.push(new Tag(name));
  }

  removeTag(tag: Tag): void {
    // get Array index of tag
    const index: number = this.tags.indexOf(tag);
    this.tags.splice(index, 1);
  }

  getTags(): Tag[] {
    return this.tags;
  }
}
