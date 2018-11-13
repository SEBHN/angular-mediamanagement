import {
  Component,
  Input,
  EventEmitter,
  Output,
  OnInit
} from "@angular/core";
import { Media } from "../shared/media.model";
import { FileElement } from "../shared/file-element.model";
import { FilesService } from "../services/files-service.service";

/**
 * Single component representing Media and Folder in the view.
 */
@Component({
  selector: "app-file-explorer",
  templateUrl: "./file-explorer.component.html",
  styleUrls: ["./file-explorer.component.css"]
})
export class FileExplorerComponent implements OnInit {
  // We need decorators like @Input and @Output to make elements bindable.

  // @Input() means data is being passed inside this component (via property binding) from parent view
  // ref: https://angular.io/guide/template-syntax
  displayItems = []; //TODO: update from service
  @Input() mediaFiles: FileElement[];
  @Input() canNavigateUp: string;
  @Input() path: string;

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
  @Output() navigatedUp = new EventEmitter();

  private fileService: FilesService;

  constructor(fileService: FilesService) {
    this.fileService = fileService;
  }

  // Lifecycle hook before component gets rendered by Angular
  ngOnInit() {
    /** WHEN COMPONENT DETECTS CHANGE IN @Input
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
                      this.displayItems = [];
                      for (let i = 0; i < this.mediaFiles.length; i += 6) {
                        this.displayItems.push({ items: updatedFileElements.slice(i, i + 6) });
                      }
                    });
  }

  // Methods to send off the occured events

  deleteElement(element: FileElement) {
    this.elementRemoved.emit(element);
  }

  navigateDown(element: FileElement) {
    if (element! instanceof Media) {
      this.navigatedDown.emit(element);
    }
  }

  navigateUp() {
    this.navigatedUp.emit();
  }

  moveElement(element: FileElement, moveTo: FileElement) {
    this.elementMoved.emit({ element, moveTo });
  }
}
