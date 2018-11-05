import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { Media } from '../shared/media.model';
import { FileElement } from '../shared/file-element.model';

/**
 * Single component representing Media and Folder in the view.
 */
@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.css']
})
export class FileExplorerComponent implements OnInit {

  // We need decorators like @Input and @Output to make elements bindable.

  // @Input() means data is being passed inside this component (via property binding) from parent view
  // ref: https://angular.io/guide/template-syntax
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
  @Output() elementMoved = new EventEmitter<{ element: FileElement, moveTo: FileElement }>();
  // navigation for folders
  @Output() navigatedDown = new EventEmitter<FileElement>();
  @Output() navigatedUp = new EventEmitter();



  constructor() {}

  // Lifecycle hook before component gets rendered by Angular
  ngOnInit() {}

  // Methods to send off the occured events

  deleteElement(element: FileElement) {
    this.elementRemoved.emit(element);
  }

  navigateDown(element: FileElement) {
    if (element !instanceof Media) {
      this.navigatedDown.emit(element);
    }
  }

  navigateUp() {
    this.navigatedUp.emit();
  }

  moveElement(element: FileElement, moveTo: FileElement) {
    this.elementMoved.emit( {element, moveTo} );
  }

  
}