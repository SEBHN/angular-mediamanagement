import { Tag } from "./tag.model";

/**
 * Represents Folder and Media.
 */
export interface FileElement {
  name: string;
  isFolder: boolean;
  path: string;
  tags: Tag[];
  
  addTag(tag: Tag);

  removeTag(tag: Tag);
}