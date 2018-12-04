import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  ViewChild
} from '@angular/core';
import { Media } from '../shared/media.model';
import { FileElement } from '../shared/file-element.model';
import { FilesService } from '../services/files-service.service';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { faEdit, faTrashAlt, faCloudDownloadAlt, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {DeleteMediaService} from '../services/delete-media.service';
import {DownloadMediaService} from '../services/download-media.service';
import { environment } from 'src/environments/environment';
import { FetchService } from '../services/fetch.service';
import { Folder } from '../shared/folder.model';

/**
 * Single component representing Media and Folder in the view.
 */
@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.css']
})
export class FileExplorerComponent implements OnInit {
  // Context menu icons and footer icon
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faDownload = faCloudDownloadAlt;
  faArrowLeft = faArrowLeft;

  @Output() folderAdded = new EventEmitter<FileElement>();
  @Output() elementRemoved = new EventEmitter<FileElement>();
  @Output() elementRenamed = new EventEmitter<FileElement>();
  // Event to move an element takes an object as a type with properties: {'whatToMove', 'whereToMoveIt'}.
  // Can't move Media to Media (check mediaObj.isFolder or use instanceof)
  @Output() elementMoved = new EventEmitter< {element: FileElement, moveTo: FileElement }>();
  // navigation for folders
  @Output() navigatedDown = new EventEmitter<FileElement>();
  // Enables context menu for every item in FileExplorer
  @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;

  private displayItems = [];
  private mediaFiles: FileElement[];
  private currentPath: string;
  private canNavigateUp: boolean;

  constructor(private filesService: FilesService, private deleteMediaService: DeleteMediaService, private downloadMediaService: DownloadMediaService, private fetchService: FetchService) {
    this.currentPath = '/';
    this.canNavigateUp = false;
  }

  // Lifecycle hook before component gets rendered by Angular
  ngOnInit() {
    // load initial data
    this.updateQuery();
    // listen for change in application path
    this.filesService.applicationPathChanged
      .subscribe((applicationPath) => {
        this.currentPath = applicationPath;
    });
    this.mediaFiles = this.filesService.getAllForPath(this.currentPath);

    // listen for navigation event
    this.filesService.navigated
      .subscribe(folder => this.navigateToFolder(folder));

    /*
     * Algorithm to distribute all elements in a matrix. In the grid system a row
     * (of Bootstrap 4) has 12 columns. Here we take chunk of 6 items and push them
     * AS ARRAY 'items' to the displayItems array.
     * In the FileExplorer HTML template we use 2 *ngFor loops (2 verschachtelte for-Schleifen)
     * on displayItems to feed the view.
     */
    for (let i = 0; i < this.mediaFiles.length; i += 6) {
      this.displayItems.push({ items: this.mediaFiles.slice(i, i + 6) });
    }
    this.filesService.fileElementsChanged
                    .subscribe((updatedFileElements: FileElement[]) => {
                      this.mediaFiles = updatedFileElements;
                      this.displayItems = [];
                      for (let i = 0; i < this.mediaFiles.length; i += 6) {
                        this.displayItems.push({ items: updatedFileElements.slice(i, i + 6) });
                      }
                    });
  }

  // getter for UI
  getDisplayItems() {
    return this.displayItems;
  }

  // Methods to send off the occured events
  moveElement(element: FileElement, moveTo: FileElement) {
    this.elementMoved.emit({ element, moveTo });
  }

  // CRUD handling
  deleteElement(media: Media): void {
    this.deleteMediaService.deleteMedia(media.id);
  }

  downloadElement(media: Media): void {
    this.downloadMediaService.downloadMedia(media, environment.currentUserId);
  }

  // Folder navigation handling
  updateQuery(): void {
    // emit path changed event here because updateQuery() gets called in navigate methods
    this.filesService.applicationPathChanged.emit(this.currentPath);
    this.fetchService.getCurrentFilesForUser(environment.currentUserId, //TODO: user management
        this.currentPath);
  }

  /**
   * Navigate down. Gets invoked via event binding from template.
   * @param folder the folder to navigate into
   */
  navigateToFolder(folder: FileElement): void {
    this.canNavigateUp = true;
    this.pushToPath(folder);
    this.updateQuery();
  }

  navigateUp() {
    if (this.currentPath === '/') {
        this.canNavigateUp = false;
        this.updateQuery();
    } else {
        this.popFromPath();
        this.updateQuery();
    }
  }

  // Path handling
  pushToPath(element: Folder): void {
    this.currentPath += `${element.name}/`;
  }

  popFromPath(): void {
    let split = this.currentPath.split('/');
    split.splice(split.length - 2, 1);
    this.currentPath = split.join('/');
  }

  getCurrentPath(): string {
    return this.currentPath;
  }
}
