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
  member: string;

  addTag(tag: string): void;

  removeTag(tag: Tag): void;
}
