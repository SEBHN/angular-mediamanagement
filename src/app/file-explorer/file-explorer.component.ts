import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Media } from '../shared/media.model';
import { FileElement } from '../shared/file-element.model';


@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.css']
})
export class FileExplorerComponent {

  @Input() mediaFiles: FileElement[];
  @Input() canNavigateUp: string;
  @Input() path: string;

  // define own events
  @Output() folderAdded = new EventEmitter<{ name: string }>();
  @Output() elementRemoved = new EventEmitter<FileElement>();

}