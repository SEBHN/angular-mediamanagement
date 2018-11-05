import { Component, Input, EventEmitter, Output } from '@angular/core';
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
export class FileExplorerComponent {

  // @Input() means data is being passed inside this component (via property binding)
  // ref: https://angular.io/guide/template-syntax
  @Input() mediaFiles: FileElement[];
  @Input() canNavigateUp: string;
  @Input() path: string;

  // @Output() means this component passes data to outside (to its parent component) (via event binding)
  // ref: https://coursetro.com/posts/code/59/Angular-4-Event-Binding
  // thus we define own CRUD events
  @Output() folderAdded = new EventEmitter<{ name: string }>();
  @Output() elementRemoved = new EventEmitter<FileElement>();
  @Output() elementRenamed = new EventEmitter<FileElement>();
  // Event to move an element takes an object as a type with properties: {'whatToMove', 'whereToMoveIt'}.
  // Can't move Media to Media (check mediaObj.isFolder)
  @Output() elementMoved = new EventEmitter<{ element: FileElement, moveTo: FileElement }>();
}