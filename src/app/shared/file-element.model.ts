import { Tag } from "./tag.model";

export interface FileElement {
  name: string;
  isFolder: boolean;
  path: string;
  tags: Tag[];
}