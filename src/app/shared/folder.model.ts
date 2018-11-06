import { FileElement } from "./file-element.model";
import { Tag } from "./tag.model";

export class Folder implements FileElement {

  name: string;
  isFolder: boolean;
  path: string;
  tags: Tag[];

  constructor(name: string, path: string) {
    this.name = name;
    this.path = path;
    this.isFolder = true;
    this.tags = [];
  }
}