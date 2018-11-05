import { Tag } from "./tag.model";
import { FileElement } from "./file-element.model";

export class Media implements FileElement {

  name: string;
  isFolder: boolean;
  path: string;
  tags: Tag[];

  private id: string;
  private file: string;
  private fileExtension: string;
  

  constructor(id: string, name: string, file: string,
    fileExtension: string) {
      this.id = id;
      this.name = name;
      this.isFolder = false;
      this.tags = [];
      this.file = file;
      this.fileExtension = fileExtension;
      
  }

  getFile(): string {
    return this.file;
  }

  getFileExtension(): string {
    return this.fileExtension;
  }

  getId(): string {
    return this.id;
  }
}