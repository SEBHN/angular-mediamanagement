import { Tag } from './tag.model';

/**
 * Represents Folder and Media.
 */
export interface FileElement {
  id: string;
  name: string;
  isFolder: boolean;
  filePath: string;
  creatorId: string;
  tags: Tag[];

  addTag(tag: Tag): void;

  removeTag(tag: Tag): void;

}
