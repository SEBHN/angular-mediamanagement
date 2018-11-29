import {
  Component,
  Input,
  EventEmitter,
  Output,
  OnInit,
  ViewChild
} from '@angular/core';
import { Media } from '../shared/media.model';
import { FileElement } from '../shared/file-element.model';
import { FilesService } from '../services/files-service.service';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { faEdit, faTrashAlt, faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons';
import {DeleteMediaService} from '../services/delete-media.service';
import {DownloadMediaService} from '../services/download-media.service';

/**
 * Single component representing Media and Folder in the view.
 */
@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.css']
})
export class FileExplorerComponent implements OnInit {
  // Context menu icons
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faDownload = faCloudDownloadAlt;

  // We need decorators like @Input and @Output to make elements bindable.

  // @Input() means data is being passed inside this component (via property binding) from parent view
  // ref: https://angular.io/guide/template-syntax
  displayItems = [];
  @Input() mediaFiles: FileElement[];
  canNavigateUp: string;
  path: string;


  // @Output() means this component passes data to outside (to its parent component) (via event binding)
  // ref: https://coursetro.com/posts/code/59/Angular-4-Event-Binding
  // thus we define own CRUD events
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

  private fileService: FilesService;
  private deleteMediaService: DeleteMediaService;
  private downloadMediaService: DownloadMediaService;

  constructor(fileService: FilesService, deleteMediaService: DeleteMediaService, downloadMediaService: DownloadMediaService) {
    this.fileService = fileService;
    this.deleteMediaService = deleteMediaService;
    this.downloadMediaService = downloadMediaService;
  }

  // Lifecycle hook before component gets rendered by Angular
  ngOnInit() {
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
    this.fileService.fileElementsChanged
                    .subscribe((updatedFileElements: FileElement[]) => {
                      this.mediaFiles = updatedFileElements;
                      this.displayItems = [];
                      for (let i = 0; i < this.mediaFiles.length; i += 6) {
                        this.displayItems.push({ items: updatedFileElements.slice(i, i + 6) });
                      }
                    });
  }

  // Methods to send off the occured events

  deleteElement(media: Media): void {
    this.deleteMediaService.deleteMedia(media.id);
  }

  navigateDown(file: FileElement): void {
    this.navigatedDown.emit(file);
  }

  moveElement(element: FileElement, moveTo: FileElement) {
    this.elementMoved.emit({ element, moveTo });
  }

  downloadElement(media: Media): void {
    this.downloadMediaService.downloadMedia(media);
  }
}
