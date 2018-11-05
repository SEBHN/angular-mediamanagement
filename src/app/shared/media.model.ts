import { Tag } from "./tag.model";

export class Media {

  private id: string;
  private name: string;
  private file: string;
  private fileExtension: string;
  private filePath: string;
  private tags: Tag[];

  constructor(id: string, name: string, file: string, fileExtension: string,
    filePath: string) {
      this.id = id;
      this.name = name;
      this.file = file;
      this.fileExtension = fileExtension;
      this.filePath = filePath;
      this.tags = [];
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getFile(): string {
    return this.file;
  }

  getFileExtension(): string {
    return this.fileExtension;
  }

  getFilePath(): string {
    return this.filePath;
  }

  getTags(): Tag[] {
    return this.tags;
  }
}